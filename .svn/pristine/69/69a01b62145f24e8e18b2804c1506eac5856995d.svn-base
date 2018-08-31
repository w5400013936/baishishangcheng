// pages/about/about.js


//index.js 
//获取应用实例 
var app = getApp().globalData;
Page({
  data: {
    tel: '4001009093',
    currentTab: 0,
  },
  onLoad: function (options) {
    var that = this;
  },
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {
    
  },

  onShareAppMessage: function () { 
    return {
      title: '百石商城',
      desc: '"百石商城致力于为广大业主提供透明、保障、省心的服务！汇集各大石材装饰公司，并有权威石材装修公司排名可供参考。',
      path: "/pages/about/about"
    }
  },
  //电话拨打
  call_tel: function (event) { 
    wx.makePhoneCall({
      phoneNumber: event.currentTarget.dataset.phone //仅为示例，并非真实的电话号码
    })
  },
  // 滑动切换tab 
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  // 点击tab切换 
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
}) 
