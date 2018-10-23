// pages/orderCenter/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paramData:'',
    orderData:{
      psnImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      psnName:'成都小甜甜',
      sex:1,
      age:20,
      psnEaluateVal:'5.0',
      Type:'LOL陪玩',
      Time:'08月08日 18:30',
      Num:1,
      Money:'15.23',
      Unit:'小时',
      Discount:'暂无优惠',
      
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      paramData:JSON.parse(options.data),
    });
  },
freshData:function(e){
  $.POST(
    
  )
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

  }
})