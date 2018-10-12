// pages/order/sendOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    OneTar_Num:0,
    TwoTar_Num:0,
    OneLeverData:[
      '线上游戏',
      '线上游戏',
      '线上游戏',
      '线上游戏',
      '线上游戏',
      '线上游戏',
      '线上游戏',
    ],
    TwoLeverData: [
      '王者荣耀',
      '王者荣耀',
      '王者荣耀',
      '线上游戏',
      '王者荣耀',
      '线上游戏',
      '王者荣耀',
    ],
    markers: [{
      iconPath: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50,
      borderRadius:25,
    }],
  
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
  // 一级选择
  OneTarFun:function(e){
    console.log(e);
    this.setData({
      OneTar_Num: e.currentTarget.dataset.num
    })
  },
// 二级选择
  TwoTarFun:function(e){
    console.log(e);
    this.setData({
      TwoTar_Num: e.currentTarget.dataset.num
    })
  },
  // 进入下单详细
  ToDetail:function(e){
    wx.navigateTo({
      url: './sendOrderDetail',
    })
  }
  
})