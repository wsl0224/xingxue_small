// pages/mine/mine.js
let $=require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingShow:false,
    psnStatus:2,
    psnData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(this.data.psnStatus!=1){
        // 未登录
       this.setData({
          psnData:{
            url: '../image/icon/icon94.png',
          name:'',
          guanzhuNum:0,
          fengsiNum:0,
          yuer:0,
          jingxing:0,  
          skillRZstatus: 0,
          }
       });
    }
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
  // 登录窗口
  ShowToLodPage:function(e){
    this.setData({
      loadingShow: true,
    })
  },
  CloseLoadPage:function(e){
    this.setData({
      loadingShow:false,
    })
  },
  // 登录事件
  ToLoded:function(e){
    let self=this;
    console.log('登录事件');
    wx.login({
      timeout:5000,
      success:function(e){
        console.log(e);
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        wx.getUserInfo({
          success:function(e){
            console.log(e);
            self.setData({
              psnStatus: 1,
              psnData: {
                url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                name: '成都小甜甜',
                guanzhuNum: 100,
                fengsiNum: 200,
                yuer: 12.00,
                jingxing: 0,
                skillRZstatus: 1,
              }
            })
          },
          fail:function(e){
            console.log(e);
          }
        })
       
        self.CloseLoadPage();
      }, 
      fail:function(e){
        wx.showToast({
          title: '失败',
          icon: 'error',
          duration: 2000
        })
      }

    });
  },
  
  // 跳转个人资料
  ToPersonalData:function(e){
    wx.navigateTo({
      url: '../personalData/personalData',
    })
  },
  // 跳转关注或粉丝
  ToMyAttentionFans:function(e){
    console.log(e);
    
    if(e.currentTarget.dataset.type=='atte'){
      let data={
        id:'111',
        Type:'atte',
      };
      $.openWin({
        url:'../myAttentionFans/myAttentionFans',
        data:data,        
      })
    } else if (e.currentTarget.dataset.type == 'fans'){
      let data = {
        id: '111',
        Type: 'fans',
      };
      $.openWin({
        url: '../myAttentionFans/myAttentionFans',
        data: data,
      })
    }
  },
  // 跳转足迹
  ToMyTracks:function(e){
    $.openWin({
      url:'../myTracks/myTracks',
      data:{
        id:'111',
      }
    })
  },
  // 跳转我的钱包
  ToMyWallet:function(e){
    $.openWin({
      url:'../myWallet/myWallet',
      data:{id:'111'},
    })
  },
  // 申请技能
  ToApplicationSkill:function(e){
    console.log(this.data.psnData.skillRZstatus)
    if (this.data.psnData.skillRZstatus!=1){
      $.openWin({
        url: '../applicationSkills/applicationSkills',
      })
    }else{
      $.openWin({
        url: '../mySkill/mySkill',
      })
    }
    
  },
  // 意见反馈
  ToFeedback:function(e){
    $.openWin({
      url:'../feedback/feedback',
    })
  },
  // 跳转订单中心
  ToOrderCenter:function(e){
    $.openWin({
      url:'../orderCenter/orderCenter'
    })
  },
  // 

})