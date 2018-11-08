// pages/conversation/components/conversation.js
const { globalData } = getApp();
const { Service: { Status, Message} } = globalData;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    conversation: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {
    startX: 0, //开始坐标
    startY: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 触发开始
    touchstart: function(e) {
      console.log(this.data.conversation);
      console.log('触发开始');
      this.setData({
        startX: e.changedTouches[0].clientX,
        startY: e.changedTouches[0].clientY,
      });

    },
    // 移动
    touchmove: function(e) {
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
      console.log(this.data.conversation);
      console.log(touchMoveX, startX);
            if (Math.abs(angle) > 30) return;
      let conversationCopy = that.data.conversation;
    
      if (touchMoveX > startX) {//右滑
        console.log('右滑');
        conversationCopy.isTouchMove = false;
        that.setData({
          conversation: conversationCopy,
        });
      }else{
        console.log('左滑');
        conversationCopy.isTouchMove = true;
        that.setData({
          conversation: conversationCopy,
        });
      }
    },
    //     * 计算滑动角度

    // * @param { Object } start 起点坐标

    //   * @param { Object } end 终点坐标

    //     * 

    angle: function(start, end) {

      var _X = end.X - start.X,

        _Y = end.Y - start.Y

      //返回角度 /Math.atan()返回数字的反正切值

      return 360 * Math.atan(_Y / _X) / (2 * Math.PI);

    },
    // 删除
    del:function(e){
      console.log(this.data.conversation);
      let targetId = this.data.conversation.targetId;
      let delMsg = [];
      delMsg.push(this.data.conversation.latestMessageId);
      Message.deleteMessages({
        type:1,
        targetId, 
      });
      
    }
  }
})