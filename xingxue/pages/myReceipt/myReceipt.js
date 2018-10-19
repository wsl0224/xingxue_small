// pages/myReceipt/myReceipt.js
let $=require('../util/commit.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
      orderData:[{
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name:'成都小甜甜',
        title:'LOL陪玩',
        XZ:'限女',
        sex:2,
        age:20,
        addr:'南京',
        time:'刚刚  08月08日 21:00',
        num:1,
        status:1,
      }, {
          url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          name: '成都小甜甜',
          title: 'LOL陪玩',
          XZ: '限女',
          sex: 2,
          age: 20,
          addr: '南京',
          time: '刚刚  08月08日 21:00',
          num: 1,
          status: 1,
        }, {
          url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          name: '成都小甜甜',
          title: 'LOL陪玩',
          XZ: '限女',
          sex: 1,
          age: 20,
          addr: '南京',
          time: '刚刚  08月08日 21:00',
          num: 1,
          status: 1,
        }, {
          url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          name: '成都小甜甜',
          title: 'LOL陪玩',
          XZ: '限女',
          sex: 2,
          age: 20,
          addr: '南京',
          time: '刚刚  08月08日 21:00',
          num: 1,
          status: 1,
        },]
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