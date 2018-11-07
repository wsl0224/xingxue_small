// pages/conversation/components/message.js
let $=require('../../util/commit.js');
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    message: Object
  },
  relations: {
    './message/image': {
      type: 'child'
    },
    './message/text': {
      type: 'child'
    },
    './message/voice': {
      type: 'child'
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlayVoice: function (event) {
      this.triggerEvent('onplay', event.detail)
    },
    onPlayMusic: function(event){
      this.triggerEvent('onplaymusic', event.detail)
    },
    onMusicStop: function (event){
      this.triggerEvent('onmusicstop', event.detail)
    },
    onPreviewImage: function(event){
      let {detail} = event;
      this.triggerEvent('onpreviewimage', detail);
    },
    ToPsnPage:function(event){
      console.log(event);
      console.log(event.currentTarget.dataset.message);
      let message=event.currentTarget.dataset.message;

      if(message.direction=='receiver'){
        let psnId = message.targetId.split('_')[1];
        $.openWin({
          url:'../psnPage/psnPage',
          data:{
            id:psnId
          }
        })
      }
    }
  }
})
