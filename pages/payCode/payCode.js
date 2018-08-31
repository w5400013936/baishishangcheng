// pages/payCode/payCode.js
var QRCode = require('../../utils/qrcode.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    createOrder: "",
    orderNo:"",
    qrcode:"",
    qrcodeWidth:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({
      createOrder: JSON.parse(options.createOrder)
    })
    wx.getSystemInfo({
      success: function (res) {
        that.data.qrcodeWidth= 460 * res.windowWidth/750; //将高度乘
      }
    }) 
    that.request()
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

  request() {
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    wx.request({
      url: getApp().appData.host + "UserGetOne", //仅为示例，并非真实的接口地址
      data: {
        parm: "keyID|" +  that.data.createOrder.orderkey,
        mod: "order",
        token:getApp().appData.userInfo.token
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function(res) {
        console.log("前台支付", res.data)
        //请求成功
        if (res.data.state == 1) {

          var qrcode = new QRCode('canvas', {
            text: res.data.data.orderNo,
            width: that.data.qrcodeWidth,
            height: that.data.qrcodeWidth,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H,
          });
          console.log(qrcode)
          that.setData({
            orderNo: res.data.data.orderNo,
            qrcode: qrcode
          })
          wx.hideLoading()
          that.setData({
            isfail: false,
          })
        } else { //请求失败
          wx.hideLoading()
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
})