// pages/placeOrder/placeOrder.js
let $=require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Type:'',
    sId:'',
    psnId:'',
    avatar:'',
    name:'',
    title:'选择技能',
    sexNeed:'全部',
    date:"选择日期",
    time:'选择时间',
    num:1,
    remark:'',
    money:'',
    PLArray: ['叫醒服务', '叫醒服务', '叫醒服务', '叫醒服务'],
    SexArray:['全部','男','女'],
    sexVal:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self=this;
    let param = JSON.parse(options.data);
    console.log(param);
    if(param.Type=='psnPage'){
      this.setData({
        Type: param.Type,
        psnId: param.psnParam.psnId,
        name: param.psnParam.name,
        avatar: param.psnParam.avatar,
      });
      self.freshPsnSkill();
    }else if(param.Type=='skillPage'){
      this.setData({
        Type: param.Type,
        sId: param.skillParam.sId,
        title: param.skillParam.sName,
        money: param.skillParam.sMoney,
        psnId: param.skillParam.psnId,
        name: param.skillParam.name,
        avatar: param.skillParam.avatar,
      })
    }
   
  },
// 刷新当前人技能
freshPsnSkill:function(e){
  let self=this;
  $.POST({
    url:'wcSkillSSS',
    data:{
      uid: self.data.psnId,
    }
  },function(e){
    console.log(e);
    self.setData({
      PLArray:e.data,
    })
  },function(e){
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
  // 数量运算
  reduceNum: function (e) {
    if (this.data.num > 1) {
      this.data.num -= 1;
      this.setData({
        num: this.data.num,
        allMoney: this.data.num * this.data.money
      })
    }

  },
  addNum: function (e) {
    this.data.num += 1;
    this.setData({
      num: this.data.num,
      allMoney: parse(this.data.num * this.data.money)
    })
  },
  // 品类选择
  bindPickerTitleChange: function (e) {
    console.log(e);
    let param = this.data.PLArray[e.detail.value];
    this.setData({
      sId: param.us_sid,
      title: param.cname,
      money: param.price,
    })
  },
  // sex选择
  bindPickerSexChange: function (e) {
    this.setData({
      sex: this.data.SexArray[e.detail.value],
      sexVal:e.detail.value,
    })
  },
  // 选择时间 
  bindPickerDateChange:function(e){
    this.setData({
      date: e.detail.value
    })
  },
  bindPickerTimeChange:function(e){
    this.setData({
      time: e.detail.value
    })
  },
  // 备注
  bindKeyInput:function(e){
    this.setData({
      remark: e.detail.value
    })
  },
  // 提交
  submit:function(e){
    let self=this;
    if (self.data.Type =='psnPage'){
      if (self.data.sId){
        if (self.data.date != '选择日期' && self.data.time != '选择时间') {
          $.POST({
            url: 'wcOrderCO',
            data: {
              uid: self.data.psnId,
              usid: self.data.sId,
              num: self.data.num,
              remark: self.data.remark,
              begin_time: self.data.date + ' ' + self.data.time,
            }
          }, function (e) {
            $.openWin({
              url: '../orderCenter/orderCenter',
            })
          }, function (e) {
            console.log(e);
          })
        } else {
          wx.showToast({
            title: '请选择日期和时间',
          })
        }
      }else{
        wx.showToast({
          title: '请选择品类',
        })
      }
    }else{
      if (self.data.date != '选择日期' && self.data.time != '选择时间') {
        $.POST({
          url: 'wcOrderCO',
          data: {
            uid: self.data.psnId,
            usid: self.data.sId,
            num: self.data.num,
            remark: self.data.remark,
            begin_time: self.data.date + ' ' + self.data.time,
          }
        }, function (e) {
          $.openWin({
            url: '../orderCenter/orderCenter',
          })
        }, function (e) {
          console.log(e);
        })
      } else {
        wx.showToast({
          title: '请选择日期和时间',
        })
      }
    }
    
  },
  // 提交
  submitBtn:function(){
    let self=this;
      $.POST({
        url: 'wcOrderCO',
        data: {
          uid: self.data.psnId,
          usid: self.data.sId,
          num: self.data.num,
          remark: self.data.remark,
          begin_time: self.data.date + ' ' + self.data.time,
        }
      }, function (e) {
        $.openWin({
          url: '../orderCenter/orderCenter',
        })
      }, function (e) {
        console.log(e);
      })
    } ,

})