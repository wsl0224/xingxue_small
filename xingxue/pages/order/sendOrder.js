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
    Mlatitude: '',
    Mlongitude: '',
    markers: [],
   
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
          Mlatitude: res.latitude,
          Mlongitude: res.longitude,
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
    let coordinates = self.data.Mlongitude + ',' + self.data.Mlatitude;
    $.POST({
      url: 'wcSkillSMUS',
      data: {
        coordinates: coordinates,
        cid: TwoId,
        proportion: 20,
      }
    }, function(e) {
      console.log(e.data);
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
    this.Map = wx.createMapContext('map')
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
    let RZStatus = wx.getStorageSync('RZStatus');
    let loadStatus = wx.getStorageSync('loadStatus');
    if (loadStatus == 1 ){
      if (RZStatus == 3) {
        $.openWin({
          url: './sendOrderDetail',
          data: {
            id: e.currentTarget.dataset.id,
            name: e.currentTarget.dataset.name,
          }
        });
      } else {
        wx.showToast({
          title: '请先通过技能申请中的学生认证',
          icon: 'none',
        });
      }
    }else{
      wx.showToast({
        title: '请先登录',
        icon: 'none',
      });
    }
    
  },
  // 移动地图
  regionchange:function(e){
    let self=this;
    self.Map.getCenterLocation({
      success: function (res) {
        self.setData({
          Mlatitude: res.latitude,
          Mlongitude: res.longitude,
        })
        self.freshMarker(self.data.TwoLeverId);
      }
    })
  } 

})