// pages/home/home.js
var config = require('../util/config.js');
let $ = require('../util/commit.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    config: config,
    toView: 'red',
    scrollTop: 100,
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    bannerData: [{
      id: 1,
      url: 'https://app.xingxue.vip/icon/icon01.png',
      name: '极速下单',
    }, {
      id: 2,
      url: 'https://app.xingxue.vip/icon/icon02.png',
      name: '线上兼职',
    }, {
      id: 3,
      url: 'https://app.xingxue.vip/icon/icon03.png',
      name: '拼团'
    }, {
      id: 4,
      url: 'https://app.xingxue.vip/icon/icon04.png',
      name: '福利大厅',
    }],
    SkillArrAA: [],
    SkillArrAB: [],
    SkillArrBA: [],
    SkillArrBB: [],
    typeData: [],
    typeData1: [],
    typeData_indicatorDots: false,
    typeData_autoplay: false,
    typeData_interval: 5000,
    typeData_duration: 1000,
    skillData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    let self = this;
    let loadStatus = wx.getStorageSync('loadStatus');
    console.log(loadStatus);
    if (loadStatus==1){
      self.freshTData(); // 过滤二级数据
      self.freshBanner(); //  过滤banner
      self.freshTSData(); //过滤推荐二级技能
    }else{
      wx.reLaunch({
        url: '../startPage/startPage'
      })
    }
  
 
  },
  // 过滤二级数据
  freshTData: function(e) {
    let self = this;
    $.POST({
      url: 'wcIndexRCC',
      data:{}
    }, function(e) {
      self.setData({
        skillData: e.data,
      })
      console.log('1');
      wx.stopPullDownRefresh();
    }, function(e) {

    });
  
  },
  // 过滤推荐二级技能
  freshTSData: function(e) {
    let self = this;
    $.POST({
      url: 'wcIndexRCCL',
      data:{}
    }, function(e) {
      let SkillArrA = [];
      let SkillArrB = [];
      let typeData = [];

      if (e.data.length <= 7) {
        for (var i = 0; i < e.data.length; i++) {
          SkillArrA.push(e.data[i]);
        }
        SkillArrA.push({
          id: 'allType',
          pic: 'https://app.xingxue.vip/icon/icon12.png',
          name: '全部技能'
        });
        typeData.push(SkillArrA);
      }
      if (e.data.length >7) {
        for (var i = 0; i < 7; i++) {
          SkillArrA.push(e.data[i]);
        }
        SkillArrA.push({
          id: 'allType',
          pic: 'https://app.xingxue.vip/icon/icon12.png',
          name: '全部技能'
        });
        typeData.push(SkillArrA);
        for (var n = 7; n < e.data.length; n++) {
          SkillArrB.push(e.data[n]);
        }
        typeData.push(SkillArrB);
      }
   
      console.log(typeData);
     
      self.setData({
        typeData: typeData,
      })
    }, function(e) {

    });

  },
  // 过滤banner
  freshBanner: function(e) {
    console.log('过滤banner');
    let self = this;
    $.POST({
      url: 'wcOtherSB',
      data: {
        type: 1,
      }
    }, function(e) {
     
      console.log(e);
      self.setData({
        imgUrls: e.data,
      })
    }, function(e) {

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
  onPullDownRefresh: function () {
    let self = this;
    self.freshTData(); // 过滤二级数据
    self.freshBanner(); //  过滤banner
    self.freshTSData(); //过滤推荐二级技能
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
  // 
  ToSkillPage: function(e) {

    if (e.currentTarget.dataset.type == 'allType') {
      $.openWin({
        url: '../allType/allType',
      })
    } else {
      $.openWin({
        url: '../skillList/skillList',
        data: {
          id: e.currentTarget.dataset.id,
          title: e.currentTarget.dataset.name,
        }
      })
    }
  },
  // 跳转极速下单
  ToLevePage: function(e) {

    if (e.currentTarget.id == 1) {
      $.openWin({
        url: '../order/sendOrder',
      })
    } else if (e.currentTarget.id == 2) {
      $.openWin({
        url: '../onlineJob/onlineJobHall'
      })
    } else if (e.currentTarget.id == 3) {
      $.openWin({
        url: '../noData/noData',
        data:{
          // url:'https://xzwages.libokeji.cn/index.html',
        }
      })
    } else {
      $.openWin({
        url: '../welfarHall/welfarHall',
      })
    }

  },
  // 跳转技能资质
  ToSkillPsnPage: function(e) {

    $.openWin({
      url: '../skillPage/skillPage',
      data: {
        id: e.currentTarget.dataset.id

      }
    })

  },
//  banner事件跳转
  ToBanner:function(e){
 
    $.openWin(e.currentTarget.dataset.param);
  }


})