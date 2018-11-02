// pages/orderCenter/choosePsnPage.js
let $ = require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderCode:'',
    psnData: [],
    showFooter:false,
    SelectMoney:'',
    SelectId:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let param=JSON.parse(options.data);
    this.setData({
      orderCode:param.id,
    });
    this.freshData();
  },
  freshData:function(e){
      let self=this;
      $.POST({
        url:'wcOrderSOD',
        data:{
          oid: self.data.orderCode,
          type:1
        }
      },function(e){
        self.setData({
          psnData:e.data
        })
        wx.stopPullDownRefresh()
      },function(e){
        wx.stopPullDownRefresh()
      })
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
    this.freshData();
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
  // 选择
  SelectBtn:function(e){
    this.setData({
      showFooter:true,
      SelectId:e.currentTarget.dataset.id,
      SelectMoney: e.currentTarget.dataset.money
    })
  },
  HideFooter:function(e){
    this.setData({
      showFooter: false,
    })
  },
  sureBtn:function(e){
    let self=this;
    $.POST({
      url:'wcOrderCS',
      data:{
        oid: self.data.orderCode,
        aou_id:self.data.SelectId,
      }
    },function(e){
      wx.showToast({
        title: e.msg,
      });
      wx.navigateBack();
    })
  }
})