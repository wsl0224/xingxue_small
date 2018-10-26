// pages/recharge/recharge.js
let $=require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexNum:0,
    moneyData:['30','50','100','200','500','1000'],
    endMoney:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      endMoney:this.data.moneyData[0],
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
  // 选择金额
  ChooseItem:function(e){
    this.setData({
      indexNum: e.currentTarget.dataset.num,
      endMoney: e.currentTarget.dataset.value,
    })
   console.log(this.data.endMoney); 
  },
  // 输入充值金额
  bindKeyInput:function(e){
    console.log(e.detail.value);
    if(e.detail.value){
      this.setData({
        inputValue: e.detail.value,
        indexNum: -1,
        endMoney:e.detail.value,
      })
    }else{
      this.setData({
        inputValue: this.data.moneyData[0],
        indexNum: 0,
      });
    
    }
   
  },
  // 充值事件
  DoRecharge:function(e){
    let self=this;
    $.POST({ url:'wcUserR',data:{
      price: self.data.endMoney,
      pay_type:2
    }},function(e){
      console.log(e);
      wx.requestPayment({
        'timeStamp': e.data.timeStamp,
        'nonceStr': e.data.nonceStr,
        'package': e.data.package,
        'signType': 'MD5',
        'paySign': e.data.paySign,
        'success': function (res) { 
         console.log(res);
        },
        'fail': function (res) { },
        'complete': function (res) { }
      });
    },function(e){
      console.log(e)
    })
  }
 
})