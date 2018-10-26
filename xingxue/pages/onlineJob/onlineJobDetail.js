// pages/onlineJob/onlineJobDetail.js
let $=require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oid:'',
    jobData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let param=JSON.parse(options.data);
    this.setData({
      oid:param.id,
    });
    this.freshData();
  },
  // 加载
  freshData:function(e){
    let self=this;
    $.POST({
      url:'Wc/Task/task_list',
      data:{
        tid:self.data.oid,
      }
    },function(e){
      self.setData({
        jobData:e.data[0],
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
    let tid = e.currentTarget.dataset.id;
    $.POST({
      url:'Wc/Task/task_receive',
      data:{
        tid: tid,
      }
    },function(res){
      console.log(res);
      $.openWin({
        url: '../onlineJob/submitJob',
        data: {
          id: tid,
          mid: res.msg,
        }
      })
    })
   
  }
})