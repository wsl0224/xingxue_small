// pages/skillList/skillList.js
let $=require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    psnData:[
      {
        id:'1',
        url:'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        name:'成都小甜甜',
        sex:'1',
        age:'20',
        time:'22分钟前',
        num:129,
        qianming:'爱到最美是陪伴',
        money:8,
      }, {
        id: '2',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        name: '成都小甜甜',
        sex: '2',
        age: '20',
        time: '22分钟前',
        num: 129,
        qianming: '爱到最美是陪伴',
        money: 8,
      }, {
        id: '3',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        name: '成都小甜甜',
        sex: '1',
        age: '20',
        time: '22分钟前',
        num: 129,
        qianming: '爱到最美是陪伴',
        money: 8,
      }, {
        id: '3',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        name: '成都小甜甜',
        sex: '1',
        age: '20',
        time: '22分钟前',
        num: 129,
        qianming: '爱到最美是陪伴',
        money: 8,
      }, {
        id: '3',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        name: '成都小甜甜',
        sex: '1',
        age: '20',
        time: '22分钟前',
        num: 129,
        qianming: '爱到最美是陪伴',
        money: 8,
      }, {
        id: '3',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        name: '成都小甜甜',
        sex: '1',
        age: '20',
        time: '22分钟前',
        num: 129,
        qianming: '爱到最美是陪伴',
        money: 8,
      }, {
        id: '3',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        name: '成都小甜甜',
        sex: '1',
        age: '20',
        time: '22分钟前',
        num: 129,
        qianming: '爱到最美是陪伴',
        money: 8,
      }, {
        id: '3',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        name: '成都小甜甜',
        sex: '1',
        age: '20',
        time: '22分钟前',
        num: 129,
        qianming: '爱到最美是陪伴',
        money: 8,
      },
      ]
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
    self.freshData(data);

  },
  freshData:function(e){
    let self=this;
    $.POST(
      {
        url: 'wcSkillSSL',
        data: {
          cate_id: e.id,
          page:1,
        }
      },function(e){
        self.setData({
          psnData:e.data,
        })
      },
      function(e){
        console.log(e);
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