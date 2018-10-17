// pages/myWallet/myWallet.js
let $=require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yuer:'88.00',
    shenghe:'6.00',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  // 跳转账单明细
  ToBillDetail:function(e){
    $.openWin({
      url:'../billDetail/billDetail',
      data:{
        id:'111',
      }
    })
  },
  // 跳转充值
  ToRecharge:function(e){
    $.openWin({
      url:'../recharge/recharge',
      data:{
        id:'111',
      }
    })
  },
  // 跳转提现
  ToPutForward:function(e){
    $.openWin({
      url:'../putForward/putForward',
      
    })
  }
  
})