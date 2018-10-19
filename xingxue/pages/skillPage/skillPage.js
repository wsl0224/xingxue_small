// pages/skillPage/skillPage.js
let app = getApp();
let { Service } = app.globalData
let { Status, User } = Service;
let { stringFormat } = require('../util/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conversation:{
      type:0,
      targetId:'222',
    },
    
   skillData:{
     skillName:'叫醒服务',
     psnData:{
       name: '成都小甜甜',
       url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
       addr: '南京市',
       sex:1,
       age:20,
       guanzhu:1,
     },
     biaoqian:'甜美声音',
     num:1569,
     money:8,
     pingfen:5.0,
     content:'专业叫醒服务，声音甜美，欢迎',
     photoImg: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',  
     photo: [
       'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
       ],
       musicTime:'90'
   }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data=JSON.parse(options.param);
    console.log(data.id);
    
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
  // 跳转人员信息
  ToPsnPage:function(e){
    wx.navigateTo({
      url: '../psnPage/psnPage',
    })
  },
  // 进入聊天页面
  gotoChat: function (event) {
    User.getToken({
      id: this.data.conversation.targetId
    }).then((user) => {
      console.log(user);
      Status.connect(user).then(() => {
        let { currentTarget: { dataset: { item } } } = event;
        let { conversationType: type, targetId } = item;
        let url = '../conversation/chat?type={type}&targetId={targetId}';
        url = stringFormat(url, {
          type,
          targetId
        });
        wx.navigateTo({
          url: url,
        });
      }, (error) => {
        console.log('connect error', error);
      });
    });
   
  },

  
})