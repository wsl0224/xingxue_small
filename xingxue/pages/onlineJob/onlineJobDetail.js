// pages/onlineJob/onlineJobDetail.js
let $=require('../util/commit.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oid:'',
    jobData:{},
    mid:'',
    showSubmit:false,
    pageType:'',
    showJob:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onlinJobDetail')
    let param=JSON.parse(options.data);
    console.log(param);
    if (param.Type =='JobHall'){
      this.setData({
        showJob: true,
      })
    }else{
      
      this.setData({
        showJob:false,
        mid:param.mid
      })
    }
    this.setData({
      oid:param.id,
      pageType: param.Type,
    });
    this.freshData();
  },
  // 加载
  freshData:function(e){
    let self=this;
 
      $.POST({
        url: 'Wc/Task/task_list',
        data: {
          tid: self.data.oid,
          mid: self.data.mid
        }
      }, function (e) {
        self.setData({
          jobData: e.data[0],
        })
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
    this.freshData();
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
    console.log(getCurrentPages().length);
      

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
  // 跳转任务链接
  ToWebPage:function(e){
    wx.setClipboardData({
      data: e.currentTarget.dataset.url,
      success(res) {
        wx.getClipboardData({
          success(res) {
            wx.showToast({
              title: '复制成功,请用浏览器访问',
              icon:'none',
            })
          }
        })
      }
    }) 
  },
  // 任务提交
  ToSubmitStart:function(e){
    let tid = e.currentTarget.dataset.id;
    let self=this;
    $.POST({
      url:'Wc/Task/task_receive',
      data:{
        tid: tid,
      }
    },function(res){
      console.log(res);
      self.setData({
        mid: res.msg,
        showSubmit:true,
      });
    })
   
  },
  // 提交
  ToSubmit:function(e){
    let tid = e.currentTarget.dataset.id;
    let self=this;
    console.log('提交事件')
    console.log(this.data);
    $.openWin({
      url: '../onlineJob/submitJob',
      data: {
        id: tid,
        mid: self.data.mid,
      }
    })
  },
  showBigImage:function(e){
    var src = e.currentTarget.dataset.src;
    var list =[];
    list.push(src);
    wx.previewImage({
      current: src,
      urls: list
    })
  },
 
})