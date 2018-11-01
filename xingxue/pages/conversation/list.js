var $ = require('../util/commit.js');
const utils = require('../utils/utils');

const {globalData} = getApp();
const {Service: {Status, Conversation}} = globalData;

// const requestUserAuth = () => {
//   return new Promise((resolve, reject) => {
//     console.log(resolve);
//     console.log(reject);
//     wx.getSetting({
//       success: function (res) {
//         resolve(!!res.authSetting['scope.userInfo'])
//       },
//       fail: function (error) {
//         console.log(error);
//         reject(error)
//       }
//     })
//   });
// };

const watchConversation = (context) => {
  Conversation.watch((conversationList) => {
    console.log(conversationList);
    context.setData({
      conversationList
    });
  });
};

const watchStatus = () => {
 Status.watch((status) => {
   console.log(status);
   if (status == 3) {
     wx.getUserInfo({
       success: (user) => {
         console.log(user.userInfo);
         Status.connect(user.userInfo);
       }
     });
   }
 })
}

const connect = (context) => {
  console.log(context);

  watchConversation(context);
  watchStatus();
  let userId = wx.getStorageSync('userId');
  let user = wx.getStorageSync('userInfo');
  $.POST({
    url: 'wcUserSRYT',
    data: {
      uid: userId,
    }
  }, function (e) {
    console.log('登录聊天');
    wx.setStorageSync('UserToken', e.data.token);
    wx.setStorageSync('UserId', e.data.userId);
    let user = wx.getStorageSync('userInfo');
    console.log(user);
    Status.connect(user.userInfo).then(() => {
      console.log('connect successfully');
    }, (error) => {
      wx.showToast({
        title: error.msg,
        icon: 'none',
        duration: 3000
      })
    }); 
  }, function (e) {
    console.log(e);
  })
 wx.stopPullDownRefresh();
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserAuth: true,
    conversationList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // requestUserAuth().then((hasUserAuth) => {
    //   console.log(hasUserAuth);
    //   this.setData({
    //     hasUserAuth
    //   });
      // if (hasUserAuth){
   
        connect(this);
       wx.startPullDownRefresh()
  ;
      
      // }
    // });
  },
  onPullDownRefresh: function () {
    let self=this;
    setTimeout(function(e){
      connect(self);
      wx.stopPullDownRefresh();
    }, 5000);
    wx.stopPullDownRefresh();
   
  },
  onAuthCompleted: function(user){
    requestUserAuth().then((hasUserAuth) => {
      this.setData({
        hasUserAuth
      });
      if (hasUserAuth) {
        connect(this);
      }
    });
  },
  gotoChat: function(event){
    let { currentTarget: { dataset: { item } } } = event;
    let { conversationType: type, targetId, target } = item;
    console.log(type, targetId, target);
    let isSame = (conversation, another) => {
      let isSaveType = (conversation.conversationType == another.conversationType);
      let isSaveTarget = (conversation.targetId == another.targetId);
      return (isSaveType && isSaveTarget);
    };

    let url = './chat?type={type}&targetId={targetId}&title={title}';
    url = utils.tplEngine(url, {
      type,
      targetId,
      title: target.name
    });
    wx.navigateTo({
      url: url,
    });

    let { conversationList} = this.data;
    utils.map(conversationList, (conversation) => {
      if (isSame(conversation, item)){
        conversation.unReadCount = 0;
      }
      return conversation
    });
    Conversation.clearUnreadCount(item);

    this.setData({
      conversationList
    });
    
  }
})