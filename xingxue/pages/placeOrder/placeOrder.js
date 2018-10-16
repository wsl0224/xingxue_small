// pages/placeOrder/placeOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    psnData:{
      url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      name:'成都小甜甜',
    },
    title:'叫醒服务',
    sexNeed:'全部',
    time:'选择时间',
    num:1,
    remark:'',
    money:8,
    allMoney:8,
     PLArray: ['叫醒服务', '叫醒服务', '叫醒服务', '叫醒服务'],
    SexArray:['全部','男','女'],
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
  // 数量运算
  reduceNum: function (e) {
    if (this.data.num > 1) {
      this.data.num -= 1;
      this.setData({
        num: this.data.num,
        allMoney: this.data.num * this.data.money
      })
    }

  },
  addNum: function (e) {
    this.data.num += 1;
    this.setData({
      num: this.data.num,
      allMoney: this.data.num * this.data.money
    })
  },
  // 品类选择
  bindPickerPLChange: function (e) {
    this.setData({
      title: this.data.PLArray[e.detail.value]
    })
  },
  // sex选择
  bindPickerSexChange: function (e) {
    this.setData({
      sex: this.data.SexArray[e.detail.value]
    })
  }
})