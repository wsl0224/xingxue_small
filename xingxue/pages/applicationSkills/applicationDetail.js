// pages/applicationSkills/applicationDetail.js
let $=require('../util/commit.js');
let config=require('../util/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTitle: true,
    content: "<p>1.信息无遮盖，内容清晰，证件照需包含学号</p>",
    Name:'',
    Number:'',
    Card_pic:'',
    Half_pic:'',
    School_name:'',
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
  // 关闭提示
  CloseTitle: function (e) {
    this.setData({
      showTitle: false,
    })
  },
  // 
  keyNameBtn:function(e){
    console.log(e);
     this.setData({
      Name:e.detail.value,
    })
  },
  keyNumberBtn:function(e){
    console.log(e);
    this.setData({
      Number:e.detail.value,
    })
  },
  keySchoolBtn:function(e){
    this.setData({
      School_name: e.detail.value,
    })
  },
  updataCard: function (e) {//上传Card_pic
  let self=this;
    let psnkey = wx.getStorageSync('psnkey');
    wx.chooseImage({
      count:1,
      success: function(res) {
      
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: config.Config.updateImgUrl,
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'key': psnkey
          },
          success(res){
            let pic=JSON.parse(res.data).data.pic;
          
            self.setData({
              Card_pic:pic,
            })
          }
        })
      },
    })

  },
  updataHalf: function (e) {//Half_pic
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
              Half_pic: pic,
            })
          }
        })
      },
    })


   
  },
  submitBtn:function(e){
    let self=this;
    if (!self.data.Name){
      wx.showToast({
        icon: 'none',
        title: '请填写姓名',
        duration: 2000
      })
    }
    if (!self.data.Number){
      wx.showToast({
        icon: 'none',
        title: '请填写学号',
        duration: 2000
      })
    }
    if (!self.data.School_name) {
      wx.showToast({
        icon: 'none',
        title: '请填写学校',
        duration: 2000
      })
    }
    if (!self.data.Card_pic) {
      wx.showToast({
        icon: 'none',
        title: '请上传学生证（个人信息）',
        duration: 2000
      })
    }
    if (!self.data.Half_pic) {
      wx.showToast({
        icon: 'none',
        title: '请上传手持学生证件照',
        duration: 2000
      })
    }
    if (self.data.Name && self.data.Number && self.data.Card_pic && self.data.Half_pic && self.data.School_name){
      $.POST({
        url: 'wcUserSA',
        data: {
          name: self.data.Name,
          number: self.data.Number,
          card_pic: self.data.Card_pic,
          half_pic: self.data.Half_pic,
          school_name: self.data.School_name,
        }
      }, function (e) {
        wx.showToast({
          icon: 'success',
          title: e.msg,
          duration: 2000
        });
        wx.navigateBack();
      })
    }
  
  },
  // formSubmit
  formSubmit: function (e) {
    console.log(e);
    $.POST({
      url: 'wcUserAFI',
      data: {
        formid: e.detail.formId,
      }
    }, function (e) { }, function (e) { })
  }
})