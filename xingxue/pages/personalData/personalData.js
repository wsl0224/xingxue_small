// pages/personalData/personalData.js
var $=require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    psnData:{
      url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      photo: [
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'],
      name:'成都小甜甜',
      date:'1987.09.23',
      qianming: "爱到最美是陪伴",
    }
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
  // 上传头像
  updataImage:function(e){
    wx.chooseImage({
      count:1,
      sourceType: ['album', 'camera'],
      success: function(res) {
        wx.uploadFile({
          url: util.getClientSetting().domainName + '/home/uploadfilenew',
          filePath: tempFilePaths[i],
          name: 'uploadfile_ant',
          formData: {
            'imgIndex': i
          },
          header: {
            "Content-Type": "multipart/form-data"
          }, 
          success:function(res){

          }
        })
      },
    })
  },
})