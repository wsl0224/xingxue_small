// pages/putForward/putForward.js
let $=require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yuer:'',
    endValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.freshData();
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
  // 加载余额
  freshData:function(e){
    let self=this;
    $.POST({
      url:'wcUserSUB',
      data:{}
    },function(e){
      self.setData({
        yuer: e.data.price,
      })
    },function(e){
      console.log(e);
    })
  },
  // 输入金额
  updatePrice:function(e){
    let self=this;
    self.setData({
      endValue:e.detail.value,
    })
  },
  // 提现
  onBtn:function(e){
    let self=this;
    if (self.data.yuer>=self.data.endValue){
      $.POST({
        url: 'wcUserAW', data: {
          price:self.data.endValue
        }
      },function(e){
        $.openWin({
          url: '../bringUpSuccess/bringUpSuccess',
          data:{
            price: self.data.endValue,
          }
        })
      },function(e){
        console.log(e);
      })
    }else{
      wx.showToast({
        title: '输入金额不可大于余额',
        icon: 'none',
        duration: 2000
      })

    }
   
    
  }
})