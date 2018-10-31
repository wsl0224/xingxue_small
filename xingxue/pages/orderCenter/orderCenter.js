// pages/orderCenter/orderCenter.js
let $ = require('../util/commit.js');
let page = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderData: [],
    startX: 0, //开始坐标
    startY: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadData();
  },
  // 加载数据
  loadData: function(e) {
    let self = this;
    $.POST({
      url: 'wcOrderSUO',
      data: {
        page: 1,
      }
    }, function(e) {
      self.setData({
        orderData: e.data,
      })
    }, function(e) {
      console.log(e);
    })
    wx.stopPullDownRefresh();
  },
  upper: function(e) {
    this.loadData();
  },
  lower: function(e) {
    let self = this;
    self.page++;
    $.POST({
      url: 'wcOrderSUO',
      data: {
        page: self.page,
      }
    }, function(e) {
      self.setData({
        orderData: self.data.orderData.concat(e.data),
      })
    }, function(e) {
      console.log(e);
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  touchstart: function(e) {

    //开始触摸时 重置所有删除

    this.data.orderData.forEach(function(v, i) {

      if (v.isTouchMove) //只操作为true的

        v.isTouchMove = false;

    })
    this.setData({

      startX: e.changedTouches[0].clientX,

      startY: e.changedTouches[0].clientY,

      orderData: this.data.orderData

    })

  },
  //滑动事件处理

  touchmove: function (e) {

    var that = this,

      index = e.currentTarget.dataset.index,//当前索引

      startX = that.data.startX,//开始X坐标

      startY = that.data.startY,//开始Y坐标

      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标

      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标

      //获取滑动角度

      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });

    that.data.items.forEach(function (v, i) {

      v.isTouchMove = false

      //滑动超过30度角 return

      if (Math.abs(angle) > 30) return;

      if (i == index) {

        if (touchMoveX > startX) //右滑

          v.isTouchMove = false

        else //左滑

          v.isTouchMove = true

      }

    })
    //更新数据

    that.setData({

      orderData: that.data.orderData

    })

  },
  /**

* 计算滑动角度

* @param {Object} start 起点坐标

* @param {Object} end 终点坐标

*/

  angle: function (start, end) {

    var _X = end.X - start.X,

      _Y = end.Y - start.Y

    //返回角度 /Math.atan()返回数字的反正切值

    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);

  },

  //删除事件

  del: function (e) {

    this.data.orderData.splice(e.currentTarget.dataset.index, 1)

    this.setData({

      orderData: this.data.orderData

    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.loadData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.loadData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 跳转订单详情页
  ToOrderDetail: function(e) {
    if (e.currentTarget.dataset.status == 1) {
      $.openWin({
        url: '../orderCenter/choosePsnPage',
        data: {
          id: e.currentTarget.dataset.id,
          status: e.currentTarget.dataset.status,
        }
      })
    } else {
      $.openWin({
        url: '../orderCenter/orderDetail',
        data: {
          id: e.currentTarget.dataset.id,
          status: e.currentTarget.dataset.status,
        }
      })
    }

  }

})