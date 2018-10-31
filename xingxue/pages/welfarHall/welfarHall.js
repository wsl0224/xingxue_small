// pages/welfarHall/welfarHall.js
let $ = require('../util/commit.js');
let pageNum = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlArray: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(pageNum);
    this.freshData()
  },
  freshData: function(e) {
    let self=this;

    $.POST({
      url: 'wcOtherSWF',
      data: {
        page: 1,
      }
    }, function(e) {
     self.setData({
       urlArray:e.data
     }) 
      pageNum = 1;
    })
    wx.stopPullDownRefresh();
  },
 
  upper: function (e) {
    this.freshData();
  },
  lower: function (e) {
    let self = this;
    pageNum++;
    $.POST({
      url: 'wcOtherSWF',
      data: {
        page: pageNum,
      }
    }, function (e) {
      self.setData({
        urlArray: self.data.urlArray.concat(e.data),
      })
    })
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
    this.freshData()
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
  // 进入福利详细
  ToWelfarDetail: function(e) {
  // $.openWin({
  //     url: '../webView/webView',
  //     data:{
  //       url:'https://app.xingxue.vip/wcOtherSWFD/wid/'+e.currentTarget.dataset.id,
  //     }
  //   });
    $.openWin({
      url: '../welfarHall/welfarDetail',
      data:{
        id:e.currentTarget.dataset.id,
      }
    })
   }
})