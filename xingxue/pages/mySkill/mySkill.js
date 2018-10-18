// pages/mySkill/mySkill.js
let $=require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mySkillData:[{
      id:'1',
      name:'叫醒服务',
    }, {
      id: '2',
      name: '王者服务',
      }, {
        id: '3',
        name: '叫醒服务',
      }, {
        id: '4',
        name: '叫醒服务',
      }
      ],
      noApplySkillData:[
        { 
          title:'天天向上',
          skillData:[{
            id: '2',
            name: '王者服务',
            status:1,
          }, {
              id: '3',
              name: '嘴角',
              status: 2,
              },{
              id: '4',
              name: '王者服务',
              status: 2,
              },{
              id: '5',
              name: '王者服务',
              status: 2,
              }]
        }, {
          title: '天天向上',
          skillData: [{
            id: '2',
            name: '王者服务',
            status: 1,
          }, {
            id: '3',
            name: '王者服务',
              status: 2,
          }, {
            id: '4',
            name: '王者服务',
              status: 1,
          }, {
            id: '5',
            name: '王者服务',
              status: 2,
          }]
        }
      ],
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
  // 跳转技能认证详情
  ToSkillCertification:function(e){
    console.log(e);
    if(e.currentTarget.dataset.status==1){
      $.openWin({
        url:'../skillCertification/skillCertification',

      })
    }else{
      wx.showToast({
        title: '当前技能在审核中',
      })
    }
  }
})