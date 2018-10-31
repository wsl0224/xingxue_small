// pages/order/sendOrderDetail.js
let $=require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',

    title:'叫醒服务',
    sex:'全部',
    date:'选择日期',
    time:'选择时间',
    num:1,
    remark:'',
    PLArray: [],
 
    SexArray:['全部','男','女'],
    Midlatitude:'',
    Midlongitude:'',
    startDate:'',
    endDate:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let param=JSON.parse(options.data);
      let self=this;
      self.setData({
        id: param.id,
        title:param.name,  
        startDate:'2018-01-01',
        endDate:'9999-01-01'
      });
      self.getLocation();
      self.freshAllTwoSkill();
  },
  freshAllTwoSkill:function(e){
     let self=this;
     $.POST({
       url:'wcSCSL',
       data:{}
     },function(e){

      self.setData({
        PLArray:e.data,
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
  // 获取当前人地理位置
  getLocation: function (e) {
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
  // 数量运算
  reduceNum:function(e){
    if(this.data.num>1){
      this.data.num-=1;
      this.setData({
        num:this.data.num
      })
    }
   
  },
  addNum:function(e){
    this.data.num+=1;
    this.setData({
      num:this.data.num
    })
  },
// 品类选择
  bindPickerPLChange:function(e){
   
  this.setData({
    title: this.data.PLArray[e.detail.value].name,
    id: this.data.PLArray[e.detail.value].cid,
  })
},
// sex选择
  bindPickerSexChange:function(e){
    this.setData({
      sex: this.data.SexArray[e.detail.value]
    });
  },
    // 选择日期时间 
  bindPickerDateChange: function (e) {
  
    this.setData({
      date: e.detail.value
    });
  },

  bindPickerTimeChange: function (e) {
    console.log(e);
    this.setData({
      time: e.detail.value
    });
  },
  WTRemark:function(e){
    this.setDate({
      remark: e.detail.value
    })
  },
  // 发布
  ToOrderCenter:function(e){
    let self=this;
    let sexVal;
    let DateTime;
    DateTime = self.data.date + ' ' + self.data.time;

    if(self.data.sex=='全部'){
      sexVal=0;
    }
    if (self.data.sex == '男') {
      sexVal = 1;
    }
    if (self.data.sex == '女') {
      sexVal = 2;
    }
    if (self.data.date && self.data.time){
      $.POST({
        url: 'wcUserCO',
        data: {
          address_x: self.data.Midlongitude,
          address_y: self.data.Midlatitude,
          cate_id: self.data.id,
          num: self.data.num,
          begin_time: DateTime,
          sex: sexVal,
          remark: self.data.remark,
        }
      },function(e){
        $.openWin({
          url: '../orderCenter/orderCenter'
        })
      },function(e){
        console.log(e);
      })
    }else{
      wx.showToast({
        title: '请选择日期或时间',
      })
    }
 
  }

})