// pages/onlineJob/submitJob.js
let $ = require('../util/commit.js');
let config = require('../util/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tid:'',
    mid:'',
    image:'',
    name:'',
    phone:'',
    remark:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let param=JSON.parse(options.data);
    this.setData({
      tid:param.id,
      mid: param.mid,
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

  // 确认
  ToSure:function(e){
    let self=this;
    $.POST({
      url:'Wc/Task/task_sub',
      data:{
        tid: self.data.tid,
        pic: self.data.image,
        mobile: self.data.phone,
        name: self.data.name,
        mid: self.data.mid,
        else: self.data.remark,
      }
    })
    $.openWin({
      url:'../bringUpSuccess/promptSuccess'
    })
  },
  // 上传图片
  updataImg:function(e){
    let self = this;
    let psnkey = wx.getStorageSync('psnkey');
    wx.chooseImage({
      count: 1,
      success: function (res) {

        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: config.Config.updateImgUrl,
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'key': psnkey
          },
          success(res) {
            let pic = JSON.parse(res.data).data.pic;
            console.log(pic);
            self.setData({
              image: pic,
            })
          }
        })
      },
    })
  },
  // name
  keyName:function(e){
    this.setData({
      name:e.detail.value,
    })
  },
  // phone
  keyPhone:function(e){
    this.setData({
      phone: e.detail.value,
    })
  },
  // keyRemark
  keyRemark:function(e){
    this.setData({
      remark: e.detail.value,
    })
  },
})