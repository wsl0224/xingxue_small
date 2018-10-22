
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
function POST(param,doSuccess,doFail) {
  console.log('POST参数');
  console.log(param);
  wx.request({
    //项目的真正接口，通过字符串拼接方式实现
    url: host + param.url,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: param.data,
    method: 'POST',
    success: function (res) {
      console.log('POST成功');
      console.log(res.data);
      //参数值为res.data,直接将返回的数据传入
      doSuccess(res.data);
    },
    fail: function () {
      doFail(res);
    },
  })
}

//GET请求，不需传参，直接URL调用，
function GET(param, doSuccess, doFail) {
  console.log('GET');
  console.log(param);
  wx.request({
    url: host + param.url,
    header: {
      "content-type": "application/json;charset=UTF-8"
    },
    method: 'GET',
    success: function (res) {
      console.log('GET成功');
      console.log(res.data);
      doSuccess(res.data);
    },
    fail: function () {
      doFail();
    },
  })
}
// 打开页面
//  url:路径
//  data:{url:,param:}
function openWin(e){
  let param,path;
  if(e.data){
     param = JSON.stringify(e.data);
     path = e.url + '?data=' + param;
  }else{
    path = e.url;
  }
  wx.navigateTo({
    url: path,
  });
}
// 格式化时间
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports.openWin = openWin;
module.exports.POST = POST;
module.exports.GET = GET;
module.exports.formatTime = formatTime;
module.exports.formatNumber = formatNumber;
