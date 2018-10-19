let underscore = require('./underscore-1.8.3.js');


let utils = {
  
  stringFormat: (temp, data, regexp) => {
    if (!(Object.prototype.toString.call(data) === "[object Array]")) data = [data];
    var ret = [];
    for (var i = 0, j = data.length; i < j; i++) {
      ret.push(replaceAction(data[i]));
    }
    return ret.join("");

    function replaceAction(object) {
      return temp.replace(regexp || (/\\?\{([^}]+)\}/g), function (match, name) {
        if (match.charAt(0) == '\\') return match.slice(1);
        return (object[name] != undefined) ? object[name] : '{' + name + '}';
      });
    }
  },
  deepCopy: (obj) => {
    return JSON.parse(JSON.stringify(obj));
  },
  rename: (obj, newNames) => {
    return underscore.reduce(newNames, function (memo, val, index) {
      memo[val] = obj[index];
      return memo;
    }, underscore.omit(obj, underscore.keys(newNames)));
  },
  dateFormat: (date, fmt) => {
    var o = {
      'M+': date.getMonth() + 1, //月份 
      'd+': date.getDate(), //日 
      'h+': date.getHours(), //小时 
      'm+': date.getMinutes(), //分 
      's+': date.getSeconds(), //秒 
      'q+': Math.floor((date.getMonth() + 3) / 3), //季度 
      'S': date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
    return fmt;
  },
  formatMessage: (message) => {
    let { messageDirection: direction, sentTime } = message;
    direction = direction == 1 ? 'sender' : 'receiver';
    message._sentTime = sentTime;
    sentTime = utils.dateFormat(new Date(sentTime), 'hh:mm');
    underscore.extend(message, {direction, sentTime});
  }
};
underscore.extend(utils, underscore);
module.exports = utils;