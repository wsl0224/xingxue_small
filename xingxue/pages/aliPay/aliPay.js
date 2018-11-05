// pages/aliPay/aliPay.js
let $=require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Name:'',
    Number:'',
    Price:'',
    walletData:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.freshData();
  },
  // 加载余额
  freshData:function(){
    let self = this;
    $.POST({
      url: 'wcUserSUB', data: {

      }
    }, function (e) {
      self.setData({
        walletData: e.data
      })
    }, function (e) {
      console.log(e);
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
  //真实姓名
  keyUpName:function(e){
    console.log(e);
    this.setData({
      Name:e.detail.value,
    })
  },
  // 账号
  keyUpNumber:function(e){
    console.log(e);
    this.setData({
      Number:e.detail.value,
    })
  },
  // 金额
  keyUpPrice:function(e){
    console.log(e);
    this.setData({
      Price:e.detail.value,
    })
  },
  // 提现
  sumbitBtn:function(e){
    let self=this;
  
    if(self.data.Name){
      if(self.data.Number){
        if(self.data.Price){
          let price = self.data.walletData.price - self.data.Price  ;
          if (price>=0){
              $.POST({
                url:'wcUserWA',
                data:{
                  price:self.data.Price,
                  trade_no: self.data.Number,
                  name:self.data.Name
                }
              },function(e){
                $.openWin({
                  url:'../bringUpSuccess/bringUpSuccess',
                  data:{
                    money: self.data.Price,
                    Type:'aliPay',
                  }
                })
       
               
              },function(e){

              })
          }else{
            wx.showToast({
              title: '余额不足',
              icon: 'none',
            })
          }
        }else{
          wx.showToast({
            title: '请填写金额',
            icon: 'none',
          })
        }
      }else{
        wx.showToast({
          title: '请填写支付宝账号',
          icon: 'none',
        })
      }
    }else{
      wx.showToast({
        title: '请填写姓名',
        icon:'none',
      })
    }
  }
})