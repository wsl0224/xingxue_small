// pages/message/message.js
let $=require('../util/commit.js');
var webim = require('../../utils/webim_wx.js');
var webimhandler = require('../../utils/webim_handler.js');
var tls = require('../../utils/tls.js');
var { Config}=require('../util/config.js');
global.webim = webim;


tls.init({
  sdkappid: Config.sdkappid
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mesData:[]
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
   
    that.login(function () {
      that.onMsgNotify(that.data.mesData);
    });
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 聊天登录
  login: function (cb) {
    var that = this;
    tls.login({
      id:'11'
    },{
      success: function (data) {
        console.log('==聊天登录')
        console.log(data);
        that.setData({
          Identifier: data.Identifier,
          UserSig: data.UserSig
        })
        cb();
      }
    });
  },

// 消息
  onMsgNotify: function (newMsgList){
    //console.warn(newMsgList);
    var that=this;
    var sess, newMsg;
    //获取所有聊天会话
    var sessMap = webim.MsgStore.sessMap();  
  },
  // 进入聊天室
  ToChat:function(e){
    $.openWin({
      url:'../message/chat',
      data:{
        id: e.currentTarget.dataset.id,
        title: e.currentTarget.dataset.name,
      }
    })
  }





})