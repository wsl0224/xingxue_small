// pages/allType/allType.js
let $=require('../util/commit.js');
Page({

  /**
   * 页面的初始化数据 
   */
  data: {
    typeData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.freshData();
  },
  // 刷新数据
  freshData:function(e){
    let self=this;
    $.GET({
      url:'wcOtherC',
    },function(e){
      console.log('wcOtherC');
      console.log(e);
      self.setData({
        typeData:e.data,
      })
    },function(e){

    });
    wx.stopPullDownRefresh();
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
  // 跳转极速下单
  ToLevePage: function (e) {
    
    $.openWin({
      url: '../order/sendOrder'
    })
  },
  // 跳转二级
  ToTwoSkillPage:function(e){
    $.openWin({
      url:'../skillList/skillList',
      data:{
        id:e.currentTarget.dataset.id,
        title:e.currentTarget.dataset.title
      }
    })
  }
})