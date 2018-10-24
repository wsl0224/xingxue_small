// pages/psnPage/psnPage.js
let $ = require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    psnId:'',
    psnData: {},
    skillData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let param = JSON.parse(options.data);
    this.setData({
      psnId:param.id,
    })
    this.freshData();
  },
  // 刷新个人信息
  freshData:function(e){
    let self=this;
    $.POST({
      url: 'wcUserSUHP',
      data: {
        uid: self.data.psnId,
      }
    },
      function (e) {
        self.setData({
          psnData: e.data.user,
          skillData: e.data.skill
        })
      },
      function (e) {
        console.log(e);
      }
    )
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },
// 关注取关
  AtteBtn:function(e){
    if(e.currentTarget.dataset.status==1){
        //取关
        $.POST({
          url:'wcUserUFU',
          data:{
            fid:e.currentTarget.dataset.id,
          }
        },function(e){
          wx.showToast({
            title: '取关成功',
          });
        },function(e){
          console.log(e);
        })
    }else{
      //关注
      $.POST({
        url: 'wcUserUFU',
        data: {
          uid: e.currentTarget.dataset.psnId,
        }
      }, function (e) {
        wx.showToast({
          title: '关注成功',
        });
      }, function (e) {
        console.log(e);
      })
    }
  },
  // 下单
  ToPlaceOrder: function (e) {
    let self = this;
    let psnParam={
      avatar: self.data.psnData.avatar,
      name: self.data.psnData.user_nicename,
      psnId: self.data.psnData.uid,  
      skillData: self.data.skillData,
    }
    $.openWin({
      url: '../placeOrder/placeOrder',
      data: { 
        Type:'psnPage',
        psnParam: psnParam,
      }
    })
  },
  // 进入聊天页面
  goToChat: function (e) {
    let that = this;
    $.openWin({
      url: '../message/chat',
      data: {
        id: e.currentTarget.dataset.id,
        title: e.currentTarget.dataset.title
      }
    })
  },
 

 
})