// pages/orderCenter/orderCenter.js
let $=require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderData:[{
      orderStatus:1,
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        skillName:'叫醒服务',
        time:'2017-03-06 08:02',
        num:1,
        unit:'小时',
        money:'',
    }, {
        orderStatus: 2,
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        skillName: '叫醒服务',
        time: '2017-03-06 08:02',
        num: 1,
        unit: '小时',
        money: '12.00',
      }]
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