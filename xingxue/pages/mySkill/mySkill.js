// pages/mySkill/mySkill.js
let $=require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mySkillData:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.freshData();
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
    this.freshData();
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
    this.freshData();
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
  // 设置技能 
  ToMySkillSet:function(e){
    $.openWin({
      url: '../mySkill/mySkillSet',
      data:{
        id: e.currentTarget.dataset.id,
        name:e.currentTarget.dataset.name,
        cid: e.currentTarget.dataset.cid,
      }
    })
  },
  // 跳转技能认证详情
  ToSkillCertification:function(e){
    if (e.currentTarget.dataset.status == 0 || e.currentTarget.dataset.status == 1|| e.currentTarget.dataset.status == 4){
      $.openWin({
        url:'../skillCertification/skillCertification',
        data: {
          id: e.currentTarget.dataset.id,
          name: e.currentTarget.dataset.name,
        }
      })
    }else {
      wx.showToast({
        title: '当前技能在审核中',
      })
    }
  },
  // 刷新
  freshData:function(e){
 
    let self=this;
    $.POST({
      url:'wcUserSUS',
      data:{},
    },function(e){
      console.log(e);
      self.setData({
        mySkillData:e.data,
      });
      wx.stopPullDownRefresh();
    },function(e){
      wx.stopPullDownRefresh();
    })
  }
})