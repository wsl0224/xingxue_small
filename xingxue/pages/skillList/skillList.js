// pages/skillList/skillList.js
let $=require('../util/commit.js');
let page=1;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    psnData:[],
    OneId:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let data=JSON.parse(options.data);
    let self=this;
    wx.setNavigationBarTitle({
      title: data.title
    });
    self.setData({
      OneId: data.id,
    })
    
    self.freshData();
 
  },
  freshData:function(e){

    let self=this;
    $.POST(
      {
        url: 'wcSkillSSL',
        data: {
          cate_id:self.data.OneId,
          page:1,
        }
      },function(e){
        self.setData({
          psnData:e.data,
        });
        page=1;
        wx.stopPullDownRefresh();
      },
      function(e){
        console.log(e);
        wx.stopPullDownRefresh();
      }
    )

  },
  upper:function(e){
    this.freshData();
  },
  lower:function(e){
    let self = this;
    page++;
    $.POST(
      {
        url: 'wcSkillSSL',
        data: {
          cate_id: self.data.OneId,
          page: page,
        }
      }, function (e) {
        self.setData({
          psnData: self.data.psnData.concat(e.data),
        });
        wx.stopPullDownRefresh();
      },
      function (e) {
        console.log(e);
        wx.stopPullDownRefresh();
      }
    )
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
    wx.startPullDownRefresh();
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
    this.lower();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 跳转技能页
  ToSkillPage:function(e){
    $.openWin({
      url:'../skillPage/skillPage',
      data:{
        id:e.currentTarget.dataset.id,
      }
    })
  }
})