// pages/psnPage/psnPage.js
let $ = require('../util/commit.js');
const utils = require('../utils/utils');
const innerAudioContext = wx.createInnerAudioContext();
const { globalData } = getApp();
const { Service: { Status, Conversation } } = globalData;

const connect = (context) => {
  let userId = wx.getStorageSync('userId');
  let user = wx.getStorageSync('userInfo');
  $.POST({
    url: 'wcUserSRYT',
    data: {
      uid: userId,
    }
  }, function (e) {
    wx.setStorageSync('UserToken', e.data.token);
    wx.setStorageSync('UserId', e.data.userId);
    let user = wx.getStorageSync("urserConInfo");
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
    });
  }, function (e) {
    console.log(e);
  })

};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    psnId:'',
    psnData: {},
    skillData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let param = JSON.parse(options.data);
    console.log(param);
    this.setData({
      psnId:param.id,
    })
    if (wx.getStorageSync('loadStatus') == 1) {
      connect(this);
    }

    this.freshData();
  },
  // 刷新个人信息
  freshData:function(e){
    let self=this;
    $.POST({
      url: 'wcUserSUHP',
      data: {
        uid: self.data.psnId,
      }
    },
      function (e) {
        self.setData({
          psnData: e.data.user,
          skillData: e.data.skill
        })
      },
      function (e) {
        console.log(e);
      }
    )
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },
// 关注取关
  AtteBtn:function(e){
    if(e.currentTarget.dataset.status==1){
        //取关
        $.POST({
          url:'wcUserUFU',
          data:{
            fid:e.currentTarget.dataset.id,
          }
        },function(e){
          wx.showToast({
            title: '取关成功',
          });
        },function(e){
          console.log(e);
        })
    }else{
      //关注
      $.POST({
        url: 'wcUserUFU',
        data: {
          uid: e.currentTarget.dataset.psnId,
        }
      }, function (e) {
        wx.showToast({
          title: '关注成功',
        });
      }, function (e) {
        console.log(e);
      })
    }
  },
  // 下单
  ToPlaceOrder: function (e) {
    let self = this;
    let RZStatus = wx.getStorageSync('RZStatus');
    let loadStatus = wx.getStorageSync('loadStatus')
    if (loadStatus == 1) {
      if (RZStatus == 3) {
    let psnParam={
      avatar: self.data.psnData.avatar,
      name: self.data.psnData.user_nicename,
      psnId: self.data.psnData.uid,  
      skillData: self.data.skillData,
    }
    $.openWin({
      url: '../placeOrder/placeOrder',
      data: { 
        Type:'psnPage',
        psnParam: psnParam,
      }
    })
      } else {
        wx.showToast({
          title: '请先通过技能申请中的学生认证',
          icon: 'none',
        });
      }
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
      });
    }
  },
  // 进入聊天页面
  goToChat: function (e) {
    if (wx.getStorageSync('loadStatus') == 1) {
      let type = 1;
      let title = e.currentTarget.dataset.title;
      console.log(e.currentTarget.dataset.id);
      let targetId = 'alias_' + e.currentTarget.dataset.id;

      let url = '../conversation/chat?type={type}&targetId={targetId}&title={title}';
      url = utils.tplEngine(url, {
        type,
        targetId,
        title: title
      });
      console.log(url);
      wx.navigateTo({
        url: url,
      });
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
      })
    }
  },
  playMusic: function (e) {
    innerAudioContext.autoplay = true
    innerAudioContext.src = e.currentTarget.dataset.audio,
      console.log('播放事件')
    console.log(innerAudioContext);
    innerAudioContext.onPlay(() => {
      console.log('开始播放');
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  }

 
})