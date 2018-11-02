// pages/skillCertification/skillCertification.js
let $ = require('../util/commit.js');
let config = require('../util/config.js');
const RecorderManager = wx.getRecorderManager();
const innerAudioContext = wx.createInnerAudioContext();
let tempFilePath;

let ssTime;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    skillId:'',
    skillName:'',
    pic:'',
    audio:'',
    audio_time:0,
    audioTime:0,
    remark:'',
    showCover:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let param=JSON.parse(options.data);
    this.setData({
      skillId:param.id,
      skillName:param.name,
    })
  },
// 上传技能图片
  updatePic:function(e){
    let self = this;
    let psnkey = wx.getStorageSync('psnkey');
    wx.chooseImage({
      count: 1,
      success: function (res) {
        const tempFilePaths = res.tempFilePaths
        const src =tempFilePaths[0];
        
        if (src) {
          // 将图片参数传递给插件

          $.openWin({
            url: '../cropper/cropper',
            data: {
              CutPageType: 'skillCerImage',
              url: src,
            }
          });
        }
      },
    })

  },
  openShow:function(e){
    
    this.setData({
      showCover:true,
      audioTime:0,
    })
  },
  closeShow:function(e){
    this.setData({
      showCover: false,
    })
  },
  // 上传音频 
  startAudio:function(e){    
    var that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success() {
              that.start();
            }
          })
        }
        else {
          that.start();
        }
      }
    })

  },
  start:function(e){
    let self = this;
    let ss=0;
    const options = {
      duration: 60000,//指定录音的时长，单位 ms
      sampleRate: 16000,//采样率
      numberOfChannels: 1,//录音通道数
      encodeBitRate: 96000,//编码码率
      format: 'mp3',//音频格式，有效值 aac/mp3
      frameSize: 50,//指定帧大小，单位 KB
    }
    //开始录音
  
    RecorderManager.start(options);
    RecorderManager.onStart((res) => {
      console.log('recorder start');
      console.log(res);
      ssTime = setInterval(function (e) {
        ss++;
        self.setData({
          audioTime: ss,
        })
      }, 1000);
    });

    //错误回调
    RecorderManager.onError((res) => {
      console.log(res);
      self.setData({
        audioTime: 0,
      })
      clearTimeout(ssTime);
    })
  },
  stop:function(e){
    let self=this;
    RecorderManager.stop();
    RecorderManager.onStop((res) => {
      this.tempFilePath = res.tempFilePath;
      const { tempFilePath } = res;
      self.setData({
        audio: res.tempFilePath,
      })
      let psnkey = wx.getStorageSync('psnkey');
      wx.uploadFile({
        url: config.Config.updateAudioUrl,
        filePath: self.tempFilePath,
        name: 'file',
        formData: {
          'key': psnkey
        },
        success(res) {
          console.log(config.Config.updateAudioUrl);
          console.log(res);
          clearTimeout(ssTime);
          let audio = JSON.parse(res.data).data.audio;
          let duration = JSON.parse(res.data).data.duration;
          if (duration>5){
            self.setData({
              audio: audio,
              audio_time: duration,
            })
          }else{

            wx.showToast({
              title: '当前录音' + duration+'s请重新录制',
              icon:'none',
            });
            self.setData({
              audioTime:0,
            })
          }
        
        }
      })
    })
  },
  //播放声音
  play: function () {
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.tempFilePath,
      console.log('播放事件')
      console.log(innerAudioContext);
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })

  },
  // 备注
  keyContentBtn:function(e){
    this.setData({
      remark:e.detail.value,
    })
  },
  submitBtn:function(e){
    let self=this;
    if (!self.data.pic){
      wx.showToast({
        title: '请上传技能图片',
      })
    }
    if (!self.data.audio) {
      wx.showToast({
        title: '请上传录音',
      })
    }
    if (self.data.pic && self.data.audio){

      $.POST({
        url:'wcUserAUS',
        data:{
          cate_id: self.data.skillId,
          pic: self.data.pic,
          content:self.data.remark,
          audio: self.data.audio,
          audio_time: self.data.audio_time,
        }
      },function(e){
        wx.showToast({
          title: e.msg,
        });
        wx.navigateBack({
          
        })
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