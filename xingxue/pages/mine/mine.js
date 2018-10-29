// pages/mine/mine.js
let $ = require('../util/commit.js');
const utils = require('../utils/utils');
const { globalData } = getApp();
const { Service: { Status, Conversation } } = globalData;
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
          self.getUserInfo(); //获取人员信息
          if (e.data.status == 1) {
      
            self.ShowRegisterPage(); //显示注册窗口 

          } else {
            self.chatLogin();
            self.freshPsnData();
          }
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
  // 获取人员信息
  getUserInfo: function(e) {
    // 登录成功后获取人员信息
    wx.getUserInfo({
      success: function(res) {
        wx.setStorageSync("userInfo", res);
       
        console.log(res);
        if (res) {
          Status.connect(res.userInfo).then(() => {
            console.log('connect successfully');
          }, (error) => {
            wx.showToast({
              title: error.msg,
              icon: 'none',
              duration: 3000
            })
          })
        }
      }
    });

  },
  // 注册获取手机号
  Register: function(e) {
    let self = this;
    if (e.detail) {
      wx.setStorageSync("phoneInfo", e.detail);
      self.RegisterApp(); //同步注册APP账号
      self.chatLogin(); //聊天登录
      self.freshPsnData(); //刷新我的信息
      self.CloseRegisterPage();
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
      self.freshPsnData();
    }, function(e) {
    
    })
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
        })
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
    }, function(e) {
      console.log(e)

    })
  },
  // 登录消息

  // 登录聊天
  chatLogin: function(cb) {
    let that=this;
    let userId=wx.getStorageSync('userId');
      $.POST({
        url:'wcUserSRYT',
        data: {
          uid:userId,
         }
      },function(e){
        console.log('登录聊天');
        wx.setStorageSync('UserToken', e.data.token);
        wx.setStorageSync('UserId', e.data.userId);
        
      },function(e){
        console.log(e);
      })
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
    wx.clearStorageSync();
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
  }
})