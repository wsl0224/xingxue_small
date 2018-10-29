//项目URL相同部分，减轻代码量，同时方便项目迁移
//这里因为我是本地调试，所以host不规范，实际上应该是你备案的域名信息
var host = 'https://app.xingxue.vip/';
/**
 * POST请求，
 * param{
 * url:接口
 * data:参数
 * }
 * doSuccess：成功的回调函数
 * doFail：失败的回调函数
 */
function POST(param, doSuccess, doFail) {
   
    var value = wx.getStorageSync('psnkey');

    if (value) {
      param.data.key = value;
    }
    wx.request({
      //项目的真正接口，通过字符串拼接方式实现
      url: host + param.url,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: param.data,
      method: 'POST',
      success: function(res) {
        //参数值为res.data,直接将返回的数据传入
        console.log(param);
        console.log(res);
        if (res.data.code == 200) {
          doSuccess(res.data);
          wx.stopPullDownRefresh();
        } else {
          if (param.url == 'wcUserMHP') {
            doSuccess(res.data);
           
          } else {
            wx.showToast({
              title: res.data.msg,
              duration: 2000
            })
          }

        }

      },
      fail: function() {
        doFail();
      },
     
    })
}

//GET请求，不需传参，直接URL调用，
function GET(param, doSuccess, doFail) {

  wx.request({
    url: host + param.url,
    header: {
      "content-type": "application/json;charset=UTF-8"
    },
    method: 'GET',
    success: function(res) {
      console.log('GET');
      console.log(param);
      console.log('GET成功');
      console.log(res.data);
      doSuccess(res.data);
      wx.stopPullDownRefresh();
    },
    fail: function() {
      doFail();
    },
  })
}
// 打开页面
//  url:路径
//  data:{url:,param:}
function openWin(e) {
  let param, path;
  if (e.data) {
    param = JSON.stringify(e.data);
    path = e.url + '?data=' + param;
  } else {
    path = e.url;
  }
  wx.navigateTo({
    url: path,
  });
}
// 格式化日期
function formatDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-')
}
// 格式化时间
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 截取字符串
function subStrVal(value, num) {
  if (value.lenght > num) {
    value = value.substring(0, num) + '...';

  }
  return value;
}
module.exports = {
  openWin,
  POST,
  GET,
  formatTime,
  formatNumber,
}