// pages/home/home.js
var config = require('../util/config.js');
let $=require('../util/commit.js');
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
      id:1,
      url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      name: '极速下单',
    }, {
        id: 2,
      url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      name: '线上兼职',
    }, {
        id: 3,
      url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      name: '拼团'
    }, {
        id: 4,
      url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      name: '福利大厅',
    }],
    typeData: [
      [
        [{
          url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          name: '叫醒服务',
        }, {
            url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          name: '陪跑',
        }, {
            url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          name: '跑腿',
        }, {
            url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          name: '陪练服务',
        }],
        [{
          url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          name: '钢琴服务',
        }, {
            url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          name: '钢琴服务',
        }, {
            url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          name: '钢琴服务',
        },{
          id:'allType',
          url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          name:'全部技能'
        }]
      ],
      [[{
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          name: '叫醒服务',
        },
        {
          url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          name: '叫醒服务',
        }, {
            url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          name: '叫醒服务',
        }, {
            url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          name: '叫醒服务',
        }], [{
            url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          name: '叫醒服务',
        },
        {
          url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          name: '叫醒服务',
        }, {
            url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          name: '叫醒服务',
          }, {
            url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            name: '叫醒服务',
          }]
      ]
    ],
    typeData_indicatorDots: true,
    typeData_autoplay: false,
    typeData_interval: 5000,
    typeData_duration: 1000,
    skillData:[{
      title:'天天向上',
      psnData:[{
        title: '叫醒服务',
        url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        idstatus: 1,
        stustatus: 1,
        money: 8,
        pinfen: 5.0,
      }, {
          title: '叫醒服务',
          url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          idstatus: 1,
          stustatus: 1,
          money: 8,
          pinfen: 5.0,
        }, {
          title: '叫醒服务',
          url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          idstatus: 1,
          stustatus: 1,
          money: 8,
          pinfen: 5.0,
        }],
    }, {
        title: '天天向上',
        psnData: [{
          title: '叫醒服务',
          url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          idstatus: 1,
          stustatus: 1,
          money: 8,
          pinfen: 5.0,
        }, {
            title: '叫醒服务',
            url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            idstatus: 1,
            stustatus: 1,
            money: 8,
            pinfen: 5.0,
          }, {
            title: '叫醒服务',
            url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            idstatus: 1,
            stustatus: 1,
            money: 8,
            pinfen: 5.0,
          }],
      }],
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showToast({
      
    })
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

  } ,

  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  ToSkillPage:function(e){
    
    if(e.currentTarget.dataset.type=='allType'){
      wx.navigateTo({
        url: '../allType/allType',
      })
    }else{
      let param = {
        name: e.currentTarget.dataset.name
      };
      console.log(e.currentTarget.dataset);
      let data = JSON.stringify(param);
      wx.navigateTo({
        url: '../skillList/skillList?param='+data,
      })
    }
  },
  // 跳转极速下单
  ToLevePage:function(e){
 
    if (e.currentTarget.id == 1){
      wx.navigateTo({
       url: '../order/sendOrder',
      }) 
    } else if (e.currentTarget.id == 2){

    } else if (e.currentTarget.id == 3){

    }else {
      wx.navigateTo({
        url: '../welfarHall/welfarHall',
      }) 
    }
   
  },
  // 跳转技能资质
  ToSkillPsnPage:function(e){
    let data={
      id:e.currentTarget.dataset.id
    };
    data=JSON.stringify(data);
    wx.navigateTo({
      url: '../skillPage/skillPage?param='+data,
    })
  },
  // 更多 
  ToTowSkillPage:function(e){
    $.openWin({
      url:'../twoSkillPage/twoSkillPage',
      data:{
        id:e.currentTarget.dataset.id,
        title:e.currentTarget.dataset.title,
      }
    })
  }
})