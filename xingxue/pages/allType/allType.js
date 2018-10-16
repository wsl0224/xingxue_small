// pages/allType/allType.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeData:[
      {
        title:'天天向上',
        typeItem:[{
          id:1,
          url:'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          name:'任务大厅',
        }, {
            id: 2,
            url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            name: '机构',
          }, {
            id: 3,
            url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            name: '线上兼职',
          }, {
            id: 4,
            url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            name: '线性代数',
          }, {
            id: 5,
            url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            name: '任务大厅',
          }, {
            id: 6,
            url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            name: '任务大厅',
          },{
            id: 7,
            url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            name: '任务大厅',
          },{
            id: 8,
            url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            name: '任务大厅',
          }]
    },{
        title:'天天向上',
        typeItem:[{
          id:1,
          url:'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          name:'任务大厅',
        }, {
            id: 2,
            url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            name: '机构',
          }, {
            id: 3,
            url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            name: '线上兼职',
          }, {
            id: 4,
            url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            name: '线性代数',
          }, {
            id: 5,
            url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            name: '任务大厅',
          }, {
            id: 6,
            url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            name: '任务大厅',
          },{
            id: 7,
            url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            name: '任务大厅',
          },{
            id: 8,
            url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            name: '任务大厅',
          }]
      }, {
        title: '运动休闲',
        typeItem: [{
          id: 1,
          url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          name: '任务大厅',
        }, {
          id: 2,
          url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          name: '机构',
        }, {
          id: 3,
          url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          name: '线上兼职',
        }, {
          id: 4,
          url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          name: '线性代数',
        }, {
          id: 5,
          url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          name: '任务大厅',
        }, {
          id: 6,
          url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          name: '任务大厅',
        }, {
          id: 7,
          url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          name: '任务大厅',
        }, {
          id: 8,
          url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          name: '任务大厅',
        }]
      }]
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
  // 跳转极速下单
  ToLevePage: function (e) {
      wx.navigateTo({
        url: '../order/sendOrder',
      })  
  }
})