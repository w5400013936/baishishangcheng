// pages/myBillDetail/myBillDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isfail:true,
    keyID:"",
    data:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("keyID",options.keyid)
    var that = this
    that.data.keyID = options.keyid
    that.request()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  // 网络请求
  request: function () {
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    wx.request({
      url: getApp().appData.host + "UserGetOne", //仅为示例，并非真实的接口地址
      data: {
        "mod": "order",
        "parm": "keyID|"+that.data.keyID,
        "token": getApp().appData.userInfo.token
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function (res) {
        console.log("我的账单", res.data)
        //请求成功
        if (res.data.state == 1) {
          res.data.data.ordercoin = res.data.data.ordercoin.toFixed(2)
          that.setData({
            data: res.data.data
          })

          wx.hideLoading()
          that.setData({
            isfail: false,
          })
        } else {//请求失败
          that.setData({
            isfail: true,
          })
          wx.hideLoading()
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