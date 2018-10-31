// pages/personalData/personalData.js
var $ = require('../util/commit.js');
var config = require('../util/config.js');
const ctx = wx.createCanvasContext('cover-preview');
var start_position = {};//移动图片时手指起始坐标
var tempFilePath;//图片路径
var tempWidth;//图片初始宽度
var tempHeight;//图片初始高度
var old_x = 0;//图片初始x坐标
var old_y = 0;//图片初始y坐标
var _touches = 1;//触屏的手指数
var old_scale = 1;//原始放大倍数
var new_scale = 1;//新的放大倍数
var is_move = false;//是否移动
var bg_url;

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
    hide_canvas: true, //绘图层显示控制变量
    cavasW:0,
    cavasH:0,
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
  // 上传头像
  updataImage: function(e) {
    let self = this;

    wx.chooseImage({
      count: 1,
      success: function(res) {
        const tempFilePaths = res.tempFilePaths;
         tempFilePath = tempFilePaths[0];
        wx.getImageInfo({
          src: tempFilePaths[0],
          success: function(res) {
            console.log(res.width)
            console.log(res.height);
            self.setData({
              hide_canvas: false,
              // edit_url: tempFilePath
            })
            wx.getImageInfo({
              src: tempFilePath,
              success: function (res) {
                // console.log(res.width)
                // console.log(res.height)
                tempWidth = res.width;
                tempHeight = res.height;
               
                ctx.drawImage(tempFilePath, 0, 0, 375, res.height / res.width * 375);
                ctx.draw();
              }
            })

          }
        });

      },
    })
  },
  
  // 上传形象照
  updataPhoto: function(e) {
    let self = this;
    let psnkey = wx.getStorageSync('psnkey');
    wx.chooseImage({
      count: 1,
      success: function(res) {
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
            if (self.data.picArr.length >= 3) {
              self.data.picArr.pop();
            }
            self.data.picArr.unshift(pic);
            self.setData({
              image: self.data.picArr,
            });
            $.POST({
              url: 'wcUserSAVEUD',
              data: {
                image: self.data.picArr
              }
            }, function(e) {

            }, function(e) {

            })
          }
        })
      },
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
  //监听手指触摸事件，并判断是移动还是缩放，并记录初始状态
  canvas_start: function (e) {
    console.log(e);
    var touches = e.touches.length;
    console.log(touches);
    if (touches == 1) {
      _touches = 1;
      start_position = { x: e.touches[0].x, y: e.touches[0].y, timeStamp: e.timeStamp }
    } else if (touches == 2) {
      _touches = 2;
      start_position = { x: e.touches[0].x, y: e.touches[0].y, x1: e.touches[1].x, y1: e.touches[1].y, timeStamp: e.timeStamp }
    } else {
      _touches = 1;
    }
  },
  //监听手指移动事件，并做出相应调整
  canvas_move: function (e) {
    // console.log(e);
    var touches = e.touches.length;
    if (_touches == 1 && e.timeStamp - start_position.timeStamp > 150) {
      ctx.drawImage(tempFilePath, old_x + e.touches[0].x - start_position.x, old_y + e.touches[0].y - start_position.y, 375 * new_scale, tempHeight / tempWidth * 375 * new_scale);
      ctx.draw();
      is_move = true;
    } else if (_touches == 2 && e.timeStamp - start_position.timeStamp > 150) {
      var change_x = Math.abs(Math.abs(e.touches[0].x - e.touches[1].x) - Math.abs(start_position.x - start_position.x1));
      var change_y = Math.abs(Math.abs(e.touches[0].y - e.touches[1].y) - Math.abs(start_position.y - start_position.y1));
      if (change_x - change_y > 10) {
        old_scale = Math.abs(e.touches[0].x - e.touches[1].x) / Math.abs(start_position.x - start_position.x1);
      } else {
        old_scale = Math.abs(e.touches[0].y - e.touches[1].y) / Math.abs(start_position.y - start_position.y1);
      }
      ctx.drawImage(tempFilePath, old_x, old_y, 375 * old_scale * new_scale, tempHeight / tempWidth * 375 * old_scale * new_scale);
      ctx.draw();
      is_move = true;
    } else {
      is_move = false;
    }
  },
  //监听手指离开动作，并保存当前状态数据
  canvas_end: function (e) {
    // console.log(e);
    if (_touches == 1 && is_move) {
      old_x = old_x + e.changedTouches[0].x - start_position.x;
      old_y = old_y + e.changedTouches[0].y - start_position.y;
    } else if (_touches == 2 && is_move) {
      new_scale = old_scale * new_scale;
    }

  },
  //确定并上传背景图
  upload_bg: function () {
    var that = this;
    let width,height;
    if (tempWidth>tempHeight){
      width = tempHeight;
      height = tempHeight;
    }else{
      width = tempWidth;
      height = tempWidth;;
    }
    console.log(width,height);
    // console.log(screenWidth);
    var screenWidth = wx.getSystemInfoSync().screenWidth;
    wx.canvasToTempFilePath({
      x: screenWidth / 2 - 75,
      y: screenWidth / 750 * 400,
      width: width/2,
      height: width / 2-20,
      destWidth: width / 2,
      destHeight: width / 2,
      quality: 1,
      canvasId: 'cover-preview',
      success: function (res) {
        that.setData({
          hide_canvas: true,
        })
        //res.tempFilePath即为生成的图片路径
        console.log(res.tempFilePath);
        let psnkey = wx.getStorageSync('psnkey');

        wx.uploadFile({
          url: config.Config.updateImgUrl,
          filePath: res.tempFilePath,
          name: 'file',
          formData: {
            'key': psnkey
          },
          success(res) {
            console.log(res);
            let pic = JSON.parse(res.data).data.pic;
            console.log(pic);
            that.setData({
              avatar: pic,
            });
            $.POST({
              url: 'wcUserSAVEUD',
              data: {
                avatar: pic
              }
            }, function (e) {
              
              wx.showToast({
                title: e.msg,
              })
            })
          }


        });
      }
    })
  },
  //取消图片预览编辑
  cancel_croper: function () {
    ctx.clearActions();
    this.setData({
      hide_canvas: true,
      // edit_url: tempFilePath
    })
  },



})