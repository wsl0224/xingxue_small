// pages/twoSkillPage/twoSkillPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tar_Num:0,
    tarData: [
      '王者荣耀',
      '王者荣耀',
      '王者荣耀',
      '线上游戏',
      '王者荣耀',
      '线上游戏',
      '王者荣耀',
    ],
    psnData: [
      {
        id: '1',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        name: '成都小甜甜',
        sex: '1',
        age: '20',
        time: '22分钟前',
        num: 129,
        qianming: '爱到最美是陪伴',
        money: 8,
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
      let param=JSON.parse(options.data);
      wx.setNavigationBarTitle({
        title:param.title,
      });
   
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
  // 菜单点击事件
  tarFun: function (e) {
    console.log(e);
    this.setData({
      tar_Num: e.currentTarget.dataset.num
    })
  },
})