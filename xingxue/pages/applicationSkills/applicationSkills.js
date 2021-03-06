// pages/applicationSkills/applicationSkills.js
let $=require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTitle:true,
    appliData:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.freshData();
  },
  freshData:function(){
    let self=this;
    $.POST({
      url:'wcUserSUSA',
      data:{}
    },function(e){
      self.setData({
        appliData:e.data,
      })
    })
  }
  ,
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
  // 关闭提示
  CloseTitle:function(e){
    this.setData({
      showTitle:false,
    })
  },
  // 跳转详情
  ToApplicationDetail:function(e){
    
    if (this.data.appliData.status == 1 || this.data.appliData.status == 4){
      $.openWin({
        url: '../applicationSkills/applicationDetail'
      })
    }
    if (this.data.appliData.status == 2) {
     wx.showToast({
       title: '认证中',
     })
    }
  }

})