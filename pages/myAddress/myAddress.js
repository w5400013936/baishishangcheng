// pages/myAddresss/myAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rows: [],
    page: 0,
    choose: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.choose) {
      that.data.choose = options.choose
    }
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
    if (getApp().shuaXin.address) {
      var that = this
      that.data.page = 0
      that.request()
      getApp().shuaXin.address = false
    }
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
    var that = this
    that.data.page = 0
    that.request()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    that.data.page = that.data.page + 1
    that.request()
  },

  /**
   * 去编辑
   */
  bianJi: function (e) {
    var bean = e.currentTarget.dataset.bean;
    if (this.data.choose) {
      getApp().shuaXin.addressBean = bean
      wx.navigateBack({
        delta: 1
      })
      return
    }
    wx.navigateTo({
      url: '/pages/addAddress/addAddress?bean=' + JSON.stringify(bean),
    })
  },

  /**
   * 删除
   */
  del: function (e) {
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定删除该收货地址吗？',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中……',
            mask: true
          })
          wx.request({
            url: getApp().appData.host + "UserDel", //仅为示例，并非真实的接口地址
            data: {
              "delID": id,
              "mod": "dress",
              "token": getApp().appData.userInfo.token
            },
            header: {
              'content-type': 'application/json', // 默认值
            },
            method: 'POST',
            success: function (res) {
              console.log("删除", res.data)
              //请求成功
              if (res.data.state == 1) {
                wx.hideLoading()
                wx.showToast({
                  title: '删除成功',
                })
                that.data.rows.splice(index, 1)
                that.setData({
                  rows: that.data.rows
                })
                getApp().shuaXin.addressDel =true
              } else {//请求失败
                wx.hideLoading()
                wx.showToast({
                  title: '删除失败',
                })
              }
            },
            fail: function (res) {
              wx.hideLoading()
              wx.showToast({
                title: '请求失败',
              })
            },

          })
        } else if (res.cancel) {

        }
      }
    })
  },

  /**
   * 默认
   */
  moRen: function (e) {
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    var item = e.currentTarget.dataset.item
    var BaoCunDiZhi = new Object()
    BaoCunDiZhi.ID = item.ID
    BaoCunDiZhi.uID = getApp().appData.userInfo.ID
    BaoCunDiZhi.uName = getApp().appData.userInfo.uName
    BaoCunDiZhi.provin = item.provin
    BaoCunDiZhi.city = item.city
    BaoCunDiZhi.town = item.town
    BaoCunDiZhi.street = ""
    BaoCunDiZhi.dress = item.dress
    BaoCunDiZhi.contact = item.contact
    BaoCunDiZhi.mobile = item.mobile
    BaoCunDiZhi.token = getApp().appData.userInfo.token
    BaoCunDiZhi.zip = ""
    BaoCunDiZhi.isdefault = !item.isdefault
    wx.request({
      url: getApp().appData.host + "DressSave", //仅为示例，并非真实的接口地址
      data: {
        "json": JSON.stringify(BaoCunDiZhi),
        "token": getApp().appData.userInfo.token
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function (res) {
        console.log("修改默认", res.data)
        //请求成功
        if (res.data.state == 1) {
          // wx.hideLoading()
          that.data.page = 0
          that.request()
        } else {//请求失败      
          wx.hideLoading()
        }
      },
      fail: function (res) {
        wx.hideLoading()
      },
      complete: function () {
        wx.stopPullDownRefresh();
      }
    })
  },

  // 网络请求
  request: function () {
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
        "mod": "address",
        "plat": "1",
        "token": getApp().appData.userInfo.token
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function (res) {
        console.log("收货地址", res.data)
        //请求成功
        if (res.data.state == 1) {
          if (res.data.data) {
            if (res.data.data.length > 0) {
              Array.prototype.push.apply(that.data.rows, res.data.data[0].rows);

              that.setData({
                rows: that.data.rows,
              })
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