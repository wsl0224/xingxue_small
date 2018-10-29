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
    image:[],
    imageArr:[],
    name:'',
    phone:'',
    remark:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let param=JSON.parse(options.data);
    console.log('submitJob');
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
   
    if(!self.data.image){
      wx.showToast({
        title: '请上传图片',
      })
    }
    if (!self.data.name) {
      wx.showToast({
        title: '请填写姓名',
      })
    }
    if (!self.data.phone) {
      wx.showToast({
        title: '请填写手机号',
      })
    }
    if (self.data.image && self.data.name && self.data.phone){
      wx.showLoading({
        title: '提交中...',
      });
      $.POST({
        url: 'Wc/Task/task_sub',
        data: {
          tid: self.data.tid,
          pic: self.data.image.join(),
          mobile: self.data.phone,
          name: self.data.name,
          mid: self.data.mid,
          else: self.data.remark,
        }
      }, function (e) {
        wx.hideLoading();
        $.openWin({
          url: '../bringUpSuccess/promptSuccess'
        })
      }, function (e) {
        wx.hideLoading();
      })
     
    }
    
  },
  // 上传图片
  updataImg:function(e){
    let self = this;
    let psnkey = wx.getStorageSync('psnkey');
    wx.chooseImage({
      count: 5,
      success: function (res) {

        const tempFilePaths = res.tempFilePaths;
        console.log('上传图片');
        console.log(tempFilePaths);
        
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
            self.data.imageArr.push(pic);
            console.log(self.data.imageArr);
            self.setData({
              image: self.data.imageArr,
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
  // delImg
  delImg:function(e){
    var self=this;
    this.data.imageArr.splice(e.currentTarget.dataset.index,e.currentTarget.dataset.index);
    this.setData({
      image: self.data.imageArr,
    })
  }
})