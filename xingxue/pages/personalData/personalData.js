// pages/personalData/personalData.js
var $=require('../util/commit.js');
var config=require('../util/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar:'',
    image:[],
    picArr:[],
    user_nicename:'',
    birth:'',
    signature:'',
    startDate:'1900-01-01',
    endDate:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.freshData();
  },
  // 加载人员信息
  freshData:function(e){
    let self=this;
    $.POST({
      url:'wcUserSUD',
      data:{},
    },function(e){
      self.setData({
        avatar:e.data.avatar,
        image: e.data.image,
        picArr: e.data.image,
        user_nicename: e.data.user_nicename,
        birth: e.data.birth,
        signature: e.data.signature,
      })
    },
    function(e){
      console.log(e);
    })
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
  // 上传头像
  updataImage:function(e){
    let self = this;
    let psnkey = wx.getStorageSync('psnkey');
    wx.chooseImage({
      count: 1,
      success: function (res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: config.Config.updateImgUrl,
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'key': psnkey
          },
          success(res) {
            let pic = JSON.parse(res.data).data.pic;
            console.log(pic);
            self.setData({
              avatar: pic,
            });
          
            $.POST({
              url: 'wcUserSAVEUD',
              data: {
                avatar: pic
              }
            },function(e){
              wx.showToast({
                title: e.msg,
              })
            })  
          }
        })
      },
    })
  },
  // 上传形象照
  updataPhoto:function(e){
    let self = this;
    let psnkey = wx.getStorageSync('psnkey');
    wx.chooseImage({
      count: 1,
      success: function (res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: config.Config.updateImgUrl,
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'key': psnkey
          },
          success(res) {
            let pic = JSON.parse(res.data).data.pic;
            if (self.data.picArr.length>=3){
              self.data.picArr.pop();
            }
            self.data.picArr.unshift(pic); 
            self.setData({
              image:self.data.picArr,
            });
            $.POST({
              url: 'wcUserSAVEUD',
              data: {
                image: self.data.picArr
              }
            },function(e){

            })
          }
        })
      },
    })
  },
  // 修改日期
  bindPickerDateChange:function(e){
    this.setData({
      birth:e.detail.value,
    });
    let self=this;
    $.POST({
      url:'wcUserSAVEUD',
      data: { 
        birth: e.detail.value}
    },function(e){
      wx.showToast({
        title: e.msg,
      })
    })
  },
  // 昵称 
  keyNameSignatureBtn:function(e){
    this.setData({
      user_nicename: e.detail.value,
    });
    let self = this;
    $.POST({
      url: 'wcUserSAVEUD',
      data: {
        name: e.detail.value
      }
    }, function (e) {
      
    })
  },
  // 签名
  keySignatureBtn:function(e){
    this.setData({
      signature:e.detail.value,
    });
    let self = this;
    $.POST({
      url: 'wcUserSAVEUD',
      data: {
        signature: e.detail.value
      }
    },function(){
      
    })
  }
})