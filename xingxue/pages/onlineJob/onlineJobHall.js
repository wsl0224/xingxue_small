// pages/onlineJob/onlineJobHall.js
let $=require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectIndex:0,
    typeData:[
      {id:'1',name:'分类'},
      {id:'2',name:'排序'}
    ],
     FLSelectIndex:0,
     FLStatus:false,
     FLData:[{
      id:0,
      name:'佣金最高',
    },{
      id:1,
      name:'最新发布',
    }],
    PXSelectIndex:0,
    PXStatus: false,
    PXData:[{
        id: 0,
        name:'不限',
      }, {
        id: 1,
        name:'关注',
      },{
        id: 2,
        name:'注册',
      }, {
        id: 3,
        name:'体验',
      },{
        id: 4,
        name:'其它',
      },],
    JobData:[{
      url:'../image/icon/icon44.png',
      title:'下载微信注册后加100好友任务',
      zdStatus:1,
      sy:'1286',
      date:'2016-09-30',
      money:'28.00',
    }, {
        url: '../image/icon/icon44.png',
        title: '下载微信注册后加100好友任务',
        zdStatus: 1,
        sy: '1286',
        date: '2016-09-30',
        money: '28.00',
      }, {
        url: '../image/icon/icon44.png',
        title: '下载微信注册后加100好友任务',
        zdStatus: 1,
        sy: '1286',
        date: '2016-09-30',
        money: '28.00',
      }, {
        url: '../image/icon/icon44.png',
        title: '下载微信注册后加100好友任务',
        zdStatus: 2,
        sy: '1286',
        date: '2016-09-30',
        money: '28.00',
      }, {
        url: '../image/icon/icon44.png',
        title: '下载微信注册后加100好友任务',
        zdStatus: 2,
        sy: '1286',
        date: '2016-09-30',
        money: '28.00',
      }, {
        url: '../image/icon/icon44.png',
        title: '下载微信注册后加100好友任务',
        zdStatus: 2,
        sy: '1286',
        date: '2016-09-30',
        money: '28.00',
      }, {
        url: '../image/icon/icon44.png',
        title: '下载微信注册后加100好友任务',
        zdStatus: 2,
        sy: '1286',
        date: '2016-09-30',
        money: '28.00',
      }, {
        url: '../image/icon/icon44.png',
        title: '下载微信注册后加100好友任务',
        zdStatus: 2,
        sy: '1286',
        date: '2016-09-30',
        money: '28.00',
      }, {
        url: '../image/icon/icon44.png',
        title: '下载微信注册后加100好友任务',
        zdStatus: 2,
        sy: '1286',
        date: '2016-09-30',
        money: '28.00',
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
  // 点击其它关闭下拉
  CloseFLPX:function(e){
    this.setData({
      FLStatus: false,
      PXStatus: false,
    })
  },
  // 选择type
  SelectType:function(e){
    if (e.currentTarget.dataset.id==0){
      this.setData({
        FLStatus:!this.data.FLStatus,
        PXStatus:false,
      })
    } else if (e.currentTarget.dataset.id == 1){
      this.setData({
        FLStatus: false,
        PXStatus: !this.data.PXStatus,
      })
    }
    this.setData({
      selectIndex:e.currentTarget.dataset.id,
    
    })
  },
  // 分类选择
  FLItemTab:function(e){
    this.setData({
      FLSelectIndex: e.currentTarget.dataset.id,
      FLStatus: false,
      PXStatus: false,
    })
  },
  // 排序选择
  PXItemTab:function(e){
    this.setData({
      PXSelectIndex: e.currentTarget.dataset.id,
      FLStatus: false,
      PXStatus: false,
    })
  },
  // 进入任务详情
  ToOnlineJobDetail:function(e){
    $.openWin({ url:'../onlineJob/onlineJobDetail'})
  }
})