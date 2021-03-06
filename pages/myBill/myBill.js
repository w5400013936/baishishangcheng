// pages/myBill/myBill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rows: [],
    page: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
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
    var that = this
    that.data.page = 0
    that.request()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this
    that.data.page = that.data.page + 1
    that.request()
  },


  // 网络请求
  request: function() {
    var that = this
    if (that.data.page == 0) {
      that.data.rows = []
    }
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    wx.request({
      url: getApp().appData.host + "GetUserPage", //仅为示例，并非真实的接口地址
      data: {
        "page": that.data.page,
        "size": 10,
        "mod": "order",
        "plat": "1",
        "parm": "pay",
        "token": getApp().appData.userInfo.token
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function(res) {
        console.log("我的账单", res.data)
        //请求成功
        if (res.data.state == 1) {
          if (res.data.data) {
            if (res.data.data.length > 0) {
              if (res.data.data[0]) {
                for (let i = 0; i < res.data.data[0].rows.length;i++){
                  res.data.data[0].rows[i].ordercoin = res.data.data[0].rows[i].ordercoin.toFixed(2)
                }
                Array.prototype.push.apply(that.data.rows, res.data.data[0].rows);
                that.setData({
                  rows: that.data.rows,
                })
              }
            } else {
              // that.setData({
              //   data: that.data.data
              // })
            }
          } else {
            // that.setData({
            //   data: that.data.data
            // })
          }

          wx.hideLoading()
          that.setData({
            isfail: false,
          })
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
})