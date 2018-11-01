// pages/cropper/cropper.js
var $ = require('../util/commit.js');
var config = require('../util/config.js');
const WeCropper = require('../we-cropper/we-cropper.js')
const device = wx.getSystemInfoSync() // 获取设备信息
const width = device.windowWidth // 示例为一个与屏幕等宽的正方形裁剪框
const system = device.system;
let height = device.windowHeight - 100

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rotateI: 0, //旋转默认角度
    cropperOpt: {
      id: 'cropper',
      rotateI: 0,//旋转默认角度
      tranlateX: width / 2,    //定义canvas 的原点
      tranlateY: height / 2,  //定义canvas 的原点
      width,  // 画布宽度
      height, // 画布高度
      scale: 2.5, // 最大缩放倍数
      zoom: 8, // 缩放系数,
      cut: {
        x: 0,  // 裁剪框的坐标
        y: (height - (width / 1.4)) / 2, // 裁剪框的坐标
        width: width, //裁剪框的大小
        height: width / 1
      }
    },
    chooseImg: false,
    imgSrc: '',
    marTop: 20,
    CutPageType:'',
    picArr:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this;
    let param = JSON.parse(options.data);

    const CutPageType = param.CutPageType;
    const imgSrc = param.url;
    if (CutPageType == 'personalImage'){
      self.setData({
        picArr: param.picArr,
      })
    }
    //兼容可不写
    const system = device.system;
    if (system.indexOf('iOS') != -1) {
      this.setData({
        ios: true
      })
    };
    if (system.indexOf('iOS') != -1) {
      this.setData({
        marTop: 20
      })
    } else {
      this.setData({
        marTop: 20
      })
    };
    if (device.model.indexOf("iPhone X") != -1) {
      this.setData({
        height: wx.getStorageSync('height') * 2 + 50,
        marTop: 40
      })
    };
   
    //裁剪 插件配置
    const { cropperOpt } = this.data;
    new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        self.wecropper.updateCanvas(this.data.rotateI)
      })
      .on('beforeImageLoad', (ctx) => {
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        wx.hideToast()
      })
    self.wecropper.pushOrign(imgSrc)
    // 判断来自哪个page图片的裁剪
    this.setData({
      CutPageType: CutPageType,
      chooseImg: true,
      imgSrc: imgSrc,
      rotateI: 0
    })
  },
 
  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },
  // 获取裁剪后的图片
  getCropperImage() {
    let that = this;

    if (this.data.chooseImg) {
      this.wecropper.getCropperImage((src) => {
        console.log(src);
        
        //获取上个页面的参数
        // let pages = getCurrentPages();
        //   console.log(pages);
        // // //prevPage 相当于上个页面的this，可以通过setData修改上个页面参数执行上个页面的方法等
        //  let prevPage = pages[pages.length - 2]
         if (src) {
           let psnkey = wx.getStorageSync('psnkey');
            
           wx.uploadFile({
             url: config.Config.updateImgUrl,
             filePath: src,
             name: 'file',
             formData: {
               'key': psnkey
             },
             success(res) {
               let pic = JSON.parse(res.data).data.pic;
               if (that.data.CutPageType == 'personalAvatar') {
               
                 $.POST({
                   url: 'wcUserSAVEUD',
                   data: {
                     avatar: pic
                   }
                 }, function (e) {
                   wx.navigateBack();
                   wx.showToast({
                     title: e.msg,
                     icon:'none'
                   });
                 },function(){
                   
                   wx.navigateBack();
                 });

               } else if (that.data.CutPageType =='personalImage'){
                 console.log(that.data.picArr);
                 if (that.data.picArr.length >= 3) {
                   that.data.picArr.pop();
                 }
                 that.data.picArr.unshift(pic);
                 that.setData({
                   image: that.data.picArr,
                 });
                 $.POST({
                   url: 'wcUserSAVEUD',
                   data: {
                     image: that.data.picArr
                   }
                 }, function (e) {
                    wx.navigateBack();
                 }, function (e) {
                   wx.navigateBack();
                 })
               } else if (that.data.CutPageType =='skillCerImage') {
                 //获取上个页面的参数
                 let pages = getCurrentPages();
                 //prevPage 相当于上个页面的this，可以通过setData修改上个页面参数执行上个页面的方法等
                 let prevPage = pages[pages.length - 2];
                 prevPage.setData({
                   pic: pic,
                 });
                 wx.navigateBack();
               }            
             }
           });

        } else {
          wx.hideToast()
          wx.showToast({
            title: '获取图片地址失败，请稍后再试！',
          })
         }
      })
    } else {
      wx.showToast({
        title: '您还没选择图片！',
        icon: 'none'
      })
    }
  },
  cancleCropper() {
    wx.hideToast()
    wx.navigateBack()
  },
  // 图片旋转
  rotateImg() {
    const self = this;
    let rotateI = this.data.rotateI + 1;
    this.setData({
      rotateI: rotateI
    })
    // 将旋转的角度传递给插件
    self.wecropper.updateCanvas(rotateI)
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