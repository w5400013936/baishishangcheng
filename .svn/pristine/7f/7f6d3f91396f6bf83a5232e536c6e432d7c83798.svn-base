// component/confirm.js
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
      value: '微信授权登录'
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
    bindGetUserInfo: function (e) {
      this.setData({
        show: false
      })
      console.log(e)
      getApp().wxLogin(e.detail)
      wx.setStorage({
        key: getApp().acache.userInfoX,
        data: e.detail.userInfo,
      })
      // WxNotificationCenter.postNotificationName(getApp().appData.notifyUserInfo, JSON.stringify(e.detail));
    },
    handleConfirmHide: function () {
      this.setData({
        show: false
      })
    }
  },

})
