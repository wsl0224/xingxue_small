// pages/myAttentionFans/myAttentionFans.js
let $=require('../util/commit.js');
let pageNum=1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    atteStatus:true,
    fansStatus:false,
    title:'',
    psnData: [
      {
        id: '1',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        name: '成都小甜甜',
        sex: '1',
        age: '20',
        time: '22分钟前',
        num: 129,
        qianming: '爱到最美是陪伴',
        money: 8,
      }, {
        id: '2',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        name: '成都小甜甜',
        sex: '2',
        age: '20',
        time: '22分钟前',
        num: 129,
        qianming: '爱到最美是陪伴',
        money: 8,
      }, {
        id: '3',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        name: '成都小甜甜',
        sex: '1',
        age: '20',
        time: '22分钟前',
        num: 129,
        qianming: '爱到最美是陪伴',
        money: 8,
      }, {
        id: '3',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        name: '成都小甜甜',
        sex: '1',
        age: '20',
        time: '22分钟前',
        num: 129,
        qianming: '爱到最美是陪伴',
        money: 8,
      }, {
        id: '3',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        name: '成都小甜甜',
        sex: '1',
        age: '20',
        time: '22分钟前',
        num: 129,
        qianming: '爱到最美是陪伴',
        money: 8,
      }, {
        id: '3',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        name: '成都小甜甜',
        sex: '1',
        age: '20',
        time: '22分钟前',
        num: 129,
        qianming: '爱到最美是陪伴',
        money: 8,
      }, {
        id: '3',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        name: '成都小甜甜',
        sex: '1',
        age: '20',
        time: '22分钟前',
        num: 129,
        qianming: '爱到最美是陪伴',
        money: 8,
      }, {
        id: '3',
        url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        name: '成都小甜甜',
        sex: '1',
        age: '20',
        time: '22分钟前',
        num: 129,
        qianming: '爱到最美是陪伴',
        money: 8,
      },
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let param = JSON.parse(options.data);
    if (param.Type=='atte'){
     this.showAttentionData();
    } else if (param.Type == 'fans'){
      this.showFansData()
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
  // 选择tab
  ChooseTab:function(e){
    console.log(e);
    if(e.currentTarget.dataset.id=='left'){
      this.showAttentionData();
    } else if (e.currentTarget.dataset.id == 'right'){
      this.showFansData();
    }
   
  },
  // 显示关注数据
  showAttentionData:function(e){
    this.setData({
      atteStatus: true,
      fansStatus: false,
    });
    wx.setNavigationBarTitle({
      title: '我的关注'
    });
    this.freshAttentionData();
  },
  // 刷新关注数据
  freshAttentionData:function(e){
    let self=this;   
    $.POST({
      url:'wcUserSUFollow',
      data:{
        page:1,
      }
    },function(e){
      pageNum=1;
      self.setData({
        psnData:e.data,
      })
    },function(e){

    });
  },
  freshMoreAtteData:function(e){
    let self = this;
    pageNum ++;
    $.POST({
      url: 'wcUserSUFollow',
      data: {
        page: pageNum,
      }
    }, function (e) {
    
      self.setData({
        psnData: e.data.psnData.concat(e.data),
      })
    }, function (e) {
      console.log(e);
    });
  },
  // 显示粉丝数据
  showFansData:function(e){
    this.setData({
      atteStatus: false,
      fansStatus: true,
    });
    wx.setNavigationBarTitle({
      title: '我的粉丝'
    });
    this.freshFansData();
  },
  // 刷新粉丝
  freshFansData: function (e) {
    let self = this;
    $.POST({
      url: 'wcUserSUFans',
      data: {
        page: 1,
      }
    }, function (e) {
      pageNum = 1;
      self.setData({
        psnData: e.data,
      })
    }, function (e) {

    });
  },
  freshMoreFansData: function (e) {
    let self = this;
    pageNum++;
    $.POST({
      url: 'wcUserSUFans',
      data: {
        page: pageNum,
      }
    }, function (e) {

      self.setData({
        psnData: e.data.psnData.concat(e.data),
      })
    }, function (e) {
      console.log(e);
    });
  },
// 下拉upper
  upper:function(e){
    if (this.data.atteStatus){
      this.freshAttentionData();
    }else{
      this.freshFansData();
    }
  },
  lower:function(e){
    if (this.data.atteStatus) {
      this.freshMoreAtteData();
    } else {
      this.freshMoreFansData();
    }
  },
  // 
  drawStart: function (e) {
    // console.log("drawStart");  
    var touch = e.touches[0]

    for (var index in this.data.psnData) {
      var item = this.data.psnData[index]
      item.right = 0
    }
    this.setData({
      data: this.data.psnData,
      startX: touch.clientX,
    })

  },
  drawMove: function (e) {
    var touch = e.touches[0]
    var item = this.data.psnData[e.currentTarget.dataset.index]
    var disX = this.data.startX - touch.clientX

    if (disX >= 20) {
      if (disX > this.data.delBtnWidth) {
        disX = this.data.delBtnWidth
      }
      item.right = disX
      this.setData({
        data: this.data.psnData
      })
    } else {
      item.right = 0
      this.setData({
        data: this.data.psnData
      })
    }
  },
  drawEnd: function (e) {
    var item = this.data.psnData[e.currentTarget.dataset.index]
    if (item.right >= this.data.delBtnWidth / 2) {
      item.right = this.data.delBtnWidth
      this.setData({
        data: this.data.psnData,
      })
    } else {
      item.right = 0
      this.setData({
        data: this.data.psnData,
      })
    }
  },
  delItem: function (e) {
    let self=this;
    $.POST({
      url:'wcUserUFU',
      data:{
        fid:e.currentTarget.dataset.id,
      }
    },function(e){
      self.freshAttentionData();
    },function(e){
      console.log(e);
    })
  }
})