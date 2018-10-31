// pages/payOrder/payOrder.js
var $ = require('../util/commit.js');
var config = require('../util/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      orderID:'',
      orderData:{
        user_nicename:'name',
        avatar:'https://app.xingxue.vip/icon/my_icon5_receipt.png',
        cname:'经济学',
        price:'0.01',
        num:1,
        pay_price:'0.01',
        user_balance:'21.00',
      },
      indexNum:0, 
      payType:[{
        id:'0',
        url:'https://app.xingxue.vip/icon/icon83.png',
        name:'微信',
      },{
        id:'1',
          url:'https://app.xingxue.vip/icon/icon70.png',
        name:'余额',
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let param=JSON.parse(options.data);
    console.log('-监听页面加载');
    console.log(param);
    this.setData({
      orderID:param.id,
    });
    this.freshData();
  },
  // 加载 
  freshData:function(e){
    let self=this;
    $.POST({
      url:'wcOrderSPD',
      data:{
        oid:self.data.orderID,
      }
    },function(e){
      self.setData({
        orderData:e.data
      })
    })
  },
  // 选择
  choosePayType:function(e){
    this.setData({
      indexNum:e.currentTarget.dataset.id,
    })
  },
  payBtn:function(e){
    let self=this;
    if(self.data.indexNum==0){
      // 微信
      $.POST({
        url:'wcWxPay',
        data:{
          oid: self.data.orderID,
        }
      },function(e){
        wx.requestPayment({
          'timeStamp': e.data.timeStamp,
          'nonceStr': e.data.nonceStr,
          'package': e.data.package,
          'signType': 'MD5',
          'paySign': e.data.paySign,
          'success': function (res) {
            $.openWin({
              url: '../orderCenter/orderCenter',
            })
            wx.showToast({
              title: '支付成功',
            })
          },
          'fail': function (res) { },
          'complete': function (res) { }
        });
      })
    }
    if (self.data.indexNum == 1){
      $.POST({
        url:'wcUserBP',
        data:{
          oid:self.data.orderID,
        }
      },function(e){
        $.openWin({
          url: '../orderCenter/orderCenter',
        })
        wx.showToast({
          title: '支付成功',
        })
       
      },function(e){
        console.log(e);
      })
    }
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