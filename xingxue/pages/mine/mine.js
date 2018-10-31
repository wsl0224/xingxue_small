// pages/mine/mine.js
let $ = require('../util/commit.js');
const utils = require('../utils/utils');
const { globalData } = getApp();
const { Service: { Status, Conversation } } = globalData;
const watchStatus = () => {
  Status.watch((status) => {
    console.log(status);
    if (status == 3) {
      wx.getUserInfo({
        success: (user) => {
          console.log(user.userInfo);
          Status.connect(user.userInfo);
        }
      });
    }
  })
}
const connect = (context) => {
  watchStatus();
  let userId = wx.getStorageSync('userId');
    let user = wx.getStorageSync('userInfo');
      $.POST({
        url:'wcUserSRYT',
        data: {
          uid:userId,
         }
      },function(e){
        console.log('登录聊天');
        console.log(e);
        wx.setStorageSync('UserToken', e.data.token);
        wx.setStorageSync('UserId', e.data.userId);
        wx.getUserInfo({
          success: (user) => {
          
            user.userInfo.token = e.data.token;
            user.userInfo.id = e.data.userId;
            user.userInfo.userId = e.data.userId;
            user.userInfo.name = e.data.name;
            user.userInfo.nickName = e.data.name;
            user.userInfo.avatar = e.data.avatar;
            user.userInfo.avatarUrl = e.data.avatar; 
            wx.setStorageSync("userInfo", user);      
            Status.connect(user.userInfo).then(() => {
              console.log('connect successfully');
            }, (error) => {
              wx.showToast({
                title: error.msg,
                icon: 'none',
                duration: 3000
              })
            })
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
       
      },function(e){
        console.log(e);
      })
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingShow: false,
    registerShow: false,
    psnData: {
      avatar: 'https://app.xingxue.vip/icon/icon94.png',
      user_nicename: '',
      signature: '',
      follower_num: 0,
      fans_num: 0,
      yuer: 0,
      jingxing: 0,
    },
    psnStatus: 0,
    UserToken: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    self.freshPsnData();
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
    this.freshPsnData();
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
    this.freshPsnData();
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
  // 登录窗口
  ShowToLodPage: function(e) {
    this.setData({
      loadingShow: true,
    })
  },

  CloseLoadPage: function(e) {
    this.setData({
      loadingShow: false,
    })
  },
  // 注册窗口
  ShowRegisterPage: function(e) {
    this.setData({
      registerShow: true,
    })
  },
  // 注册窗口
  CloseRegisterPage: function(e) {
    this.setData({
      registerShow: false,
    })
  },
  // 登录事件
  ToLoded: function(e) {
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
          
          wx.setStorageSync('psnkey', e.data.key);
          wx.setStorageSync('userId', e.data.uid);
          wx.getUserInfo({
            success: (user) => {
              console.log(user);
          
              if (e.data.status == 1) {
                self.ShowRegisterPage(); //显示注册窗口 
              } else {
                connect(self);
                self.freshPsnData();
              }
            }
          });
         
        }, function(e) {

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

  // 注册获取手机号
  Register: function(e) {
    let self = this;
    if (e.detail) {
      console.log('phoneInfo');
      console.log(e.detail)
      wx.getUserInfo({
        success: (user) => {
          console.log(user);
          wx.setStorageSync("phoneInfo", e.detail);
          wx.setStorageSync("userInfo", user);
          self.RegisterApp(); //同步注册APP账号

        }
      })
     
    }

  },
  // 同步注册APP账号
  RegisterApp: function(e) {
    let self = this;
    let userInfo = wx.getStorageSync('userInfo');
    let phoneInfo = wx.getStorageSync('phoneInfo');
    $.POST({
      url: 'wcLoginR',
      data: {
        userinfo: JSON.stringify(userInfo),
        phone: JSON.stringify(phoneInfo),
      }
    }, function(e) {
      wx.setStorageSync('psnkey', e.data.key);
      wx.setStorageSync('userId', e.data.uid);
      self.getLocation();
      connect(self);
      self.freshPsnData();
     
    }, function(e) {
    
    });
    self.CloseRegisterPage();
  },
  // 下拉刷新我的信息
  upper: function(e) {
    this.freshPsnData();
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
          psnData: e.data,
          psnStatus: 1,
        });
        wx.setStorageSync('RZStatus', e.data.stu_status)
        wx.setStorageSync('loadStatus', 1);
      } else {
        wx.stopPullDownRefresh();
        self.setData({
          psnData: {
            avatar: 'https://app.xingxue.vip/icon/icon94.png',
            user_nicename: '',
            signature: '',
            follower_num: 0,
            fans_num: 0,
            yuer: 0,
            jingxing: 0,
          },
          psnStatus: 0,
        })
      }
      wx.stopPullDownRefresh();
    }, function(e) {
      console.log(e)
      wx.stopPullDownRefresh();
    });
  
  },
  

  // 获取当前人地理位置
  getLocation: function(e) {
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
  },

  // 跳转个人资料
  ToPersonalData: function(e) {
    $.openWin({
      url: '../personalData/personalData',
    })
  },
  // 跳转关注或粉丝
  ToMyAttentionFans: function(e) {


    if (e.currentTarget.dataset.type == 'atte') {
      let data = {
        Type: 'atte',
      };
      $.openWin({
        url: '../myAttentionFans/myAttentionFans',
        data: data,
      })
    } else if (e.currentTarget.dataset.type == 'fans') {
      let data = {
        Type: 'fans',
      };
      $.openWin({
        url: '../myAttentionFans/myAttentionFans',
        data: data,
      })
    }
  },
  // 跳转足迹
  ToMyTracks: function(e) {
    $.openWin({
      url: '../myTracks/myTracks',
    })
  },
  // 跳转我的钱包
  ToMyWallet: function(e) {
    $.openWin({
      url: '../myWallet/myWallet',
    })
  },
  // 申请技能
  ToApplicationSkill: function(e) {
   
    if (this.data.psnData.stu_status != 3) {
      $.openWin({
        url: '../applicationSkills/applicationSkills',
      })
    } else {
      $.openWin({
        url: '../mySkill/mySkill',
      })
    }

  },
  // 意见反馈
  ToFeedback: function(e) {
    $.openWin({
      url: '../feedback/feedback',
    })
  },
  // 跳转订单中心
  ToOrderCenter: function(e) {
    $.openWin({
      url: '../orderCenter/orderCenter'
    })
  },
  // 我的接单
  ToMyReceipt: function(e) {
    $.openWin({
      url: '../myReceipt/myReceipt'
    })
  },
  // 跳转兼职任务
  ToOnlineJob: function(e) {
    $.openWin({
      url: '../onlineJob/onlineJob',
    })
  },
  //邀请码
  ToInvitationCode: function(e) {
    $.openWin({
      url: '../invitationCode/invitationCode'
    })
  },
  // 退出
  EXITBtn: function(e) {
    this.setData({
      psnData: {
        avatar: 'https://app.xingxue.vip/icon/icon94.png',
        user_nicename: '',
        signature: '',
        follower_num: 0,
        fans_num: 0,
        price: 0,
        task_count: 0,
      },
      psnStatus: 0,

    })
    wx.clearStorageSync();
    wx.showToast({
      title: '退出成功',
    })
  }
})