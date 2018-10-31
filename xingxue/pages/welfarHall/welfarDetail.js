// pages/welfarHall/welfarDetail.js
let $=require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paramData:'',
    welfarData:{},
    title:'王者荣耀福利',
    content:"者荣耀福利王者荣耀福利王者荣耀福者荣耀福利王者荣耀福利王者荣耀福者荣耀福利王者荣耀福利王者荣耀福者荣耀福利王者荣耀福利王者荣耀福者荣耀福利王者荣耀福利王者荣耀福者荣耀福利王者荣耀福利王者荣耀福者荣耀福利王者荣耀福利王者荣耀福者荣耀福利王者荣耀福利王者荣耀福者荣耀福利王者荣耀福利王者荣耀福者荣耀福利王者荣耀福利王者荣耀福者荣耀福利王者荣耀福利王者荣耀福者荣耀福利王者荣耀福利王者荣耀福者荣耀福利王者荣耀福利王者荣耀福",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      paramData:JSON.parse(options.data),
    });
    this.freshData();
  },
  freshData:function(e){
    let self=this;
    $.POST({
      url:'wcOtherSWFD',
      data:{
        wid: self.data.paramData.id,
      }
    },function(e){
      console.log(e);
      e.data.content = e.data.content.replace(/\<img/gi, '<img style="width:100%;height:auto" ')
      self.setData({
        welfarData:e.data,
      })
    },function(e){})
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
  copyUrl:function(e){
    wx.setClipboardData({
      data: e.currentTarget.dataset.url,
      success(res) {
        wx.getClipboardData({
          success(res) {
            wx.showToast({
              title: '复制成功,请用浏览器访问',
              icon: 'none',
            })
          }
        })
      }
    }) 
  }
})