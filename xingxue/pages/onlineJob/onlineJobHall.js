// pages/onlineJob/onlineJobHall.js
let $ = require('../util/commit.js');
let page = 1,
  oldPage = 0;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    selectIndex: 0,
    typeData: [{
        id: '1',
        name: '分类'
      },
      {
        id: '2',
        name: '排序'
      }
    ],
    FLSelectIndex: 0,
    FLEndSelecVal: '',
    FLStatus: false,
    FLData: [{
      id: 0,
      name: '不限',
    }, {
        id: 1,
        name: '关注',
      }, {
        id: 2,
        name: '注册',
      }, {
        id: 3,
        name: '体验',
      }, {
        id: 4,
        name: '其它',
      },],
    PXSelectIndex: 0,
    PXStatus: false,
    PXEndSelecVal: '',
    PXData: [{
      id: 0,
      name: '佣金最高',
    }, {
        id: 1,
        name: '最新发布',
      }],
    JobData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.freshData();
  },
  freshData: function(e) {
    let self = this;
    console.log(self.data.FLEndSelecVal, self.data.PXEndSelecVal);
    $.POST({
      url: 'Wc/Task/task_list',
      data: {
        page: 1,
        condition: self.data.PXEndSelecVal,
        type: self.data.FLEndSelecVal,
      }
    }, function(e) {
     
      console.log(e);
      self.setData({
        JobData: e.data
      });
      page = 1;
      oldPage = 0;
      wx.stopPullDownRefresh();
    },function(e){
      wx.stopPullDownRefresh();
    })
  },
  upper: function(e) {
    this.freshData();
  },
  lower: function(e) {
    let self = this;
    console.log(page, oldPage);
    if (page - oldPage == 1) {
      page++;
      $.POST({
        url: 'Wc/Task/task_list',
        data: {
          page: page,
          condition: self.data.FLEndSelecVal,
          type: self.data.PXEndSelecVal,
        }
      }, function(e) {
        self.setData({
          JobData: self.data.JobData.concat(e.data)
        });
        oldPage++;
      })
    }

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
    this.freshData();
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
  // 点击其它关闭下拉
  CloseFLPX: function(e) {
    this.setData({
      FLStatus: false,
      PXStatus: false,
    })
  },
  // 选择type
  SelectType: function(e) {
    if (e.currentTarget.dataset.id == 0) {
      this.setData({
        FLStatus: !this.data.FLStatus,
        PXStatus: false,
        FLEndSelecVal: '',


      })
    } else if (e.currentTarget.dataset.id == 1) {
      this.setData({
        FLStatus: false,
        PXStatus: !this.data.PXStatus,

      })
    }
    this.setData({
      selectIndex: e.currentTarget.dataset.id,
      FLEndSelecVal: '',
      PXEndSelecVal: '',
    })

  },
  // 分类选择
  FLItemTab: function(e) {
    console.log(e.currentTarget.dataset.id,e.currentTarget.dataset.name)
    if (e.currentTarget.dataset.name == '不限'){
      this.setData({
        FLSelectIndex: e.currentTarget.dataset.id,
        FLStatus: false,
        PXStatus: false,
        FLEndSelecVal: '',
      })
    }else{
      this.setData({
        FLSelectIndex: e.currentTarget.dataset.id,
        FLStatus: false,
        PXStatus: false,
        FLEndSelecVal: e.currentTarget.dataset.name
      })
    }
    
  
    this.freshData();
  },
  // 排序选择
  PXItemTab: function(e) {
    this.setData({
      PXSelectIndex: e.currentTarget.dataset.id,
      FLStatus: false,
      PXStatus: false,
    })
    if (e.currentTarget.dataset.id == 0) {
      this.setData({
        PXEndSelecVal: 'price',
      })
    }
    if (e.currentTarget.dataset.id == 1) {
      this.setData({
        PXEndSelecVal: 'time',
      })
    }

    this.freshData();
  },
  // 进入任务详情
  ToOnlineJobDetail: function(e) {
    $.openWin({
      url: '../onlineJob/onlineJobDetail',
      data: {
        Type: 'JobHall',
        id: e.currentTarget.dataset.id
      }
    })
  }
})