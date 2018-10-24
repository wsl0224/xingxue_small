// pages/skillPage/skillPage.js
var $ = require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    skillData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let param = JSON.parse(options.data);
    let self = this;
    $.POST({
        url: 'wcSkillSSD',
        data: {
          usid: param.id
        }
      }, function(e) {
        self.setData({
          skillData: e.data,
        });
      },
      function(e) {
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
    let skillParam={
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
        Type:'skillPage',
        skillParam: skillParam,
      }
    })
  },
  // 进入聊天页面
  goToChat: function(e) {
    let that = this;
    $.openWin({
      url:'../message/chat',
      data: {
        id: e.currentTarget.dataset.id,
        title: e.currentTarget.dataset.title
      }
    })
  },
  // 关注事件
  FollowerBtn:function(e){
 
    let that=this;
    if (e.currentTarget.dataset.status==1){
      $.POST({
        url: 'wcUserUFU',
        data: {
          uid: e.currentTarget.dataset.id
        }
      }, function (e) {
        wx.showToast({
          title: e.data.msg,
        });
        that.onLoad();
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
          title: e.data.msg,
        });
        that.onLoad();
      }, function (e) {
        console.log(e);
      })
    }  
  }


})