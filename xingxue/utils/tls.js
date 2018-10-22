var encrypt = require('encrypt.js');

var sdkappid = 10001;


function login(...opts){
  console.log(opts);
  var user = "Tx_" +opts.id;
    wx.request({
      url: 'https://sxb.qcloud.com/sxb_dev/?svc=doll&cmd=fetchsig', //仅为示例，并非真实的接口地址
        data: {
          "id": user,
          "appid": sdkappid
        },
        method: 'post',
        header: {
             'content-type': 'application/json'
        },
        success: function(res) {
          console.log(res);
            opts.success && opts.success({
              Identifier: user,
                UserSig: res.data.data.userSig
            });
        },
        fail : function(errMsg){
            opts.error && opts.error(errMsg);
        }
    });
}

module.exports = {
    init : function(opts){
        sdkappid = opts.sdkappid;
    },
    login : login
};