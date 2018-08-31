// pages/invoice/invoice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifyList: [
      { index: 0, name: '不开发票', select: true },
      { index: 1, name: '商品类别', select: false },
    ],
    faPiao: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log("发票", options.faPiao)
    that.setData({
      faPiao: JSON.parse(options.faPiao)
    })
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

  /**
   * 识别号输入
   */
  invcodeInput:function(e){
    var that = this
    that.data.faPiao.invcode = e.detail.value
    that.setData({
      faPiao: that.data.faPiao,
    })
  },
  /**
   * 发票抬头输入
   */
  invnameInput: function (e) {
    console.log(e.detail.value)
    var that = this
    that.data.faPiao.invname = e.detail.value
    that.setData({
      faPiao: that.data.faPiao
    })
  },
  /**
   * 提交按钮
   */
  sure: function () {
    var that = this
    var faPiao = that.data.faPiao
    if (faPiao.kp == 1) {
      if (faPiao.gs == 0) {
        if (!faPiao.invname){
            wx.showToast({
              title: '请输入个人发票抬头',
            })
            return
        }
      }else{
        if (!faPiao.invname) {
          wx.showToast({
            title: '请输入单位名称',
          })
          return
        }
        if (!faPiao.invcode) {
          wx.showToast({
            title: '请输入纳税人识别号',
          })
          return
        }
      }
    }
    getApp().shuaXin.faPiao = that.data.faPiao
    wx.navigateBack({
      delta: 1
    })
  },

  taiTouTap: function (e) {
    var that = this
    that.data.faPiao.gs = e.currentTarget.dataset.gs
    that.setData({
      faPiao: that.data.faPiao
    })
  },

  handleClassifyChange: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index;
    var select = e.currentTarget.dataset.select;
    var classifyList = this.data.classifyList;
    if (!select) {
      classifyList.forEach(function (item, key) {
        if (index == key) {
          item.select = true
          that.data.faPiao.kp = index
          that.setData({
            faPiao: that.data.faPiao
          })
        }
        else {
          item.select = false;
        }
      })
      this.setData({
        classifyList: classifyList
      })
    }
  }
})