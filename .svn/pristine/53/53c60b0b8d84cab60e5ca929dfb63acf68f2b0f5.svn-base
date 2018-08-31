// components/toast.js
var WxNotificationCenter = require("../../WxNotificationCenter/WxNotificationCenter.js");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: ''
    },
    message: {
      type: String,
      value: ''
    },
    price: {
      type: String,
      value: ''
    },
    url: {
      type: String,
      value: ''
    },
    button: {
      type: String,
      value: '确定'
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
    handleHideToast:function(){
      console.log(this.data.url)
      WxNotificationCenter.postNotificationName(getApp().shuaXin.guanBiZhiFu);
      if(this.data.url == ''){
        this.setData({
          show: false
        })
      }
      else{
        this.setData({
          show:false
        })
        wx.navigateTo({
          url: this.data.url,
        })
      }
    }
  }
})
