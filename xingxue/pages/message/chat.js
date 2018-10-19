// pages/conversation/chat.js
let app = getApp();
let { stringFormat } = require('../util/utils.js');
let { Service: { Message } } = app.globalData;
Page({
  data: {
    messageList: [],
    content: '',
    query: null,
    messageUId: '',
    isLoading: false,
    hasMore: true,
    display: 'none'
  },
  onLoad: function(query){
    let context = this;
    context.setData({
      query: query
    });
    getMessageList(context, {
      position: 0
    });

    Message.watch((message) => {
      let {conversationType} = message;
      let { query: { type, targetId }, messageList } = context.data;
      let isCurrent = (type == conversationType && message.targetId == targetId);
      if(isCurrent){
        messageList.push(message);
        context.setData({
          messageList: messageList,
          messageUId: message.messageUId
        });
      }
    });
  },
  getDirection: function(message){
    var isSender = (message.direction == 1);
    return isSender ? 'sender' : 'receiver';
  },
  bindInput: function(e){
    this.setData({
      content: e.detail.value
    });
  },
  send: function(){
    let context = this;
    let { query: { type, targetId }, content, messageList } = context.data;
    console.warn('sendmessage: ', content);
    Message.sendText({ type, targetId, content}).then((message) => {
      messageList.push(message);
      context.setData({
        messageList: messageList,
        content: '',
        messageUId: message.messageUId || ''
      });
    });
  },
  loadMore: function(){
    if (!this.data.hasMore){
      return;
    }
    if(this.data.isLoading){
      return;
    }
    getMessageList(this, {
      position: 1,
      count: 3
    }); 
  }
});
function getMessageList(context, params){
  context.setData({
    isLoading: true
  });
  let { query: { type, targetId } } = context.data;
  let {position, count} = params;
  Message.getList({
    type,
    targetId,
    position,
    count
  }).then((result) => {
    let { messageList: _messageList, hasMore} = result;
    let { messageList} = context.data;
    let message = _messageList[_messageList.length - 1] || {};
    let len = messageList.length;
    messageList = _messageList.concat(messageList);
    context.setData({
      messageList: messageList,
      hasMore: hasMore,
      isLoading: false
    });
  });
}