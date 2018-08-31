//index.js
//获取应用实例
var WxNotificationCenter = require("../../WxNotificationCenter/WxNotificationCenter.js");
var isLogin = false;
Page({
  data: {
    isfail: true,
    isAll: true,
    confirmShow: false,
    adapter: [],
    amount: 0,
    num: 0,
    viplv: 0,
  },
  onLoad: function () {
    var that = this
    if (getApp().appData.userInfo) {
      isLogin = true
    } else {
      isLogin = false
    }
    that.onRefresh()
    WxNotificationCenter.addNotification(getApp().shuaXin.gouWuChe, that.onRefresh, that)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    if (getApp().appData.userInfo) {
      that.setData({
        viplv: getApp().appData.userInfo.viplv
      })
      if (!isLogin) {
        isLogin = true
        that.onRefresh();
      }
    } else {
      if (isLogin) {
        isLogin = false
        that.onRefresh();
      }
    }
    that.getCartNum()
  },
  onUnload() {
    WxNotificationCenter.removeNotification(getApp().shuaXin.gouWuChe, this)
  },
  onPullDownRefresh(){
    this.onRefresh()
  },
  getUserInfo: function (e) {
    console.log("收到广播", e)
    var that = this
    WxNotificationCenter.removeNotification(getApp().appData.notifyUserInfo, this)
    isLogin = true
    that.onRefresh()
  },
  /**
   * 结算购物车
   */
  jieSuan: function () {
    var that = this
    if (getApp().appData.userInfo) {

    } else {
      console.log("需要登录")
      that.setData({
        confirmShow: true
      })
      WxNotificationCenter.addNotification(getApp().appData.notifyUserInfo, that.getUserInfo, that)
      return
    }
    var delID = ""
    var allData = that.data.adapter
    for (let i = 0; i < allData.length; i++) {
      if (allData[i].select) {
        delID = delID + allData[i].ID + ","
      }
    }
    if (delID.length == 0) {
      wx.showToast({
        title: '请选择结算商品',
      })
      return
    }
    delID = delID.substring(0, delID.length - 1)
    console.log("delID", delID)
    wx.navigateTo({
      url: '/pages/orderConfirm/orderConfirm?id=' + delID,
    })
  },
  /**
   * 数量输入
   */
  numInput: function (e) {
    var that = this
    var buyCount = parseInt(e.detail.value)
    if (buyCount > 0) {
      that.upDateNum(buyCount, e.currentTarget.dataset.index)
    } else {
      that.upDateNum(0, e.currentTarget.dataset.index)
    }
  },
  /**
   * 增加
   */
  add: function (e) {
    var that = this
    var num = that.data.adapter[e.currentTarget.dataset.index].buyCount + 1
    that.upDateNum(num, e.currentTarget.dataset.index)
  },
  /**
   * 减少
   */
  del: function (e) {
    var that = this
    if (that.data.adapter[e.currentTarget.dataset.index].buyCount > 1) {
      var num = that.data.adapter[e.currentTarget.dataset.index].buyCount - 1
      that.upDateNum(num, e.currentTarget.dataset.index)
    }
  },
  /**
   * 更新购物车数量
   */
  upDateNum: function (num, index) {
    var that = this
    wx.showLoading({
      title: '更新中……',
      mask: true
    })
    wx.request({
      url: getApp().appData.host + "CartFinish", //仅为示例，并非真实的接口地址
      data: {
        "parm": that.data.adapter[index].ID + "," + num,
        "token": getApp().md5(that.data.adapter[index].ID + "," + num)
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function (res) {
        console.log("更新购物车", res.data)
        //请求成功
        if (res.data.state == 1) {
          var amount = parseFloat(that.data.amount) + parseFloat(that.data.adapter[index].price) * (num - that.data.adapter[index].buyCount)
          amount = parseFloat(amount).toFixed(2)
          that.data.adapter[index].buyCount = num
          for (let i = 0; i < that.data.adapter.length; i++) {
            that.data.adapter[i].price = parseFloat(that.data.adapter[i].price).toFixed(2)
            that.data.adapter[i].oriprice = parseFloat(that.data.adapter[i].oriprice).toFixed(2)
            if (that.data.adapter[i].Pack) {
              for (let j = 0; j < that.data.adapter[i].Pack.length; j++) {
                that.data.adapter[i].Pack[j].price = parseFloat(that.data.adapter[i].Pack[j].price).toFixed(2)
              }
            }
          }
          wx.hideLoading()
          that.setData({
            isfail: false,
            adapter: that.data.adapter,
            amount: amount
          })
        } else { //请求失败
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
  /**
   * 删除购物车
   */
  delTap: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要删除该商品吗？',
      success: function (res) {
        if (res.confirm) {
          if (getApp().appData.userInfo) {
            that.shanChu(e.currentTarget.dataset.id, e.currentTarget.dataset.index)
          } else {
            that.shanChuNotLogin(e.currentTarget.dataset.id, e.currentTarget.dataset.index)
          }
        } else if (res.cancel) { }
      }
    })
  },
  /**
   * 登录删除
   */
  shanChu: function (delID, index) {
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    wx.request({
      url: getApp().appData.host + "UserDel", //仅为示例，并非真实的接口地址
      data: {
        "mod": "cart",
        "delID": delID,
        "token": getApp().appData.userInfo.token
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function (res) {
        console.log("删除购物车", res.data)
        //请求成功
        if (res.data.state == 1) {
          var amount = parseFloat(that.data.amount) - parseFloat(that.data.adapter[index].price) * that.data.adapter[index].buyCount
          amount = parseFloat(amount).toFixed(2)
          that.data.num = that.data.num - 1
          that.data.adapter.splice(index, 1)

          wx.hideLoading()
          that.setData({
            isfail: false,
            adapter: that.data.adapter,
            amount: amount,
            num: that.data.num
          })
        } else { //请求失败
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
  /**
   * 选择
   */
  xuanZe: function (e) {
    var that = this
    that.data.adapter[e.currentTarget.dataset.index].select = !that.data.adapter[e.currentTarget.dataset.index].select
    that.setData({
      adapter: that.data.adapter
    })
    that.checkAll();
  },
  /**
   * 检查是否全选
   */
  checkAll: function () {
    var that = this
    that.data.isAll = true
    that.data.num = 0
    that.data.amount = 0
    for (let i = 0; i < that.data.adapter.length; i++) {
      if (!that.data.adapter[i].select) {
        that.data.isAll = false
      } else {
        that.data.amount = that.data.adapter[i].buyCount * parseFloat(that.data.adapter[i].price) + parseFloat(that.data.amount)
        that.data.num = that.data.num + 1
      }
    }
    that.setData({
      isAll: that.data.isAll,
      num: that.data.num,
      amount: that.data.amount.toFixed(2)
    })
  },
  /**
   * 未登录删除
   */
  shanChuNotLogin: function (delID, index) {
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    wx.request({
      url: getApp().appData.host + "cartdel", //仅为示例，并非真实的接口地址
      data: {
        "parm": getApp().appData.tpuser + "|" + delID,
        "token": getApp().md5(getApp().appData.tpuser + "|" + delID)
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function (res) {
        console.log("删除购物车", res.data)
        //请求成功
        if (res.data.state == 1) {
          var amount = parseFloat(that.data.amount) - parseFloat(that.data.adapter[index].price) * that.data.adapter[index].buyCount
          amount = parseFloat(amount).toFixed(2)
          that.data.num = that.data.num - 1
          that.data.adapter.splice(index, 1)

          wx.hideLoading()
          that.setData({
            isfail: false,
            adapter: that.data.adapter,
            amount: amount,
            num: that.data.num
          })
        } else { //请求失败
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
  /**
   * 跳转商品详情
   */
  detailTap: function (e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 全选操作
   */
  quanXuan: function () {
    var that = this
    var allData = that.data.adapter
    that.data.isAll = true;
    for (let i = 0; i < allData.length; i++) {
      if (!allData[i].select) {
        that.data.isAll = false;
        break
      }
    }
    that.isAll();
  },
  isAll: function () {
    var that = this
    console.log("全选状态", that.data.isAll)
    if (that.data.isAll) {
      for (let i = 0; i < that.data.adapter.length; i++) {
        that.data.adapter[i].select = false
      }
      that.setData({
        amount: 0,
        num: 0,
        isAll: false
      })
    } else {
      that.data.amount = 0
      for (let i = 0; i < that.data.adapter.length; i++) {
        that.data.adapter[i].select = true
        that.data.amount = that.data.adapter[i].buyCount * parseFloat(that.data.adapter[i].price) + parseFloat(that.data.amount)
      }
      that.setData({
        amount: that.data.amount.toFixed(2),
        num: that.data.adapter.length,
        isAll: true
      })
    }
    that.setData({
      adapter: that.data.adapter,
    })
  },
  /**
   * 网络请求
   */
  onRefresh: function () {
    var that = this
    if (isLogin) {
      that.onRefreshLogin()
    } else {
      that.onRefreshNotLogin()
    }
  },

  /**
   * 登录获取购物车
   */
  onRefreshLogin: function () {
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
      success: function (res) {
        console.log("登录信息", res.data)
        //请求成功
        if (res.data.state == 1) {
          getApp().appData.userInfo.viplv = res.data.data.viplv
          that.setData({
            viplv: res.data.data.viplv
          })
          wx.hideLoading()
          that.setData({
            isfail: false,
          })
          wx.showLoading({
            title: '加载中……',
            mask: true
          })
          wx.request({
            url: getApp().appData.host + "GetUserList", //仅为示例，并非真实的接口地址
            data: {
              "mod": "cart",
              "parm": "",
              "token": getApp().appData.userInfo.token
            },
            header: {
              'content-type': 'application/json', // 默认值
            },
            method: 'POST',
            success: function (res) {
              console.log("购物车", res.data)
              //请求成功
              if (res.data.state == 1) {
                that.initViewData(res.data)
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
        } else { //请求失败
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
  /**
   * 未登录获取购物车数据
   */
  onRefreshNotLogin: function () {
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    wx.request({
      url: getApp().appData.host + "GetList", //仅为示例，并非真实的接口地址
      data: {
        "parm": getApp().appData.tpuser,
        "mod": "cart",
        "token": getApp().md5(getApp().appData.tpuser + "cart")
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function (res) {
        console.log("未登录购物车", res.data)
        //请求成功
        if (res.data.state == 1) {
          that.initViewData(res.data)
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

  /**
   * 设置数据
   */
  initViewData: function (gouWuChe) {
    var that = this
    var dataBeanList = gouWuChe.data
    var amount = 0;
    if (dataBeanList.length > 0) {
      for (let i = 0; i < dataBeanList.length; i++) {
        dataBeanList[i].select = true
        amount = dataBeanList[i].buyCount * parseFloat(dataBeanList[i].price) + amount
      }
      for (let i = 0; i < dataBeanList.length; i++) {
        dataBeanList[i].price = parseFloat(dataBeanList[i].price).toFixed(2)
        if (dataBeanList[i].Pack) {
          for (let j = 0; j < dataBeanList[i].Pack.length; j++) {
            dataBeanList[i].Pack[j].price = parseFloat(dataBeanList[i].Pack[j].price).toFixed(2)
          }
        }
      }
      that.setData({
        adapter: dataBeanList,
        amount: parseFloat(amount).toFixed(2),
        isAll: true,
        num: dataBeanList.length
      })
    } else {
      that.setData({
        adapter: dataBeanList
      })
    }
  },
  /**
   * 购物车数量
   */
  getCartNum() {
    var that = this
    var url = ""
    var parm = ""
    var token = ""
    var mod = "cartnum"
    console.log("tpuser", getApp().appData.tpuser)
    if (getApp().appData.userInfo) {
      url = getApp().appData.host + "GetUserList"
      token = getApp().appData.userInfo.token
    } else {
      url = getApp().appData.host + "GetList"
      parm = getApp().appData.tpuser
      token = getApp().md5(parm + mod)
    }
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      data: {
        "parm": parm,
        "mod": mod,
        "token": token
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function (res) {
        console.log("获取购物车数量", res.data)
        //请求成功
        if (res.data.state == 1) {
          var carNum = res.data.data
          if (carNum > 0 && carNum < 100) {
            wx.setTabBarBadge({
              index: 2,
              text: carNum + "",
            })
          } else if (carNum >= 100) {
            wx.setTabBarBadge({
              index: 2,
              text: "99+",
            })
          } else {
            wx.removeTabBarBadge({
              index: 2,
            })
          }
        } else { //请求失败      

        }
      },
      fail: function (res) {

      },
      complete: function () {

      }
    })
  },
})