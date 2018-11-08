var $ = require('../util/commit.js');
const utils = require('../utils/utils');

const {globalData} = getApp();
const {Service: {Status, Conversation}} = globalData;

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
     let userId = wx.getStorageSync('userId');
     let user = wx.getStorageSync('userInfo');
     $.POST({
       url: 'wcUserSRYT',
       data: {
         uid: userId,
       }
     }, function (e) {
       console.log('登录聊天');
       console.log(e);
       wx.setStorageSync('UserToken', e.data.token);
       wx.setStorageSync('UserId', e.data.userId);
       let user = wx.getStorageSync("urserConInfo");
       user.userInfo.token = e.data.token;
       user.userInfo.id = e.data.userId;
       user.userInfo.userId = e.data.userId;
       user.userInfo.name = e.data.name;
       user.userInfo.nickName = e.data.name;
       user.userInfo.avatar = e.data.avatar;
       user.userInfo.avatarUrl = e.data.avatar;
       wx.setStorageSync("userInfo", user);
       console.log('登录userInfo聊天');
       console.log(user);
       Status.connect(user.userInfo).then(() => {
         console.log('connect successfully');
       }, (error) => {
         wx.showToast({
           title: error.msg,
           icon: 'none',
           duration: 3000
         })
       })
     }, function (e) {
       console.log(e);
     })
   }
 })
}

const connect = (context) => {
  watchConversation(context);
  watchStatus();
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