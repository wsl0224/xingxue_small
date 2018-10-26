// pages/myTracks/myTracks.js
let $=require('../util/commit.js');
let pageNum=1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    psnData: [ ]
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
  // 刷新数据
  freshData:function(e){
    let self=this;
    $.POST({ url:'wcUserSUF',data:{
      page:1
    }},function(e){
      pageNum=1;
      self.setData({
        psnData:e.data,
      })
    },function(e){
      console.log(e);
    })
  },
  // 加载更多
  freshMoreData:function(e){
    let self = this;
    pageNum++;
    $.POST({
      url: 'wcUserSUF', data: {
        page: pageNum
      }
    }, function (e) {

      self.setData({
        psnData: self.data.psnData.concat(e.data),
      })
    }, function (e) {
      console.log(e);
    })
  },
  // 跳转人员主页 
  ToPsnPage:function(e){
    $.openWin({
      url:'../psnPage/psnPage',
      data:{
        id:e.currentTarget.dataset.id,
      }
    })
  }
})