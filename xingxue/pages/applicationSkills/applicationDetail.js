// pages/applicationSkills/applicationDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTitle: true,
    content: "<p>1.信息无遮盖，内容清晰，证件照需包含学号</p><p>2.手持学生证件照，照片中证件文字需清晰</p>",
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
  // 关闭提示
  CloseTitle: function (e) {
    this.setData({
      showTitle: false,
    })
  },
})