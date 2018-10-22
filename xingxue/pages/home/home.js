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
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    bannerData: [{
      id: 1,
      url: '../image/icon/icon01.png',
      name: '极速下单',
    }, {
      id: 2,
      url: '../image/icon/icon02.png',
      name: '线上兼职',
    }, {
      id: 3,
      url: '../image/icon/icon03.png',
      name: '拼团'
    }, {
      id: 4,
      url: '../image/icon/icon04.png',
      name: '福利大厅',
    }],
    SkillArrAA: [],
    SkillArrAB: [],
    SkillArrBA: [],
    SkillArrBB: [],
    typeData: [],
    typeData1: [
      [
        [{
          url: '../image/icon/icon05.png',
          name: '叫醒服务',
        }, {
          url: '../image/icon/icon06.png',
          name: '陪跑',
        }, {
          url: '../image/icon/icon07.png',
          name: '跑腿',
        }, {
          url: '../image/icon/icon08.png',
          name: '陪练服务',
        }],
        [{
          url: '../image/icon/icon09.png',
          name: '钢琴服务',
        }, {
          url: '../image/icon/icon10.png',
          name: '钢琴服务',
        }, {
          url: '../image/icon/icon11.png',
          name: '钢琴服务',
        }, {
          id: 'allType',
          url: '../image/icon/icon12.png',
          name: '全部技能'
        }]
      ],
      [
        [{
            url: '../image/icon/icon08.png',
            name: '叫醒服务',
          },
          {
            url: '../image/icon/icon08.png',
            name: '叫醒服务',
          }, {
            url: '../image/icon/icon08.png',
            name: '叫醒服务',
          }, {
            url: '../image/icon/icon08.png',
            name: '叫醒服务',
          }
        ],
        [{
            url: '../image/icon/icon08.png',
            name: '叫醒服务',
          },
          {
            url: '../image/icon/icon08.png',
            name: '叫醒服务',
          }, {
            url: '../image/icon/icon08.png',
            name: '叫醒服务',
          }, {
            url: '../image/icon/icon08.png',
            name: '叫醒服务',
          }
        ]
      ]
    ],
    typeData_indicatorDots: true,
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
    self.freshTData(); // 过滤二级数据
    self.freshBanner(); //  过滤banner
    self.freshTSData(); //过滤推荐二级技能

  },
  // 过滤二级数据
  freshTData: function(e) {
    let self = this;
    $.GET({
      url: 'wcIndexRCC',
    }, function(e) {
      self.setData({
        skillData: e.data,
      })
    }, function(e) {

    });

  },
  // 过滤推荐二级技能
  freshTSData: function(e) {
    let self = this;
    $.GET({
      url: 'wcIndexRCCL',
    }, function(e) {
      console.log('过滤推荐二级技能');
      console.log(e.data);
      let SkillArrA = [];
      let SkillArrB = [];
      let typeData = [];
      if (e.data.length < 7) {
        for (var i = 0; i < e.data.length; i++) {
          SkillArrA.push(e.data[i]);
        }
        SkillArrA.push({
          id: 'allType',
          pic: '../image/icon/icon12.png',
          name: '全部技能'
        });
        typeData.push(SkillArrA);
      }
      if (e.data.length > 6) {
        for (var i = 0; i < 7; i++) {
          SkillArrA.push(e.data[i]);
        }
        SkillArrA.push({
          id: 'allType',
          pic: '../image/icon/icon12.png',
          name: '全部技能'
        });
        typeData.push(SkillArrA);
        for (var n = 7; n < e.data.length; n++) {
          SkillArrB.push(e.data[n]);
        }
        typeData.push(SkillArrB);
      }
   
      
     
      self.setData({
        typeData: typeData,
      })
    }, function(e) {

    });

  },
  // 过滤banner
  freshBanner: function(e) {
    let self = this;
    $.POST({
      url: 'wcOtherSB',
      data: {
        type: 1,
      }
    }, function(e) {
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

  upper: function(e) {
    console.log(e)
  },
  lower: function(e) {
    console.log(e)
  },
  scroll: function(e) {
    console.log(e)
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


})