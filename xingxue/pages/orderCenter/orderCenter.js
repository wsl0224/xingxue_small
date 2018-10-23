// pages/orderCenter/orderCenter.js
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
    this.loadData();
  },
  // 加载数据
  loadData:function(e){
    let self=this;
    $.POST({
      url:'wOrderSUO',
      data:{
        page:1,
      }
    },function(e){
      self.setData({
        orderData:e.data,
      })
    },function(e){
      console.log(e);
    })
  },
  upper:function(e){
    this.loadData();
  },
  lower:function(e){
    let self = this;
    self.page++;
    $.POST({
      url: 'wOrderSUO',
      data: {
        page: self.page,
      }
    }, function (e) {
      self.setData({
        orderData: self.data.orderData.concat(e.data),
      })
    }, function (e) {
      console.log(e);
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
  // 跳转订单详情页
  ToOrderDetail:function(e){
    if (e.currentTarget.dataset.status==1){
      $.openWin({
        url: '../orderCenter/choosePsnPage',
        data: {
          id: e.currentTarget.dataset.id,
          status: e.currentTarget.dataset.status,
        }
      })
    }else{
      $.openWin({
        url: '../orderCenter/orderDetail',
        data: {
          id: e.currentTarget.dataset.id,
          status: e.currentTarget.dataset.status,
        }
      })
    }
   
  }

})