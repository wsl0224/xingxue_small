// pages/skillPage/skillPage.js
var $ = require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    skillData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('==')
    console.log(options);
    let param = JSON.parse(options.data);
    console.log(param);
    let self = this;
    $.POST({
        url: 'wcSkillSSD',
        data: {
          usid: param.id
        }
      }, function(e) {
        self.setData({
          skillData: e.data,
        });
      },
      function(e) {
        console.log(e);
      });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 跳转人员信息
  ToPsnPage: function(e) {
    $.openWin({
      url: '../psnPage/psnPage',
      data: {
        id: e.currentTarget.dataset.id,
      }
    })
  },
  ToPlaceOrder: function(e) {
    $.openWin({
      url: '../placeOrder/placeOrder',
      data: {
        id: e.currentTarget.dataset.id,
      }
    })
  },
  // 进入聊天页面
  goToChat: function(e) {
    let that = this;
    $.openWin({
      url: '../message/chat',
      data: {
        id: that.data.psnData.id,
        name: that.data.psnData.name
      }
    })
  },
  // 关注事件
  FollowerBtn:function(e){
    let that=this;
    $.POST({
      url:'wcUserAFU',
      data:{
       
        uid:e.currentTarget.dataset.id
      }
    },function(e){
      wx.showToast({
        title: e.data.msg,
      });
    },function(e){
      console.log(e);
    })
  }


})