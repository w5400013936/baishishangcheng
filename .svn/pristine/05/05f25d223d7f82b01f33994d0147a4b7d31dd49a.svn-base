// pages/phoneVerification/phoneVerification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sms: "",
    phone: "",
    smsText: "获取验证码",
    showSms: false,
    showRenZheng: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  /**
   * 输入手机号
   */
  phoneInput(e) {
    if (e.detail.value.length == 11) {
      this.setData({
        showSms: true
      })
    } else {
      this.setData({
        showSms: false
      })
    }
    if (this.data.sms.length > 0 && e.detail.value.length == 11) {
      this.setData({
        showRenZheng: true
      })
    } else {
      this.setData({
        showRenZheng: false
      })
    }
    this.setData({
      phone: e.detail.value
    })
  },
  /**
   * 输入验证码
   */
  smsInput(e) {
    console.log(e.detail.value)
    if (e.detail.value.length > 0 && this.data.phone.length == 11) {
      console.log("fuck")
      this.setData({
        showRenZheng: true
      })
    } else {
      this.setData({
        showRenZheng: false
      })
    }
    this.setData({
      sms: e.detail.value
    })
  },
  /**
   * 获取验证码
   */
  getSms() {
    var that = this
    if (!that.data.showSms) {
      return
    }
    if (!getApp().checkPhone(that.data.phone)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号',
        showCancel: false
      })
      return
    }
    wx.showLoading({
      title: '获取中……',
      mask: true
    })
    wx.request({
      url: getApp().appData.host + "GetMsg", //仅为示例，并非真实的接口地址
      data: {
        "mobile": that.data.phone,
        "op": "1",
        "token": getApp().md5(that.data.phone + "|1"),
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function(res) {
        console.log("获取验证码", res.data)
        //请求成功
        if (res.data.state == 1) {
          that.setData({
            isfail: false,
          })
          wx.hideLoading()

          var countdown = 60;

          function settime() {
            if (countdown == 0) {
              that.setData({
                smsText: "重新获取验证码",
                showSms: true
              })
              countdown = 60;
            } else {
              that.setData({
                smsText: "重新发送(" + countdown + ")",
                showSms: false
              })
              console.log(that.data.smsText)
              countdown--;
              setTimeout(function() {
                settime()
              }, 1000)
            }
          }
          settime();
          setTimeout(function() {
            wx.showToast({
              title: '验证码已发送',
            })
          }, 300)
        } else { //请求失败
          that.setData({
            isfail: true,
          })
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
          })
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
   * 认证
   */
  renZheng() {
    var that = this
    if (!getApp().checkPhone(that.data.phone)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号',
        showCancel: false
      })
      return
    }
    if(!that.data.sms){
      wx.showModal({
        title: '提示',
        content: '请输入验证码',
        showCancel: false
      })
      return
    }
    wx.showLoading({
      title: '认证中……',
      mask: true
    })
    wx.request({
      url: getApp().appData.host + "AuthMobile", //仅为示例，并非真实的接口地址
      data: {
        "mobile": that.data.phone,
        "code": that.data.sms,
        "token": getApp().appData.userInfo.token,
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function (res) {
        console.log("手机认证", res.data)
        //请求成功
        if (res.data.state == 1) {
          that.setData({
            isfail: false,
          })
          getApp().shuaXin.renZheng = true
          wx.hideLoading()
          setTimeout(function () {
            wx.showToast({
              title: '认证成功',
            })
          }, 300)
          wx.navigateBack({
            delta:1
          })
        } else { //请求失败
          that.setData({
            isfail: true,
          })
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
          })
        }
      },
      fail: function (res) {
        that.setData({
          isfail: true,
        })
        wx.hideLoading()
      },
      complete: function () {
        wx.stopPullDownRefresh();
      }
    })
  },
})