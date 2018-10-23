// pages/order/sendOrder.js
let $ = require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    OneTar_Num: 0,
    TwoTar_Num: 0,
    OneLeverData: [],
    TwoLeverData: [],
    TwoLeverId: '',
    TwoLeverName:'',
    Midlatitude: '',
    Midlongitude: '',
    markers: [{
      iconPath: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50,
      borderRadius: 25,
    }],
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.freshData();
    this.getLocation();
  },
  // 获取当前人地理位置
  getLocation: function(e) {
    let self = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        self.setData({
          Midlatitude: res.latitude,
          Midlongitude: res.longitude,
        })
      }
    })
  },
  freshData: function(e) {
    let self = this;
    self.setData({
      OneTar_Num: 0,
      TwoTar_Num: 0,
    });
    $.GET({
      url: 'wcOtherC',
    }, function(OneLeverData) {
      self.setData({
        OneLeverData: OneLeverData.data,
        TwoLeverData: OneLeverData.data[0].child,
        TwoLeverId: OneLeverData.data[0].child[0].cid,
        TwoLeverName: OneLeverData.data[0].child[0].name,
      });
      // 过滤中心位置周围markers
      self.freshMarker(self.data.TwoLeverData[0].cid);
    }, function(e) {
      console.log(e);
    });
  },
  // 加载Marker
  freshMarker: function(TwoId) {
    let self = this;
    let coordinates = self.data.Midlongitude + ',' + self.data.Midlatitude;
    $.POST({
      url: 'wcSkillSMUS',
      data: {
        coordinates: coordinates,
        cid: TwoId,
        proportion: 20,
      }
    }, function(e) {
      self.setData({
        markers: e.data
      })
    }, function(e) {
      console.log(e);
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

  },
  // 一级选择
  OneTarFun: function(e) {
    console.log(e);
    let self =this;
    $.POST({
      url: 'wcOtherC',
      data: {
        cid: e.currentTarget.dataset.id
      }
    }, function(param){
      
      console.log(self.data.OneLeverData);
      console.log(param);
      self.setData({
        OneTar_Num: e.currentTarget.dataset.num,
        TwoLeverData:param.data[0].child,
        TwoTar_Num: 0,   
        TwoLeverId: param.data[0].cid,   
        TwoLeverName: param.data[0].name,  
      });
      self.freshMarker(self.data.TwoLeverData[0].cid);
    })
  },
  // 二级选择
  TwoTarFun: function(e) {
    console.log(e);
    this.setData({
      TwoTar_Num: e.currentTarget.dataset.num,
      TwoLeverId: e.currentTarget.dataset.id,
      TwoLeverName: e.currentTarget.dataset.name,
    })
    this.freshMarker(e.currentTarget.dataset.id);
  },
  // 进入下单详细
  ToDetail: function(e) {
    $.openWin({
      url: './sendOrderDetail',
      data:{
        id:e.currentTarget.dataset.id,
        name: e.currentTarget.dataset.name,
      }
    });
  },
  // 移动地图
  regionchange:function(e){
    console.log(e);
    console.log(e.type)
  } 

})