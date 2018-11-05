// pages/mine/mine.js
let $ = require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingShow: false,
    registerShow: false,
    psnData: {
      avatar: 'https://app.xingxue.vip/icon/icon94.png',
      user_nicename: '',
      signature: '',
      follower_num: 0,
      fans_num: 0,
      yuer: 0,
      jingxing: 0,
    },
    psnStatus: 0,
    UserToken: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    self.freshPsnData();
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
    this.freshPsnData();
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
    this.freshPsnData();
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
  
  // 下拉刷新我的信息
  upper: function(e) {
    this.freshPsnData();
  },
  // 刷新我的信息
  freshPsnData: function(e) {
    let self = this;
    $.POST({
      url: 'wcUserMHP',
      data: {},
    }, function(e) {
      if (e.code == 200) {
        self.setData({
          psnData: e.data,
          psnStatus: 1,
        });
        wx.setStorageSync('RZStatus', e.data.stu_status);
      } 
    }, function(e) {
      console.log(e)
      wx.stopPullDownRefresh();
    });
  
  },
  // 跳转个人资料
  ToPersonalData: function(e) {
    $.openWin({
      url: '../personalData/personalData',
    })
  },
  // 跳转关注或粉丝
  ToMyAttentionFans: function(e) {


    if (e.currentTarget.dataset.type == 'atte') {
      let data = {
        Type: 'atte',
      };
      $.openWin({
        url: '../myAttentionFans/myAttentionFans',
        data: data,
      })
    } else if (e.currentTarget.dataset.type == 'fans') {
      let data = {
        Type: 'fans',
      };
      $.openWin({
        url: '../myAttentionFans/myAttentionFans',
        data: data,
      })
    }
  },
  // 跳转足迹
  ToMyTracks: function(e) {
    $.openWin({
      url: '../myTracks/myTracks',
    })
  },
  // 跳转我的钱包
  ToMyWallet: function(e) {
    $.openWin({
      url: '../myWallet/myWallet',
    })
  },
  // 申请技能
  ToApplicationSkill: function(e) {
    if (this.data.psnData.stu_status != 3) {
      $.openWin({
        url: '../applicationSkills/applicationSkills',
      })
    } else {
      $.openWin({
        url: '../mySkill/mySkill',
      })
    }

  },
  // 意见反馈
  ToFeedback: function(e) {
    $.openWin({
      url: '../feedback/feedback',
    })
  },
  // 跳转订单中心
  ToOrderCenter: function(e) {
    $.openWin({
      url: '../orderCenter/orderCenter'
    })
  },
  // 我的接单
  ToMyReceipt: function(e) {
    $.openWin({
      url: '../myReceipt/myReceipt'
    })
  },
  // 跳转兼职任务
  ToOnlineJob: function(e) {
    $.openWin({
      url: '../onlineJob/onlineJob',
    })
  },
  //邀请码
  ToInvitationCode: function(e) {
    $.openWin({
      url: '../invitationCode/invitationCode'
    })
  },
  // 退出
  EXITBtn: function(e) {
    wx.clearStorageSync();
    wx.reLaunch({
      url:'../startPage/startPage',
    })
  }
})