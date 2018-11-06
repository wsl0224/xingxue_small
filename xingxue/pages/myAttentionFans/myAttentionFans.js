// pages/myAttentionFans/myAttentionFans.js
let $=require('../util/commit.js');
let pageNum=1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    atteStatus:true,
    fansStatus:false,
    title:'',
    psnData: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let param = JSON.parse(options.data);
    if (param.Type=='atte'){
     this.showAttentionData();
    } else if (param.Type == 'fans'){
      this.showFansData()
    } 
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
    if (this.data.atteStatus) {
      this.freshAttentionData();
    } else {
      this.freshFansData();
    }
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
  // 选择tab
  ChooseTab:function(e){
    console.log(e);
    if(e.currentTarget.dataset.id=='left'){
      this.showAttentionData();
    } else if (e.currentTarget.dataset.id == 'right'){
      this.showFansData();
    }
   
  },
  // 显示关注数据
  showAttentionData:function(e){
    this.setData({
      atteStatus: true,
      fansStatus: false,
    });
    wx.setNavigationBarTitle({
      title: '我的关注'
    });
    this.freshAttentionData();
  },
  // 刷新关注数据
  freshAttentionData:function(e){
    let self=this;   
    $.POST({
      url:'wcUserSUFollow',
      data:{
        page:1,
      }
    },function(e){
      pageNum=1;
      self.setData({
        psnData:e.data,
      })
    },function(e){

    });
    wx.stopPullDownRefresh();
  },
  freshMoreAtteData:function(e){
    let self = this;
    pageNum ++;
    $.POST({
      url: 'wcUserSUFollow',
      data: {
        page: pageNum,
      }
    }, function (e) {
    
      self.setData({
        psnData: e.data.psnData.concat(e.data),
      })
    }, function (e) {
      console.log(e);
    });
  },
  // 显示粉丝数据
  showFansData:function(e){
    this.setData({
      atteStatus: false,
      fansStatus: true,
    });
    wx.setNavigationBarTitle({
      title: '我的粉丝'
    });
    this.freshFansData();
  },
  // 刷新粉丝
  freshFansData: function (e) {
    let self = this;
    $.POST({
      url: 'wcUserSUFans',
      data: {
        page: 1,
      }
    }, function (e) {
      pageNum = 1;
      self.setData({
        psnData: e.data,
      })
    }, function (e) {

    });
    wx.stopPullDownRefresh();
  },
  freshMoreFansData: function (e) {
    let self = this;
    pageNum++;
    $.POST({
      url: 'wcUserSUFans',
      data: {
        page: pageNum,
      }
    }, function (e) {

      self.setData({
        psnData: e.data.psnData.concat(e.data),
      })
    }, function (e) {
      console.log(e);
    });
  },
// 下拉upper
  upper:function(e){
    if (this.data.atteStatus){
      this.freshAttentionData();
    }else{
      this.freshFansData();
    }
  },
  lower:function(e){
    if (this.data.atteStatus) {
      this.freshMoreAtteData();
    } else {
      this.freshMoreFansData();
    }
  },
  // 跳转个人主页
  ToPsnPage:function(e){
   
    $.openWin({
      url:'../psnPage/psnPage',
      data:{
        id: e.currentTarget.dataset.psnid
      }
    })
  },

})