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
    psnData: [],
    isTouchMove:-1,
    startX: 0, //开始坐标
    startY: 0,
    isTouchMoveFans:-1,
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
    if (this.data.atteStatus) {
      this.freshAttentionData();
    } else {
      this.freshFansData();
    }
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
    wx.stopPullDownRefresh();
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
    wx.stopPullDownRefresh();
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
  ToPsnPage:function(e){
    $.openWin({
      url:'../psnPage/psnPage',
      data:{
        id:e.currentTarget.dataset.psnid,
      }
    })
  },
  // 触发开始
  touchstart: function (e) {
    console.log('触发开始');
  
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      isTouchMove: e.currentTarget.dataset.index,
    });

  },
  // 触发开始
  touchstartFans: function (e) {
    console.log('触发开始');

    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      isTouchMoveFans: e.currentTarget.dataset.index,
    });

  },
  // 移动
  touchmove: function (e) {
    console.log('触发移动');
    console.log(e);
    var that = this,
      startX = that.data.startX,//开始X坐标

      startY = that.data.startY,//开始Y坐标

      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标

      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    //滑动超过30度角 return

    console.log(touchMoveX, startX);
    if (Math.abs(angle) > 30) return;
    let conversationCopy = that.data.conversation;
    if (touchMoveX > startX) {//右滑
      that.setData({
        isTouchMove :-1,
       
      });
    } else {
      
    }
  },
  // 移动
  touchmoveFans: function (e) {
    console.log('触发移动');
    console.log(e);
    var that = this,
      startX = that.data.startX,//开始X坐标

      startY = that.data.startY,//开始Y坐标

      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标

      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    //滑动超过30度角 return

    console.log(touchMoveX, startX);
    if (Math.abs(angle) > 30) return;
    let conversationCopy = that.data.conversation;
    if (touchMoveX > startX) {//右滑
      that.setData({
        isTouchMoveFans: -1,

      });
    } else {

    }
  },
  //     * 计算滑动角度

  // * @param { Object } start 起点坐标

  //   * @param { Object } end 终点坐标

  //     * 

  angle: function (start, end) {

    var _X = end.X - start.X,

      _Y = end.Y - start.Y

    //返回角度 /Math.atan()返回数字的反正切值

    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);

  },
  delItem:function(e){
    let that=this;
    $.POST({
      url:'wcUserUFU',
      data:{
        fid:e.currentTarget.dataset.id,
      }
    },function(e){
      wx.showToast({
        title: '取消成功',
        icon:'none',
      })
      that.freshAttentionData();
    },function(e){})
  },
  AtteBtn:function(e){
    let that=this;
    $.POST({
      url:'wcUserAFU',
      data:{
        uid:e.currentTarget.dataset.id,
      }
    },function(e){
      wx.showToast({
        title: '关注成功',
        icon:'none',
      });
      that.freshFansData();
    },function(e){});
  }
})