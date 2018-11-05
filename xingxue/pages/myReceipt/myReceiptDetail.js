// pages/myReceipt/myReceiptDetail.js
let $ = require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oid:'',
    orderData: {},
    OrderType:'',
    status:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let param=JSON.parse(options.data);
    console.log(param);
    this.setData({
      oid: param.id,
      OrderType:param.type,
      status: param.status
    })
    this.freshData();
  },
  freshData:function(e){
    let self=this;
    if (self.data.OrderType == 2 && self.data.status==1){
      $.POST({
        url: 'wcOrderTD',
        data: {
          oid: self.data.oid,
          type: 2,
        }
      }, function (e) {
        self.setData({
          orderData: e.data,
        })
        wx.stopPullDownRefresh();
      },function(e){
        wx.stopPullDownRefresh();
      })
    }else{
      $.POST({
        url: 'wcOrderSOD',
        data: {
          oid: self.data.oid,
          type: 2,
        }
      }, function (e) {
        self.setData({
          orderData: e.data,
        })
        wx.stopPullDownRefresh();
      },function(e){
        wx.stopPullDownRefresh();
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
  // 参加任务
  CJbtn:function(e){
    let self = this;
    $.POST({
      url: 'wcOrderJAO',
      data: {
        oid: e.currentTarget.dataset.id,
      }
    }, function (e) {
      wx.navigateBack();
      wx.showToast({
        title: e.msg,
      });
    })
  },
  JSBtn:function(e){

    let self=this;
    $.POST({
      url:'wcOrderAO',
      data:{
        oid:e.currentTarget.dataset.id,
      }
    },function(e){
      wx.navigateBack();
      wx.showToast({
        title: e.msg,
      });
    })
  },
  StartBtn:function(e){
    let self = this;
    $.POST({
      url: 'wcOrderBS',
      data: {
        oid: e.currentTarget.dataset.id,
      }
    }, function (e) {
      wx.navigateBack();
      wx.showToast({
        title: e.msg,
      });
    })
  }
})