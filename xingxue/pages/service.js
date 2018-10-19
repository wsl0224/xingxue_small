const RongIMLib = require('./message/lib/RongIMLib.miniprogram-1.0.4.js');
const RongIMClient = RongIMLib.RongIMClient;

const utils = require('./util/utils.js');
const friendList = require('./mock.js').friendList;

let imInstance = null;
let currentUser = null;

let config = {
  appkey: '',
  url: '',
  wsScheme: 'wss://',
  protocol: 'https://'
};

function ObserverList() {
  var checkIndexOutBound = function (index, bound) {
    return index > -1 && index < bound;
  };

  this.observerList = [];

  this.add = function (observer, force) {
    if (force) {
      this.observerList.length = 0;
    }
    this.observerList.push(observer);
  };

  this.get = function (index) {
    if (checkIndexOutBound(index, this.observerList.length)) {
      return this.observerList[index];
    }
  };

  this.count = function () {
    return this.observerList.length;
  };

  this.removeAt = function (index) {
    checkIndexOutBound(index, this.observerList.length) && this.observerList.splice(index, 1);
  };

  this.remove = function (observer) {
    if (!observer) {
      this.observerList.length = 0;
      return;
    }
    var observerList = Object.prototype.toString.call(observer) === '[object Function]' ? [observer] : observer;
    for (var i = 0, len = this.observerList.length; i < len; i++) {
      for (var j = 0; j < observerList.length; j++) {
        if (this.observerList[i] === observerList[j]) {
          this.removeAt(i);
          break;
        }
      }
      // if (this.observerList[i] === observer[i]) {
      //     this.removeAt(i);
      //     break;
      // }
    }
  };

  this.notify = function (val) {
    for (var i = 0, len = this.observerList.length; i < len; i++) {
      this.observerList[i](val);
    }
  };

  this.indexOf = function (observer, startIndex) {
    var i = startIndex || 0,
      len = this.observerList.length;
    while (i < len) {
      if (this.observerList[i] === observer) {
        return i;
      }
      i++;
    }
    return -1;
  };
}

let Friend = {};

Friend.getList = () => {
  return Promise.resolve(utils.filter(friendList, (friend) => {
    return (friend.id != currentUser.id);
  }));
};

let User = {};

let getUser = (user) => {
  let users = JSON.parse(JSON.stringify(friendList));

  let getById = () => {
    return users.filter((_user) => {
      return _user.id == user.id;
    })[0];
  };

  let getByRandom = () => {
    let friends = users.filter((_user) => {
      return _user.type == 1;
    });
    let friendLen = friends.length - 1;
    let index = utils.random(0, friendLen);
    return friends[index];
  };

  user = getById();
  if(!user){
    user = getByRandom();
  }
  return user
};
User.getToken = (user) => {
  currentUser = getUser(user);
  return Promise.resolve(currentUser);
};

let bindSender = (message, position) => {
  if (!utils.isArray(message)) {
    message = [message];
  }
  let getSender = {
    1: (msg) => {
      msg.sender = utils.find(friendList, (friend) => {
        return (friend.id == msg.senderUserId);
      });
    },
    3: (msg) => {
      msg.sender = utils.find(friendList, (friend) => {
        return (friend.id == msg.senderUserId);
      });
    }
  };
  utils.map(message, (msg) => {
    msg.pos = position;
    getSender[msg.conversationType](msg);
    utils.formatMessage(msg);
    return msg;
  });
};

let Message = {
  watcher: new ObserverList(),
  _push: (message) => {
    //不处理离线消息
    if(message.offLineMessage){
      return;
    }
    bindSender(message);
    Message.watcher.notify(message);
  }
};

//params.type
//params.targetId
//params.content  
Message.sendText = (params) => {
  let bindUser = (message, next) => {
    bindSender(message);
    next(message);
  };
  console.warn('service sendmessage: ', content);
  let { type, targetId, content} = params;
  return new Promise((resolve, reject) => {
    console.warn('service promise sendmessage: ', content);
    
    let msg = new RongIMLib.TextMessage({ content, extra: JSON.stringify({ msgType: 2 })});
    imInstance.sendMessage(+type, targetId, msg, {
      onSuccess: message => {
        console.warn('service promise sendmessage success: ', msg);
        bindUser(message, resolve);
      },
      onError: (error, message) => {
        console.warn('service promise sendmessage error: ', error);
        //bindUser(message, reject);
      }
    });
  });
};
// params.type 
// params.targetId
// params.position 0/1
Message.getList = (params) => {
  let {type, targetId, position, count} = params;
  count = count || 5;
  return new Promise((resolve, reject) => {
    let timestamp = position > 0 ? null : position;
    imInstance.getHistoryMessages(+type, targetId, timestamp, count, {
      onSuccess: (messageList, hasMore) => {
        bindSender(messageList, position);
        resolve({ messageList, hasMore});
      },
      onError: (error) => {
        console.error('gethistoryMessages', error);
        reject(error);
      }
    });
  });
};

Message.watch = (watch) => {
  Message.watcher.add(watch);
};

let Conversation = {
  watcher: new ObserverList()
};

let bindUserInfo = (list) => {
  let unknowUser = {
    name: '火星人',
    portrait: 'https://rongcloud-image.cn.ronghub.com/FjGxbmdZ7wyIqMHvaa3SqOgSZGk_?e=2147483647&token=CddrKW5AbOMQaDRwc3ReDNvo3-sL_SO1fSUBKV3H:OCCilgLZtkK8G9AmayjUzP9J66w='
  };
  let unknowGroup = {
    name: '火星群组',
    portrait: 'https://rongcloud-image.cn.ronghub.com/FjGxbmdZ7wyIqMHvaa3SqOgSZGk_?e=2147483647&token=CddrKW5AbOMQaDRwc3ReDNvo3-sL_SO1fSUBKV3H:OCCilgLZtkK8G9AmayjUzP9J66w='
  };
  if (!utils.isArray(list)){
    list = [list];
  }

  let infoMap = {
      1: (conversation) => {
        conversation.user = utils.find(friendList, (friend) => {
          return friend.id == conversation.targetId
        }) || unknowUser;
      },
      2: (conversation) => {
        conversation.user = unknowUser;
      },
      3: (conversation) => {
        conversation.group = utils.find(friendList, (friend) => {
          return friend.id == conversation.targetId
        }) || unknowGroup;
      },
      10: (conversation) => {
        conversation.user = unknowUser;
      }
  };
  utils.map(list, (conversation) => {
    let {sentTime} = conversation;
    conversation._sentTime = utils.dateFormat(new Date(sentTime), 'hh:mm');
    let _type = conversation.conversationType;
    _type = _type > 3 ? 10 : _type;
    infoMap[_type](conversation);
  });
};
// params.type 
// params.targetId
/**
Conversation.getList = (parmas) => {
  return new Promise((resolve, reject) => {
    imInstance.getConversationList({
      onSuccess: (list) => {
        bindUserInfo(list);
        resolve(list);
      },
      onError: (error) => {
        reject(error);
      }
    }, null);
  });
};
 */
// params.type 
// params.targetId
Conversation.remove = (params) => {
};
Conversation.watch = (watcher) => {
  RongIMClient.Conversation.watch(function(list){
    bindUserInfo(list);
    watcher(list);
  });
};
let Status = {
  watcher: new ObserverList(),
  state: -1
};
Status.getCurrentState = () => {
  return Status.state;
};
Status.disconnect = () => {
  Status.state = -1;
  RongIMClient.getInstance().disconnect();
};
Status.connect = (params) => {
  let {token} = params;

  RongIMClient.setConnectionStatusListener({
    onChanged: (status) =>{
      Status.watcher.notify(status);
      Status.state = status;
    }
  });

  let receiveMessage = (message) => {
    console.log(message);
      let {messageType} = message;
      let messageCtrol = {
        otherMessage: () => {
          Message._push(message);
        }
      };
      let messageHandler = messageCtrol[messageType] || messageCtrol.otherMessage;
      messageHandler();
  };
  RongIMClient.setOnReceiveMessageListener({
    onReceived: receiveMessage
  });

  var messageName = "PersonMessage"; // 消息名称。
  var objectName = "s:person"; // 消息内置名称，请按照此格式命名。
  var mesasgeTag = new RongIMLib.MessageTag(true, true);// 消息是否保存是否计数，true true 保存且计数，false false 不保存不计数。
  var prototypes = ["name", "age"]; // 消息类中的属性名。
  RongIMClient.registerMessageType(messageName, objectName, mesasgeTag, prototypes);

  let promise = new Promise((resolve, reject) => {
    RongIMClient.connect(token, {
      onSuccess: (userId) => {
        Status.state = 0;
        resolve(userId);
      },
      onTokenIncorrect: () => {
        reject(RongIMLib.ConnectionState.TOKEN_INCORRECT);
      },
      onError: (error) => {
        console.log('eeeeaaaa',error);
        reject(error);
      }
    });
  });
  return promise;
};

Status.watch = (watch) => {
  var force = true;
  Status.watcher.add(watch, force);
};

let modules = {
  User,
  Message,
  Conversation,
  Friend,
  Status,
  ConnectionStatus: RongIMLib.ConnectionStatus
};
module.exports = (_config) => {
  utils.extend(config, _config);
  RongIMClient.init(config.appkey, null, {
    navi: config.navi,
    cmp: config.cmp,
    wsScheme: config.wsScheme,
    protocol: config.protocol
  });
  imInstance = RongIMClient.getInstance();
  return modules;
};