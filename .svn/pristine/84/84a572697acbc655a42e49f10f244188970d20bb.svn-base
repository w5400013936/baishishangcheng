var token="";
var fileData = require('../../utils/md5.js');
var app = getApp().globalData;
var page = 0;
var size = 10;
var searchValue = '';
Page({
  data: {
    page:0,
    size:10,
    completeMore: false,//数据加载完
    dataNull: false, //条件筛选无结果提示
    bgImg: '/images/404small.png',

  },
  onLoad: function (option) { 
    var that = this;
    var val = option.val 
    app.val = val   
    console.log("搜索",val)
  },
  onShow: function () {
    wx.showNavigationBarLoading()//标题的加载效果
    var that = this;    
    searchValue = app.val;
    page=0;
    searchresult(that, searchValue)
  },
  linkdetail:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/detail/detail?id=" + id ,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }, 
  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function (e) {
    wx.showNavigationBarLoading()//标题的加载效果
    var that = this;
    var val = searchValue
    wx.stopPullDownRefresh();
    page = 0;    
    searchresult(that, searchValue)
  },
  // 页面上拉触底事件的处理函数
  onReachBottom: function () {
    wx.showNavigationBarLoading()//标题的加载效果
    var that = this;
    var val = searchValue;    
    page++;
    loadmore(that, val)   
     
  },
})
function searchresult(that, searchValue) {
  var mod = "itemsch",
    parm = "1|" + searchValue
    token =getApp().md5(parm+mod)
    console.log("token", parm + mod)
    console.log("token", getApp().md5(parm + mod))
  // md5(parm, mod)
  wx.request({
    url: 'https://appshi.api.stonebuy.com/mobile/GetPage',
    data: {
      parm: parm,
      page: page,
      size: size,
      mod: mod,
      token: getApp().md5(parm + mod),
    },
    success: function (res) {
      wx.hideNavigationBarLoading()//标题的加载效果 
    if (res.data.data.length == 0) {
        that.setData({
          completeMore: false,          
          dataNull: true,
        });
      }
      else {
        for(var i=0;i<res.data.data.length;i++){
          for (var j= 0;j < res.data.data[i].rows.length; j++) {
            res.data.data[i].rows[j].price = res.data.data[i].rows[j].price.toFixed(2)
          }
        }
        that.setData({
          productlist: res.data.data,
          completeMore: false,          
          dataNull: false,    
        });
      }
    if (res.data.data[0]){
      if (res.data.data[0].rows.length < 9) {
        that.setData({
          completeMore: true,
        });
      }
    }
    
    }
  })
}
function loadmore(that, val) {
  var mod = "itemsch",
    parm = "1|" + val
  // md5(parm, mod)
  wx.request({
    url: 'https://appshi.api.stonebuy.com/mobile/GetPage',
    data: {
      parm: parm,
      page: page,
      size: size,
      mod: mod,
      token: getApp().md5(parm + mod),
    },
    success: function (res) {
      wx.hideNavigationBarLoading()//标题的加载效果      
      var result = that.data.productlist;
      for (var i = 0; i < res.data.data.length; i++) {
        result.push(res.data.data[i]);
      }      
      if (res.data.data.length == 0) {
        that.setData({
          completeMore: true,
          dataNull: false,
        });
      }
      else {
        that.setData({
          productlist: result,
          completeMore: false,
          dataNull: false
        });
      } 
    }
  }) 
}
 
function md5(parm, mod) {
  var my_provin = parm + mod + "3trf6572dft565yt";
  var md5_provin = fileData.hexMD5(my_provin);
  var md5_1_provin = md5_provin.substr(0, 3);
  var md5_2_provin = md5_provin.substr(8, 3);
  var md5_3_provin = md5_provin.substr(16, 3);
  var md5_4_provin = md5_provin.substr(24, 3);
  token = md5_1_provin + md5_2_provin + md5_3_provin + md5_4_provin;
}







