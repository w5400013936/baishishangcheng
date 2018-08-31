// pages/classifylistinto/classifylistinto.js
var token="";
var fileData = require('../../utils/md5.js');
var page = 0;
var size = 10;
var parm="";
var name="";
var idnum="";
var app = getApp().globalData;
var colorid=0;
var bidid="";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    size: 10,
    fixedbg: false,
    poptype:false,
    popcolor:false,
    dataNull:false,
    typename:"产品类型",
    typecolor:"颜色", 
    bgImg: '/images/404small.png',
    colorid:"0",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showNavigationBarLoading()//标题的加载效果
    name = options.typename
    idnum = options.id
    app.idnum = options.id 
    // parm = "smallserID|" + idnum; 
    app.colorid=0;
    page=0;
    that.setData({
      idnum: options.id, 
      typename: options.typename,
    })
    loadleftmav(that, name, idnum)
    loadcolor(that) 
    // bidid = options.bidid;
    app.bidid = options.bidid;    
    colorid=0;
    if (app.bidid){
      var parm = "serID|" + idnum + "," + "color|" + colorid
    }
    else{
      var parm = "smallserID|" + idnum + "," + "color|" + colorid  
    }
    smallclasslistdata(that, idnum, name, page, parm)
    wx.setNavigationBarTitle({
      title: '全部产品'
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { 
    wx.showNavigationBarLoading()//标题的加载效果
    var that = this;
    idnum = app.idnum
    page = 0;
    colorid = app.colorid;
    // bidid = app.bidid;
    wx.stopPullDownRefresh();
    if (app.bidid) {
      var parm = "serID|" + idnum + "," + "color|" + colorid
    }
    else {
      var parm = "smallserID|" + idnum + "," + "color|" + colorid
    }
    smallclasslistdata(that, idnum, name, page, parm)

  },
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {  
    wx.showNavigationBarLoading()//标题的加载效果       
    var that = this;
    page++;
    // bidid = app.bidid;
    if (app.bidid) {
      var parm = "serID|" + app.idnum + "," + "color|" + app.colorid
    }
    else{
      var parm = "smallserID|" + app.idnum + "," + "color|" + app.colorid
    }    
    loadmore(that, parm)
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var id = app.idnum
    return {
      title: '百石商城',
      desc: '"百石商城致力于为广大业主提供透明、保障、省心的服务！汇集各大石材装饰公司，并有权威石材装修公司排名可供参考。',
      path: "/pages/index/index"
    }
  },
  //跳转到详情页
  linkdetail: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/detail/detail?id=" + id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 产品类型选框打开
  tapMainMenu_type:function(){
    var that = this;
    that.setData({
      fixedbg: true,
      poptype: true,
      popcolor: false,
    })
  },
  // 颜色选框打开
  tapMainMenu_color:function(){
    var that = this;
    that.setData({
      fixedbg: true,
      popcolor: true,
      poptype: false,
      
    })
  },
  // 选择小类，数据刷新
  changesmallclass: function (e) {
    wx.showNavigationBarLoading()//标题的加载效果
    var that = this;
    var name = e.currentTarget.dataset.name;
    var idnum = e.currentTarget.dataset.idnum;
    that.setData({
      typename: name,
      idnum: idnum,
      fixedbg: false,
      poptype: false,
      typecolor:"颜色",
      colorid:0,
      productlist: "", 
    }) 
    app.idnum = idnum;
    page=0;
    app.colorid=0;
    colorid=0;
    app.bidid = undefined;
    var parm = "smallserID|" + idnum + "," + "color|" + colorid  
    
    smallclasslistdata(that, idnum, name, page, parm)
   
  }, 
  //颜色选择
  changecolor:function(e){
    wx.showNavigationBarLoading()//标题的加载效果
    var that = this;
    var name = e.currentTarget.dataset.name;
    var colorid = e.currentTarget.dataset.id;
    app.colorid = colorid;
    idnum = app.idnum;
    that.setData({
      typecolor: name,
      colorid: colorid,
      fixedbg: false,
      popcolor: false,
      productlist: "", 
      completeMore: false,    
      dataNull:false ,    
    }) 
    page=0;
    // bidid = app.bidid;
    if (app.bidid) {
      var parm = "serID|" + app.idnum + "," + "color|" + colorid
    }
    else {
      var parm = "smallserID|" + app.idnum + "," + "color|" + colorid
    }     
    smallclasslistdata(that, idnum, name, page, parm)
  },
//关闭弹窗
  closepop:function(){
    var that = this;    
    that.setData({
      fixedbg: false,
      poptype: false,
      popcolor: false,      
    }) 
  },  

})
//默认加载分类导航
function loadleftmav(that, name, idnum) {
  var parm = "",
      mod = "shicate";
      md5(parm, mod)
  wx.request({
    url: 'https://appshi.api.stonebuy.com/mobile/GetList',
    data: {
      token: token,
      mod: "shicate",
    },
    success: function (res) { 
      that.setData({
        bigclassname: res.data.data,
        typename:name,
        idnum: idnum
      })  

    }
  })
} 
function loadcolor(that){
  var parm = "",
      mod = "color";
      md5(parm, mod) 
  wx.request({
    url: 'https://appshi.api.stonebuy.com/mobile/GetList',
    data: {
      token: token,
      mod: mod,
    },
    success: function (res) {
      that.setData({
        colorname: res.data.data 
      })

    }
  })
}
//小类的列表展示
function smallclasslistdata(that, idnum, name, page, parm) {   
   var mod = "itemcolor";
      md5(parm, mod)
  wx.request({
    url: 'https://appshi.api.stonebuy.com/mobile/GetPage',
    data: {
      parm: parm,
      token: token,
      mod: mod,
      page: page,
      size: size,
    },
    success: function (res) { 
      wx.hideNavigationBarLoading()//标题的加载效果
      if (res.data.data.length == 0) { 
        that.setData({
          dataNull: true,
          completeMore:false,
          productlist:"",
        })
      }
      else {
        that.setData({
          productlist: res.data.data,
          idnum: idnum,
          smalllisttitle: name,
          dataNull: false,          
        })

      }

    }
  }) 
}

// 分类加载更多
function loadmore(that, parm){  
  var  mod = "itemcolor";
      md5(parm, mod)
  wx.request({
    url: 'https://appshi.api.stonebuy.com/mobile/GetPage',
    data: {
      parm: parm,
      token: token,
      mod: mod,
      page: page,
      size: size,
    },
    success: function (res) 
    {       
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