// pages/myOrderRate/myOrderRate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starSP: 5,
    starFW: 5,
    starWL: 5,
    des: "",
    keyID: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.keyID = options.id
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
   * 商品评分
   */
  startSPTap(e) {
    this.setData({
      starSP: e.currentTarget.dataset.star
    })
  },
  /**
   * 服务评分
   */
  startFWTap(e) {
    this.setData({
      starFW: e.currentTarget.dataset.star
    })
  },
  /**
   * 物流评分
   */
  startWLTap(e) {
    this.setData({
      starWL: e.currentTarget.dataset.star
    })
  },
  /**
   * 评价输入
   */
  desInput(e) {
    this.setData({
      des: e.detail.value
    })
  },
  /**
   * 提交评价
   */
  tiJiao() {
    var that = this
    if(!that.data.des){
      wx.showToast({
        title: '请输入评价内容',
      })
      return
    }
    wx.showLoading({
      title: '提交中……',
    })
    wx.request({
      url: getApp().appData.host + "OrderDiscz", //仅为示例，并非真实的接口地址
      data: {
        "orderkey": that.data.keyID,
        "mark": that.data.des,
        "sone": that.data.starSP,
        "stwo": that.data.starFW,
        "sthree": that.data.starWL,
        "token": getApp().appData.userInfo.token
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function(res) {
        console.log(res.data)
        //请求成功
        if (res.data.state == 1) {
          wx.hideLoading()
          setTimeout(function() {
            wx.showToast({
              title: '评价成功',
            })
          }, 300)
          getApp().shuaXin.order = true
          wx.navigateBack({
            delta: 1
          })
        } else { //请求失败
          wx.hideLoading()
        }
      },
      fail: function(res) {
        wx.hideLoading()
      },

    })
  },
})