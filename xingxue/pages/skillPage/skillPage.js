// pages/skillPage/skillPage.js
var $ = require('../util/commit.js');
const utils = require('../utils/utils');
const { globalData } = getApp();
const { Service: { Status, Conversation } } = globalData;
const innerAudioContext = wx.createInnerAudioContext();
const watchConversation = (context) => {
  Conversation.watch((conversationList) => {
    context.setData({
      conversationList
    });
  });
};
const watchStatus = () => {
  Status.watch((status) => {
    if (status == 3) {
      let user = wx.getStorageSync('userInfo');
      if (user) {
        Status.connect(user.userInfo);
      } else { 
      }
    }
  })
}
const connect = (context) => {
  watchConversation(context);
  watchStatus();
  let userId = wx.getStorageSync('userId');
  let user = wx.getStorageSync('userInfo');
  $.POST({
    url: 'wcUserSRYT',
    data: {
      uid: userId,
    }
  }, function (e) {
    console.log('登录聊天');
    console.log(e);
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
    console.log('登录userInfo聊天');
    console.log(user);
    Status.connect(user.userInfo).then(() => {
      console.log('connect successfully');
    }, (error) => {
      wx.showToast({
        title: error.msg,
        icon: 'none',
        duration: 3000
      })
    })
  }, function (e) {
    console.log(e);
  })

};
Page({
  /**
   * 页面的初始数据
   */
  data: {
    paramData:'',
    skillData: {},
    hasUserAuth: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let param = JSON.parse(options.data);
    this.setData({
      paramData:param,
    });
    this.freshData();
   
    if (wx.getStorageSync('loadStatus')==1){
      connect(this);
    }
    
  },
  
  freshData:function(e){
    let self = this;
    $.POST({
      url: 'wcSkillSSD',
      data: {
        usid: self.data.paramData.id
      }
    }, function (e) {
      self.setData({
        skillData: e.data,
      });
    },function (e) {
        console.log(e);
      });
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
    if (wx.getStorageSync('loadStatus')==1) {
      connect(this);
    }
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
  // 跳转人员信息
  ToPsnPage: function(e) {
    $.openWin({
      url: '../psnPage/psnPage',
      data: {
        id: e.currentTarget.dataset.id,
      }
    })
  },
  // 下单
  ToPlaceOrder: function(e) {
    let self=this;
    let RZStatus = wx.getStorageSync('RZStatus');
    let loadStatus = wx.getStorageSync('loadStatus');
    console.log(loadStatus);
    if (loadStatus == 1) {
      if (RZStatus == 3) {
        let skillParam = {
          sId: self.data.skillData.usid,
          sName: self.data.skillData.name,
          sMoney: self.data.skillData.price,
          avatar: self.data.skillData.avatar,
          name: self.data.skillData.user_nicename,
          psnId: self.data.skillData.uid,
        };
        $.openWin({
          url: '../placeOrder/placeOrder',
          data: {
            Type: 'skillPage',
            skillParam: skillParam,
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
  goToChat: function(event) {
    if (wx.getStorageSync('loadStatus')==1) {
      let type = 1;
      let title = event.currentTarget.dataset.title;
      console.log(event.currentTarget.dataset.id);
      let targetId = 'alias_' + event.currentTarget.dataset.id;

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
    }else{
      wx.showToast({
        title: '请先登录',
        icon: 'none',
      })
    }
  },
  // 关注事件
  FollowerBtn:function(e){
 
    let that=this;
    if (e.currentTarget.dataset.status==1){
      $.POST({
        url: 'wcUserUFU',
        data: {
          fid: that.data.skillData.fid,
        }
      }, function (e) {
        wx.showToast({
          title: e.msg,
        });
        that.freshData();
      }, function (e) {
        console.log(e);
      })
    }else{
      $.POST({
        url: 'wcUserAFU',
        data: {
          uid: e.currentTarget.dataset.id,
        }
      }, function (e) {
        wx.showToast({
          title: e.msg,
        });
        that.freshData();
      }, function (e) {
        console.log(e);
      })
    }  
  },
  playMusic:function(e){
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