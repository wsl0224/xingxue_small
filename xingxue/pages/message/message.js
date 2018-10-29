// pages/message/message.js
let $ = require('../util/commit.js');
const utils = require('../utils/utils');

const { globalData } = getApp();
const { Service: { Status, Conversation } } = globalData;
var Config = require('../util/config.js');

const watchConversation = (context) => {
  Conversation.watch((conversationList) => {
    context.setData({
      conversationList
    });
  });
};
const watchStatus = () => {
  Status.watch((status) => {
    if (status == 3) {
      let user = wx.getStorageSync('userInfo');
      if(user){
        Status.connect(user.userInfo);
      }else{
        wx.showToast({
          title: '请先登录',
        })
      } 
    }
  })
}
const connect = (context) => {
  watchConversation(context);
  watchStatus();
  let user = wx.getStorageSync('userInfo');
  if(user){
    Status.connect(user.userInfo).then(() => {
      console.log('connect successfully');
    }, (error) => {
      wx.showToast({
        title: error.msg,
        icon: 'none',
        duration: 3000
      })
    })
  }else{
    wx.showToast({
      title: '请先登录',
    })
  }
  
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conversationList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    connect(this);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  

  // 进入聊天室
  gotoChat: function (event) {
    let { currentTarget: { dataset: { item } } } = event;
    let { conversationType: type, targetId, target } = item;

    let isSame = (conversation, another) => {
      let isSaveType = (conversation.conversationType == another.conversationType);
      let isSaveTarget = (conversation.targetId == another.targetId);
      return (isSaveType && isSaveTarget);
    };

    let url = './chat?type={type}&targetId={targetId}&title={title}';
    console.log(event);
    url = utils.tplEngine(url, {
      type,
      targetId,
      title: target.name
    });
    wx.navigateTo({
      url: url,
    });

    let { conversationList } = this.data;
    utils.map(conversationList, (conversation) => {
      if (isSame(conversation, item)) {
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