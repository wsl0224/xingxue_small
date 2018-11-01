// pages/personalData/personalData.js
var $ = require('../util/commit.js');
var config = require('../util/config.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',
    image: [],
    picArr: [],
    user_nicename: '',
    birth: '',
    signature: '',
    startDate: '1900-01-01',
    endDate: '',
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.freshData();
  },
  // 加载人员信息
  freshData: function(e) {
    let self = this;
    $.POST({
        url: 'wcUserSUD',
        data: {},
      }, function(e) {
        self.setData({
          avatar: e.data.avatar,
          image: e.data.image,
          picArr: e.data.image,
          user_nicename: e.data.user_nicename,
          birth: e.data.birth,
          signature: e.data.signature,
        })
      },
      function(e) {
        console.log(e);
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.freshData();
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
 
  
  // 上传形象照
  updataPhoto: function(e) {
    let self = this;

    console.log(self.data.image);
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0];
        console.log(self.data.image);
        if (src) {
          // 将图片参数传递给插件
      
          $.openWin({
            url: '../cropper/cropper',
            data: {
              CutPageType: 'personalImage',
              url: src,
              picArr: self.data.image
            }
          });
        }

      },
      fail(res) {

      }
    })

  },
  // 修改日期
  bindPickerDateChange: function(e) {
    this.setData({
      birth: e.detail.value,
    });
    let self = this;
    $.POST({
      url: 'wcUserSAVEUD',
      data: {
        birth: e.detail.value
      }
    }, function(e) {
      wx.showToast({
        title: e.msg,
      })
    })
  },
  // 昵称 
  keyNameSignatureBtn: function(e) {
    this.setData({
      user_nicename: e.detail.value,
    });
    let self = this;
    $.POST({
      url: 'wcUserSAVEUD',
      data: {
        name: e.detail.value
      }
    }, function(e) {

    })
  },
  // 签名
  keySignatureBtn: function(e) {
    this.setData({
      signature: e.detail.value,
    });
    let self = this;
    $.POST({
      url: 'wcUserSAVEUD',
      data: {
        signature: e.detail.value
      }
    }, function() {

    })
  },
  // 删除形象照
  delImage: function(e) {
    let self = this;
    console.log(e.currentTarget.dataset.index);
    if (e.currentTarget.dataset.index == 0) {
      this.data.picArr.splice(e.currentTarget.dataset.index, e.currentTarget.dataset.index + 1);
    } else {
      this.data.picArr.splice(e.currentTarget.dataset.index, e.currentTarget.dataset.index);
    }

    this.setData({
      image: self.data.picArr,
    });

    $.POST({
      url: 'wcUserSAVEUD',
      data: {
        image: self.data.picArr,
      }
    }, function(e) {
      wx.showToast({
        title: e.msg,
      })
    })
  },
  // 上传头像
  updataImage: function(e) {
    let self = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0];
        if (src) {
          // 将图片参数传递给插件
          $.openWin({
            url: '../cropper/cropper',
            data: {
              CutPageType: 'personalAvatar',
              url:src
            }
          });
        }
     
      },
      fail(res) {
        
      }
    })
  
  },

})