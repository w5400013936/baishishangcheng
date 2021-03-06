// pages/payment/payment.js
var WxNotificationCenter = require("../../WxNotificationCenter/WxNotificationCenter.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paymentList: [{
        index: 0,
        name: '微信付款',
        selected: true,
        imgUrl: '/images/wechat.png',
        payMeth: 3
      },
      {
        index: 1,
        name: '前台付款',
        selected: false,
        imgUrl: '/images/creditCard.png',
        payMeth: 1
      }
    ],
    toastShow: false,
    payMeth: 3,
    createOrder: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    console.log("createOrder", options.createOrder)
    that.setData({
      createOrder: JSON.parse(options.createOrder)
    })
    if (that.data.createOrder.islive) {
      that.setData({
        paymentList: [{
            index: 0,
            name: '微信付款',
            selected: true,
            imgUrl: '/images/wechat.png',
            payMeth: 3
          },
          {
            index: 1,
            name: '前台付款',
            selected: false,
            imgUrl: '/images/creditCard.png',
            payMeth: 1
          }
        ]
      })
    } else {
      that.setData({
        paymentList: [{
          index: 0,
          name: '微信付款',
          selected: true,
          imgUrl: '/images/wechat.png',
          payMeth: 3
        }]
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    WxNotificationCenter.addNotification(getApp().shuaXin.guanBiZhiFu, this.guanBi, this)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    WxNotificationCenter.removeNotification(getApp().shuaXin.guanBiZhiFu, this)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 登录获取购物车
   */
  getVipLv: function() {
    var that = this

    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    wx.request({
      url: getApp().appData.host + "GetUser", //仅为示例，并非真实的接口地址
      data: {
        "openid": "",
        "nick": "",
        "unionid": "",
        "type": "1",
        "tpuser": "",
        "plat": "1",
        "rtype": "4",
        "token": getApp().appData.userInfo.token
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function(res) {
        console.log("登录信息", res.data)
        //请求成功
        if (res.data.state == 1) {
          if (res.data.data.viplv > 0) {
            that.setData({
              paymentList: [{
                index: 1,
                name: '前台付款',
                selected: true,
                imgUrl: '/images/creditCard.png',
                payMeth: 1
              }]
            })
          }
        } else { //请求失败
          that.setData({
            isfail: true,
          })
          wx.hideLoading()
        }
      },
      fail: function(res) {
        that.setData({
          isfail: true,
        })
        wx.hideLoading()
      },
      complete: function() {
        wx.stopPullDownRefresh();
      }
    })
  },

  /**
   * 关闭页面
   */
  guanBi: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  changePayment: function(e) {
    var that = this
    var index = e.currentTarget.dataset.index;
    var selected = e.currentTarget.dataset.selected;
    var paymentList = this.data.paymentList;
    if (!selected) {
      paymentList.forEach(function(item, key) {
        if (index == key) {
          item.selected = true
          that.data.payMeth = item.payMeth
        } else {
          item.selected = false;
        }
      })
      this.setData({
        paymentList: paymentList
      })
    }
  },

  payNow: function() {
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    if (that.data.payMeth == 3) {
      console.log("openid", getApp().appData.userInfo.openid)
      wx.request({
        url: getApp().appData.host + "PayRequest", //仅为示例，并非真实的接口地址
        data: {
          "orderkey": that.data.createOrder.paykey + "|192.168.1.1",
          "paymeth": 4,
          "openid": getApp().appData.userInfo.openid,
          "token": getApp().appData.userInfo.token
        },
        header: {
          'content-type': 'application/json', // 默认值
        },
        method: 'POST',
        success: function(res) {
          console.log("请求支付", res.data)
          //请求成功
          if (res.data.state == 1) {
            var payBean = JSON.parse(res.data.data)
            wx.requestPayment({
              'timeStamp': payBean.timeStamp + "",
              'nonceStr': payBean.nonceStr,
              'package': payBean.package,
              'signType': payBean.signType,
              'paySign': payBean.paySign,
              'success': function(res) {
                getApp().shuaXin.order = true
                wx.hideLoading()
                that.setData({
                  toastShow: true
                })
              },
              'fail': function(res) {
                console.log(JSON.stringify(res))
                console.log(res.detail)
                console.log(res.message)
                wx.hideLoading()
                wx.showModal({
                  title: "提示",
                  content: "支付失败",
                  showCancel: false,
                  success: function() {}
                })
              }
            })
          } else { //请求失败
            wx.hideLoading()
          }
        },
        fail: function(res) {
          wx.hideLoading()
        },

      })
    } else {
      wx.hideLoading()
      wx.navigateTo({
        url: '/pages/payCode/payCode?createOrder=' + JSON.stringify(this.data.createOrder),
      })
    }
  }
})