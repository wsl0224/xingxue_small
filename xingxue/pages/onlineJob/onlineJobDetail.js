// pages/onlineJob/onlineJobDetail.js
let $=require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobData:{
      title:'下载微信注册后加100好友任务',
      Date:'2016-09-30',
      xianzi:1,
      sy:1826,
      money:'28.00',
      sm: '如今二维码时代已经盛行,不管你要查询什么东西, 只要通过手机二维码能轻松的识别, 这也必将成为以后的一种趋势, 手机里面你必须个二维码软件',
      url:'https://www.baidu.com',
      status:1,
      jobStep:[{
        id:'1',
        step:'第一步',
        content: '如今二维码时代已经盛行,不管你要查询什么东西, 只要通过手机二维码能轻松的识别, 这也必将成为以后的一种趋势, 手机里面你必须个二维码软件',
        photo:[
          '../image/icon/icon44.png',
          '../image/icon/icon44.png',
          '../image/icon/icon44.png'
        ]
      }, {
          id: '2',
          step: '第二步',
          content: '如今二维码时代已经盛行,不管你要查询什么东西, 只要通过手机二维码能轻松的识别, 这也必将成为以后的一种趋势, 手机里面你必须个二维码软件',
          photo: [
            '../image/icon/icon44.png',
            '../image/icon/icon44.png'
          ]
        }, {
          id: '3',
          step: '第三步',
          content: '如今二维码时代已经盛行,不管你要查询什么东西, 只要通过手机二维码能轻松的识别, 这也必将成为以后的一种趋势, 手机里面你必须个二维码软件',
          photo: [
            '../image/icon/icon44.png'
          ]
        }]
    }
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
  // 跳转任务链接
  ToWebPage:function(e){
      
  },
  // 跳转任务提交
  ToSubmitJob:function(e){
    $.openWin({
      url:'../onlineJob/submitJob',
    })
  }
})