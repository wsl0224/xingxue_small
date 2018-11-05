// pages/bringUpSuccess/bringUpSuccess.js
let $=require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money:'',
    txt:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let param=JSON.parse(options.data);
    if (param.Type=='aliPay'){
      this.setData({
        money: param.money,
        Type: param.Type,
        txt:'成功提现,等待审核'
      })
    }
   
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
  // 完成
  submitBtn:function(){
    $.openWin({
      url:'../myWallet/myWallet'
    })
  }
})