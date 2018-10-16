// pages/mine/mine.js
let $=require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    psnData:{
      url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      name:'成都小甜甜',
      guanzhuNum:100,
      fengsiNum:200,
      yuer:12.00,
      jingxing:0,
      
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  // 跳转个人资料
  ToPersonalData:function(e){
    wx.navigateTo({
      url: '../personalData/personalData',
    })
  },
  // 跳转关注或粉丝
  ToMyAttentionFans:function(e){
    console.log(e);
    
    if(e.currentTarget.dataset.type=='atte'){
      let data={
        id:'111',
        Type:'atte',
      };
      $.openWin({
        url:'../myAttentionFans/myAttentionFans',
        data:data,        
      })
    } else if (e.currentTarget.dataset.type == 'fans'){
      let data = {
        id: '111',
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
      data:{
        id:'111',
      }
    })
  }
})