// pages/startPage/startPage.js
let $ = require('../util/commit.js');
const utils = require('../utils/utils');
const {
  globalData
} = getApp();
const {
  Service: {
    Status,
    Conversation
  }
} = globalData;

const connect = (context) => {

  let userId = wx.getStorageSync('userId');
  let user = wx.getStorageSync('userInfo');
  $.POST({
    url: 'wcUserSRYT',
    data: {
      uid: userId,
    }
  }, function(e) {
    console.log(e)

    wx.setStorageSync('UserToken', e.data.token);
    wx.setStorageSync('UserId', e.data.userId);
    let user = wx.getStorageSync("urserConInfo");
    console.log(user);
    user.userInfo.token = e.data.token;
    user.userInfo.id = e.data.userId;
    user.userInfo.userId = e.data.userId;
    user.userInfo.name = e.data.name;
    user.userInfo.nickName = e.data.name;
    user.userInfo.avatar = e.data.avatar;
    user.userInfo.avatarUrl = e.data.avatar;
    wx.setStorageSync("userInfo", user);

    console.log('登录userInfo聊天');
    console.log(user);
    Status.connect(user.userInfo).then(() => {
      console.log('connect successfully');
      context.ToHome();
      context.freshPsnData();
    }, (error) => {
      wx.showToast({
        title: error.msg,
        icon: 'none',
        duration: 3000
      })
    })
  }, function(e) {


  })
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLoad: true,
    hasUserAuth: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      wx.getStorage({
        key: 'loadStatus',
        success: function(res) {
          if (res.data) {
            wx.redirectTo({
              url: '../home/home',
            })
          }
        },
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
  // 登录事件
  getUserInfo: function(e) {
    wx.showToast({
      title: '授权中',
      icon: 'loading',
    });
    let self = this;
    wx.login({
      timeout: 5000,
      success: function(e) {
        // 微信登录接口
        $.POST({
          url: 'wcLogin',
          data: {
            code: e.code,
          },
        }, function(e) {
          wx.setStorage({
            key: "psnkey",
            data: e.data.key
          });
          wx.setStorage({
            key: "userId",
            data: e.data.uid
          });
          wx.setStorageSync('loadStatus', 1);
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                  success: (user) => {
                    wx.setStorage({
                      key: 'urserConInfo',
                      data: user,
                    })
                    if (e.data.status == 1) { //未注册
                      self.setData({
                        showLoad: false,
                      })
                      wx.showToast({
                        title: '请手机号授权注册',
                      })
                    } else { //已注册  
                      self.getLocation();
                      self.ToHome();
                      self.freshPsnData();
                    }



                  },
                  fail: (error) => {
                    console.log(error);
                    wx.showToast({
                      title: '换个网络试试，只能帮你到这了～',
                      icon: 'none',
                      duration: 3000
                    })
                  }
                })
              }
            }
          })
          wx.hideToast()

        }, function(e) {
          wx.hideToast()
        });

      },
      fail: function(e) {
        wx.showToast({
          title: '失败',
          icon: 'error',
          duration: 2000
        })
      }
    });

  },
  // 同步注册APP账号
  getPhoneNumber: function(e) {
    let self = this;
    wx.showToast({
      title: '手机号授权中。。。',
      icon: 'loading',
    })
  let detail=e.detail;
  wx.setStorageSync("phoneInfo", e.detail);
  wx.getStorage({
    key: 'urserConInfo',
    success: function(res) {
      let userInfo = res.data;
      $.POST({
        url: 'wcLoginR',
        data: {
          userinfo: JSON.stringify(userInfo),
          phone: JSON.stringify(detail),
        }
      }, function (e) {
         wx.setStorage({
            key: "psnkey",
            data: e.data.key
          });
          wx.setStorage({
            key: "userId",
            data: e.data.uid
          });
        self.getLocation();
        self.ToHome();
        self.freshPsnData();
        wx.hideToast()
      }, function (e) {
        wx.hideToast()
      });
    },
  })
  
 

  },
  // 获取当前人地理位置
  getLocation: function(e) {

    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userLocation']) {
          wx.getLocation({
            type: 'wgs84',
            success(res) {

              wx.setStorage({
                key: 'address',
                data: res,
              });
              //更新地理位置
              $.POST({
                url: 'wcUserUUC',
                data: {
                  longitude: res.longitude,
                  latitude: res.latitude,
                }
              }, function(e) {
                  
              }, function(e) {
                
              })
            }
          })
        }
      }
    })
  },
  // 跳转首页
  ToHome: function(e) {
    console.log('home/home')
    wx.switchTab({
      url: '../home/home'
    })
  },
  // 刷新我的信息
  freshPsnData: function(e) {
    let self = this;
    $.POST({
      url: 'wcUserMHP',
      data: {},
    }, function(e) {
      if (e.code == 200) {
        self.setData({
          psnStatus: 1,
        });
        wx.setStorageSync('RZStatus', e.data.stu_status)

      }
    }, function(e) {
      console.log(e)

    });

  },
  // 跳转用户协议
  ToUrl: function(e) {
    $.openWin({
      url: '../webView/webView',
      data: {
        url: 'https://app.xingxue.vip/wcOtherSUP',
      }
    })
  },
  // formBtn 
  formSubmit: function(e) {
    $.POST({
      url: 'wcUserAFI',
      data: {
        formid: e.detail.formId,
      }
    }, function(e) {

    }, function() {

    })
  }
})