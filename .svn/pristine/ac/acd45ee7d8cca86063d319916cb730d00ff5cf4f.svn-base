// component/code/code.js
var WxNotificationCenter = require("../../WxNotificationCenter/WxNotificationCenter.js");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      value: false,
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    youHuiQuan: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleHideBox: function() {
      var that = this
      if (!that.data.youHuiQuan){
        wx.showToast({
          title: '请输入优惠码',
        })
        return
      }
      wx.showLoading({
        title: '领取中……',
        mask: true
      })
      wx.request({
        url: getApp().appData.host + "UseCoup", //仅为示例，并非真实的接口地址
        data: {
          "coup": that.data.youHuiQuan,
          "token": getApp().appData.userInfo.token
        },
        header: {
          'content-type': 'application/json', // 默认值
        },
        method: 'POST',
        success: function(res) {
          console.log("获取优惠券", res.data)
          //请求成功
          if (res.data.state == 1) {
            wx.hideLoading()
            that.setData({
              isfail: false,
              show: false
            })
            WxNotificationCenter.postNotificationName(getApp().shuaXin.youHuiQuan);
          } else { //请求失败
            wx.hideLoading()
            setTimeout(function() {
              wx.showModal({
                title: '提示',
                content: res.data.msg,
                showCancel: false
              })
            }, 300)
          }
        },
        fail: function(res) {
          wx.hideLoading()
        },
        complete: function() {
          wx.stopPullDownRefresh();
        }
      })

    },
    youHuiMaInput(e) {
      this.setData({
        youHuiQuan: e.detail.value
      })
    },
    handleHideBoxCancle(){
      this.setData({
        show: false
      })
    }
  },
})