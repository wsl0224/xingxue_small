// pages/mySkill/mySkillSet.js
let $ = require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sName:'',
    sNameId:'',
    cId:'',
    price:'请选择价格',
    priceId:'',
    priceArr:[],
    unit:'请选择单位',
    unitId:'',
    unitArr: [],
    remark:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let param=JSON.parse(options.data);
    this.setData({
      sName:param.name,
      sNameId:param.id,
      cId: param.cid
    });
    this.freshPriceData();
    this.freshUnitData();
    this.freshData();
  },
  // 加载数据
  freshData:function(e){
    let self = this;
    $.POST({
      url: 'wcSkillSUSD',
      data: {
        sid: self.data.sNameId
      }
    }, function (e) {
      console.log(e);
      if(e.data){
        self.setData({
          price: e.data.price ? e.data.price :'请选择价格',
          priceId: e.data.price_id,
          unit: e.data.unit ? e.data.unit :'请选择单位',
          unitId: e.data.unit_id,
          remark: e.data.remark
        })
      }
     
    })
  },
  // 加载价格
  freshPriceData:function(e){
    let self=this;
    $.POST({
      url:'wcOtherSPL',
      data:{
        cid:self.data.cId,
      }
    },function(e){
      self.setData({
        priceArr:e.data
      })
    })
  },
  // 加载单位
  freshUnitData:function(e){
    let self = this;
    $.POST({
      url: 'wcOtherSU',
      data: {}
    }, function (e) {
      self.setData({
        unitArr: e.data
      })
    })
  },
  // 选择价格
  bindPickerPriceChange:function(e){
    this.setData({
      price: this.data.priceArr[e.detail.value].price,
      priceId: this.data.priceArr[e.detail.value].id,
    })
  },
  // 选择单位
  bindPickerUnitChange: function (e) {
    console.log(e);
    this.setData({
      unit: this.data.unitArr[e.detail.value].unit,
      unitId: this.data.unitArr[e.detail.value].id,
    })
  },
  // 更新备注
  bindKeyInput:function(e){
    this.setData({
      remark: e.detail.value,
    })
  },
  // 保存
  submit:function(e){
    let self=this;
    console.log(self.data.priceId, self.data.unitId);
    if (!self.data.priceId || self.data.priceId==0){
      wx.showToast({
        title: '请选择价格',
      })
    }
    if (!self.data.unitId || self.data.unitId == 0) {
      wx.showToast({
        title: '请选择单位',
      })
    }
    if (self.data.unitId && self.data.unitId != 0 && self.data.priceId && self.data.priceId!=0){
      $.POST({
        url: 'wcUserSSU',
        data: {
          sid: self.data.sNameId,
          price: self.data.priceId,
          unit: self.data.unitId,
          remark: self.data.remark,
        }
      },function(e){
        wx.navigateBack();
        wx.showToast({
          title: e.msg,
        });
        
      })
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

  }
})