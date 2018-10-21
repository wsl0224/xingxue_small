// pages/onlineJob/onlineJob.js
let $=require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexNum:0,
    // 类别数据
    TypeData:[{
      id:'0',
      name:'全部',
    }, {
        id: '1',
        name: '进行中',
      }, {
        id: '2',
        name: '审核中',
      }, {
        id: '3',
        name: '已结束',
      }],
      jobData:[{
        title:'下载微信注册后加100好友任务',
        shenyue:'1289',
        Date:'2018-10-30',
        money:'28.00',
        status:1,
      }, {
          title: '下载微信注册后加100好友任务',
          shenyue: '1289',
          Date: '2018-10-30',
          money: '28.00',
          status: 2,
        }, {
          title: '下载微信注册后加100好友任务',
          shenyue: '1289',
          Date: '2018-10-30',
          money: '28.00',
          status: 4,
        }, {
          title: '下载微信注册后加100好友任务',
          shenyue: '1289',
          Date: '2018-10-30',
          money: '28.00',
          status: 3,
        }, {
          title: '下载微信注册后加100好友任务',
          shenyue: '1289',
          Date: '2018-10-30',
          money: '28.00',
          status: 5,
        }, {
          title: '下载微信注册后加100好友任务',
          shenyue: '1289',
          Date: '2018-10-30',
          money: '28.00',
          status: 5,
        }, {
          title: '下载微信注册后加100好友任务',
          shenyue: '1289',
          Date: '2018-10-30',
          money: '28.00',
          status: 5,
        }, {
          title: '下载微信注册后加100好友任务',
          shenyue: '1289',
          Date: '2018-10-30',
          money: '28.00',
          status: 5,
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
  // 选择类别
  ChooseType:function(e){
    this.setData({
      indexNum:e.currentTarget.dataset.id,
    })
  },
  // 跳转任务详情
  TopOnlineJobDetail:function(e){
    $.openWin({
      url:'../onlineJob/onlineJobDetail',

    })
  }
})