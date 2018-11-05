// pages/onlineJob/onlineJob.js
let $ = require('../util/commit.js');
let page = 1, oldPage = 0;
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
      jobData:[]},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.freshData();
  },
  freshData:function(e){
    let self=this;
    $.POST({
      url:'Wc/Task/task_mytask',
      data:{
        page:1,
        status: self.data.indexNum,
      }
    },function(e){
      self.setData({
        jobData:e.data
      });
      page = 1;
      oldPage = 0;
    })
  },
  upper: function (e) {
    this.freshData();
  },
  lower: function (e) {
    let self = this;
    console.log(page, oldPage);
    if (page - oldPage == 1) {
      page++;
      $.POST({
        url: 'Wc/Task/task_mytask',
        data: {
          page: page,
          status: self.data.indexNum,
        }
      }, function (e) {
        console.log(e.data);
        self.setData({
          JobData: self.data.jobData.concat(e.data)
        });
        oldPage++;
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
    wx.reLaunch({
      url: '../mine/mine'
    })
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
    this.freshData();
  },
  // 跳转任务详情
  TopOnlineJobDetail:function(e){
    $.openWin({
      
      url:'../onlineJob/onlineJobDetail',
      data: { Type: 'Job',id: e.currentTarget.dataset.id, mid: e.currentTarget.dataset.mid}
    })
  }
})