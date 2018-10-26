// pages/billDetail/billDetail.js
let $=require('../util/commit.js');
let pageNum=1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    billData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.freshData();
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
  // 加载数据
  freshData:function(e){
    let self=this;
    $.POST({
      url:'wcUserUD',
      data:{
        page:1,
      }
    },function(e){
      self.setData({
        billData:e.data
      })
    })
  },
  // upper
  upper:function(e){
    this.freshData();
  },
  // lower
  lower:function(e){
    let self=this;
    pageNum++;
    $.POST({
      url:'wxUserUD',
      data:{
        page: pageNum,
      }
    },function(e){
      self.setData({
        billData:self.data.billData.concat(e.data)
      })
    },function(e){
      console.log(e);
    })
  }
})