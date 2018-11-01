// pages/orderCenter/orderDetail.js
let $ = require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderCode:'',
    orderData:{},
    EndOrderArr:['1','2','3','4','5']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let param= JSON.parse(options.data);
    this.setData({
      orderCode: param.id,
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
      orderData: e.data,    
    })
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
    this.freshData();
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
  // 取消未支付订单
  clearOrder:function(e){
    let self=this;
    if (e.currentTarget.dataset.status == 2 || e.currentTarget.dataset.status == 3){
      $.POST({
        url: 'wcOrderCPO',
        data: {
          oid: self.data.orderCode,
        }
      }, function (e) {
        wx.navigateBack();
        wx.showToast({
          title: e.msg,
        });
      })
    }else{
      $.POST({
        url: 'wcOrderCNPO',
        data: {
          oid: self.data.orderCode,
        }
      }, function (e) {
        wx.navigateBack();
        wx.showToast({
          title: e.msg,
        });
      })
    }
   
  },
  // 支付订单
  payOrder:function(e){
    let self=this;
    $.openWin({
      url:'../payOrder/payOrder',
      data:{
        id: self.data.orderCode,
      }
    })
  },
  // 完成
  EndOrderBtn:function(e){

    let self = this;
    let score = self.data.EndOrderArr[e.detail.index];
    $.POST({
      url: 'wcOrderUCO',
      data: {
        oid: self.data.orderCode,
        score: score,
      }
    }, function (e) {
      wx.navigateBack();
      wx.showToast({
        title: e.msg,
      });
    })
  }
})