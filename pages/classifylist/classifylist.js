// pages/classifylist/classifylist.js
var token;
var fileData = require('../../utils/md5.js');
var token_provin;
var page = 0;
var size = 5;
var idnum;
var name;
Page({
  data: {
    completeMore: false,
    bgcolor: "",
    bgImg: '/images/graylogo2.png',
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.showNavigationBarLoading() //标题的加载效果
    loadleftmav(that)
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    that.setData({
      chuanid: 24,
    })
    if (options.idnum) {
      idnum = options.idnum
    }
  },
  onShareAppMessage: function() {
    return {
      title: name,
    }
  },
  //分类按钮点击事件
  classnamebtn: function(e) {
    var that = this;
    idnum = e.currentTarget.dataset.idnum;
    name = e.currentTarget.dataset.name;
    console.log(idnum, name)
    that.setData({
      chuanid: idnum,
    })
    wx.showNavigationBarLoading() //标题的加载效果
    smallclasslistdata(that, idnum, name) //小类的列表展示
    smallclasslistdatahot(that, idnum) // 小类热门推荐数据请求

  },
  //点击搜索框跳转到搜索页面
  searchlink: function() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  Jumpnextpage: function(e) {
    var id = e.currentTarget.dataset.id;
    var typename = e.currentTarget.dataset.typename;
    wx.navigateTo({
      url: "/pages/classifylistinto/classifylistinto?id=" + id + "&typename=" + typename,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //跳转到详情页
  linkdetail: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/detail/detail?id=" + id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

})



// 数据初始加载

function loadleftmav(that) {
  var p_parm = "",
    p_mod = "shicate";
  p_md5(p_parm, p_mod)
  wx.request({
    url: 'https://appshi.api.stonebuy.com/mobile/GetList',
    data: {
      token: token_provin,
      mod: "shicate",
    },
    success: function(res) {
      wx.hideNavigationBarLoading() //标题的加载效果 
      that.setData({
        bigclassname: res.data.data
      })
      if (idnum > 0) {
        smallclasslistdata(that, idnum) //小类的列表展示
        smallclasslistdatahot(that, idnum) // 小类热门推荐数据请求
      } else {
        for (var i = 0; i < res.data.data.length; i++) {
          var PID = res.data.data[i].PID
          var ID = res.data.data[i].ID
          if (PID > 0) {
            idnum = res.data.data[i].ID;
            console.log(res.data.data[i])
            name = res.data.data[i].serName
            loadsmalllisttitle(i, idnum)
            break
          }
        }
      }

      //初始化默认状态下的数据
      function loadsmalllisttitle(i, idnum) {
        if (res.data.data[i].ID) {
          that.setData({
            idnum: idnum,
            smalllisttitle: res.data.data[i].serName
          })
          smallclasslistdata(that, idnum) //小类的列表展示
          smallclasslistdatahot(that, idnum) // 小类热门推荐数据请求
        }
      }

    }
  })
}
// 小类热门推荐数据请求
function smallclasslistdatahot(that, idnum) {
  var p_parm = "smallserID|" + idnum,
    p_mod = "itemtop";
  p_md5(p_parm, p_mod)
  wx.request({
    url: 'https://appshi.api.stonebuy.com/mobile/GetPage',
    data: {
      parm: p_parm,
      token: token_provin,
      mod: "itemtop",
      page: page,
      size: size,
    },
    success: function(res) {
      wx.hideNavigationBarLoading() //标题的加载效果
      that.setData({
        hotlist: res.data.data,
      })
    }
  })
}
//小类的列表展示
function smallclasslistdata(that, idnum, name) {
  var parm = "smallserID|" + idnum,
    mod = "itemcate";
  md5(parm, mod)
  wx.request({
    url: 'https://appshi.api.stonebuy.com/mobile/GetPage',
    data: {
      parm: parm,
      token: token,
      mod: "itemcate",
      page: page,
      size: 6,
    },
    success: function(res) {
      wx.hideNavigationBarLoading() //标题的加载效果    
      that.setData({
        smallclasslist: res.data.data,
        idnum: idnum,
        smalllisttitle: name
      })
    }
  })
}

function p_md5(p_parm, p_mod) {
  var my_provin = p_parm + p_mod + "3trf6572dft565yt";
  var md5_provin = fileData.hexMD5(my_provin);
  var md5_1_provin = md5_provin.substr(0, 3);
  var md5_2_provin = md5_provin.substr(8, 3);
  var md5_3_provin = md5_provin.substr(16, 3);
  var md5_4_provin = md5_provin.substr(24, 3);
  token_provin = md5_1_provin + md5_2_provin + md5_3_provin + md5_4_provin;
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