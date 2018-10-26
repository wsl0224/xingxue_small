// pages/mine/mine.js
let $=require('../util/commit.js');
var webim = require('../../utils/webim_wx.js');
var webimhandler = require('../../utils/webim_handler.js');
var tls = require('../../utils/tls.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingShow:false,
    registerShow:false,
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

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   let self=this;
    self.freshPsnData();
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
    this.freshPsnData();
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
  // 登录窗口
  ShowToLodPage:function(e){
    this.setData({
      loadingShow: true,
    })
  },
 
  CloseLoadPage:function(e){
    this.setData({
      loadingShow:false,
    })
  },
  // 注册窗口
  ShowRegisterPage: function (e) {
    this.setData({
      registerShow: true,
    })
  },
  // 注册窗口
  CloseRegisterPage: function (e) {
    this.setData({
      registerShow: false,
    })
  },
  // 登录事件
  ToLoded:function(e){ 
    let self=this;
    wx.login({
      timeout: 5000,
      success: function (e) {
        // 微信登录接口
        $.POST({
          url: 'wcLogin',
          data: {
            code: e.code,
          },
        }, function (e) {
          console.log(e.data.key);
          wx.setStorageSync('psnkey', e.data.key);
          if (e.data.status == 1) {
              self.getUserInfo();//获取人员信息
              self.ShowRegisterPage();//显示注册窗口 
          } else {
              self.freshPsnData();
              

          }
        }, function (e) {

        });

      },
      fail: function (e) {
        wx.showToast({
          title: '失败',
          icon: 'error',
          duration: 2000
        })
      }

    });  
  },
  // 获取人员信息
  getUserInfo:function(e){
    // 登录成功后获取人员信息
    wx.getUserInfo({
      success: function (res) { 
        wx.setStorage({
          key: "userInfo",
          data: res,
        });
      }
    });

  },
  // 注册获取手机号
  Register:function(e){
    let self=this;
    if(e.detail){
      wx.setStorage({
        key: "phoneInfo",
        data:  e.detail,

      });
      self.RegisterApp();//同步注册APP账号
      self.chatLogin();//聊天登录
      self.freshPsnData();//刷新我的信息
      self.CloseRegisterPage();
    }
    
  },
  // 同步注册APP账号
  RegisterApp:function(e){
      let self=this;
      wx.getStorage({
        key: 'userInfo',
        success: function (userInfo) {
          wx.getStorage({
            key: 'phoneInfo',
            success: function (phoneInfo) {
              console.log(userInfo, phoneInfo)
                $.POST({
                  url:'wcLoginR',
                  data:{
                    userinfo: JSON.stringify(userInfo),
                    phone: JSON.stringify(phoneInfo),
                  }
                },function(e){
                  wx.setStorage({
                    key: 'key',
                    data: e.data.key,
                  });
                  wx.setStorage({
                    key: 'userId',
                    data: e.data.uid,
                  });
                  self.getLocation();
                  self.freshPsnData();
                },function(e){
                  console.log(e);
                })
            },
          })
        },
      });
  },
  // 下拉刷新我的信息
  upper:function(e){
    
    this.freshPsnData();
  },
  // 刷新我的信息
  freshPsnData:function(e){
    let self=this;
    $.POST({
      url:'wcUserMHP',
      data:{},
    },function(e){
      if(e.code==200){
        self.setData({
          psnData: e.data,
          psnStatus: 1,
        })
      }else{
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
    },function(e){
        console.log(e)
      
    })
  },
  // 登录聊天
  chatLogin: function (cb) {
    console.log('调用登录聊天');
    var that = this;
    tls.login({
      success: function (data) {
        console.log('返回登录聊天信息');
        console.log(data);
        that.setData({
          Identifier: data.Identifier,
          UserSig: data.UserSig
        })
      }
    });
  },
// 获取当前人地理位置
getLocation:function(e){
  wx.getLocation({
    type: 'wgs84',
    success(res) {
      console.log('获取当前人地理位置');
      console.log(res);
      wx.setStorage({
        key: 'address',
        data: res,
      });
      //更新地理位置
      $.POST({
        url:'wcUserUUC',
        data:{
          longitude: res.longitude,
          latitude:res.latitude,
        }
      },function(e){
        console.log(e.msg)
      },function(e){
        console.log(e);
      })
    }
  })
},
 
  // 跳转个人资料
  ToPersonalData:function(e){
    $.openWin({
      url: '../personalData/personalData',
    })
  },
  // 跳转关注或粉丝
  ToMyAttentionFans:function(e){
  
    
    if(e.currentTarget.dataset.type=='atte'){
      let data={
        Type:'atte',
      };
      $.openWin({
        url:'../myAttentionFans/myAttentionFans',
        data:data,        
      })
    } else if (e.currentTarget.dataset.type == 'fans'){
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
  ToMyTracks:function(e){
    $.openWin({
      url:'../myTracks/myTracks',
    })
  },
  // 跳转我的钱包
  ToMyWallet:function(e){
    $.openWin({
      url:'../myWallet/myWallet',
    })
  },
  // 申请技能
  ToApplicationSkill:function(e){
    console.log(this.data.psnData.skillRZstatus)
    if (this.data.psnData.stu_status!=3){
      $.openWin({
        url: '../applicationSkills/applicationSkills',
      })
    }else{
      $.openWin({
        url: '../mySkill/mySkill',
      })
    }
    
  },
  // 意见反馈
  ToFeedback:function(e){
    $.openWin({
      url:'../feedback/feedback',
    })
  },
  // 跳转订单中心
  ToOrderCenter:function(e){
    $.openWin({
      url:'../orderCenter/orderCenter'
    })
  },
  // 我的接单
  ToMyReceipt:function(e){
    $.openWin({
      url:'../myReceipt/myReceipt'
    })
  },
  // 跳转兼职任务
  ToOnlineJob:function(e){
    $.openWin({
      url: '../onlineJob/onlineJob',
    })
  },
  //邀请码
  ToInvitationCode:function(e){
    $.openWin({
      url:'../invitationCode/invitationCode'
    })
  }

})