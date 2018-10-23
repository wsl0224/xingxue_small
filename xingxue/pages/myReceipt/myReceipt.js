// pages/myReceipt/myReceipt.js
let $=require('../util/commit.js');
let page=1;
Page({
  /**
   * 页面的初始数据
   */
  data: {
      orderData:[]
      },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.freshData();
  },
// 刷新订单数据
freshData:function(e){
  let self=this;
  $.POST({
    url:'wcOrderSSO',
    data:{
      page:1,
    }
  },function(e){
    self.setData({
      orderData:e.data
    }); 
  })
},
 // 上拉加载
  upper:function(e){
    console.log('下拉')
  },
// 下拉刷新  
  lower:function(e){
    console.log('上拉')
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
  // 跳转接单详情
  ToMyReceiptDetail:function(e){
    $.openWin({
      url:'../myReceipt/myReceiptDetail',
      data:{
        id:'111',
      }
    })

  }
})