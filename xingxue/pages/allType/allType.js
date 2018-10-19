// pages/allType/allType.js
let $=require('../util/commit.js');
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
          url:'../image/icon/icon37.png',
          name:'任务大厅',
        }, {
            id: 2,
            url: '../image/icon/icon38.png',
            name: '机构',
          }, {
            id: 3,
            url: '../image/icon/icon39.png',
            name: '线上兼职',
          }, {
            id: 4,
            url: '../image/icon/icon39.png',
            name: '线性代数',
          }, {
            id: 5,
            url: '../image/icon/icon39.png',
            name: '任务大厅',
          }, {
            id: 6,
            url: '../image/icon/icon38.png',
            name: '任务大厅',
          },{
            id: 7,
            url: '../image/icon/icon38.png',
            name: '任务大厅',
          },{
            id: 8,
            url: '../image/icon/icon38.png',
            name: '任务大厅',
          }]
    },{
        title:'天天向上',
        typeItem:[{
          id:1,
          url: '../image/icon/icon38.png',
          name:'任务大厅',
        }, {
            id: 2,
            url: '../image/icon/icon38.png',
            name: '机构',
          }, {
            id: 3,
            url: '../image/icon/icon38.png',
            name: '线上兼职',
          }, {
            id: 4,
            url: '../image/icon/icon38.png',
            name: '线性代数',
          }, {
            id: 5,
            url: '../image/icon/icon38.png',
            name: '任务大厅',
          }, {
            id: 6,
            url: '../image/icon/icon38.png',
            name: '任务大厅',
          },{
            id: 7,
            url: '../image/icon/icon38.png',
            name: '任务大厅',
          },{
            id: 8,
            url: '../image/icon/icon38.png',
            name: '任务大厅',
          }]
      }, {
        title: '运动休闲',
        typeItem: [{
          id: 1,
          url: '../image/icon/icon38.png',
          name: '任务大厅',
        }, {
          id: 2,
            url: '../image/icon/icon38.png',
          name: '机构',
        }, {
          id: 3,
            url: '../image/icon/icon38.png',
          name: '线上兼职',
        }, {
          id: 4,
            url: '../image/icon/icon38.png',
          name: '线性代数',
        }, {
          id: 5,
            url: '../image/icon/icon38.png',
          name: '任务大厅',
        }, {
          id: 6,
            url: '../image/icon/icon38.png',
          name: '任务大厅',
        }, {
          id: 7,
            url: '../image/icon/icon38.png',
          name: '任务大厅',
        }, {
          id: 8,
            url: '../image/icon/icon38.png',
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
    
    $.openWin({
      url: '../ order / sendOrder'
    })
  },
  // 跳转二级
  ToTwoSkillPage:function(e){
    $.openWin({
      url:'../twoSkillPage/twoSkillPage',
      data:{
        id:'111',
        title:e.currentTarget.dataset.title
      }
    })
  }
})