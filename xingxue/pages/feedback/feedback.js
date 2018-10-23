// pages/feedback/feedback.js
let $=require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexNum:0,
    typeData:['产品问题','优化建议','违规举报'],
    endValue:'1',
    content:'',
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
      indexNum:e.currentTarget.dataset.num,
      endValue:e.currentTarget.dataset.value,
    })
  },
  // 填写反馈内容
  bindKeyInput:function(e){
    this.setData({
      content: e.detail.value,
    })

  },
  // 提交
  submitBtn:function(e){
    let self=this;
    if (self.data.content){
    $.POST({
      url: 'wcUserAFB',
      data: {
        content: self.data.content,
        type:self.data.endValue,
      }
    },function(e){
      wx.showToast({
        title: '提交成功',
      });
      wx.navigateBack();
    },function(e){})
  }else{
      wx.showToast({
        title: '请填写反馈意见',
      });
  }
  }
})