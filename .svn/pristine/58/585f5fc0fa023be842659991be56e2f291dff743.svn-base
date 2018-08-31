var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
var fileData = require('../../utils/md5.js');
var sdata = require('../../utils/data.js');
var page = 0;
var size = 10;
var val = "";
var token = "";
var WxNotificationCenter = require("../../WxNotificationCenter/WxNotificationCenter.js");
Page({
  data: {
    currents: 1,
    bgImg: '/images/big404.png',
    inimg: "/images/introduce.png",
    zpimg: "/images/zheng.png",
    dagou: "/images/gagou.png",
    flag: "",
    stalist: [],
    tel: '4001009093',
    headernav: sdata.detailnav(),
    toView: 'inToView1',
    change: 1,
    commentid: 1,
    morecomment: false, //更多评论
    commenttext: '没有更多评论了~',
    gd_show: true, //规格数量
    fixedbg: false,
    download: false,
    maskShow: false,
    packageShow: false,
    isPic: false,
    picCar: "",
    oaCount: 0,
    unit: "片",
    num: 1,
    pert: "",
    islive: false,
    confirmShow: false,
    packBeanList: [],
    packItem: [],
    taoCan: "",
    packBean: "",
    taoCanNum: 1,
    isCollect: false,
    sid: 0,
    carNum: 0,
    priceX: "",
    isTip: false,
    isTipX: false,
    showHome: false,
  },
  onLoad: function (options) {
    var that = this;
    val = options.id //外面带进来的产品的id
    if (options.sid) {
      that.data.sid = options.sid
    }
    app.val = val
    if (options.islive) {
      that.data.islive = options.islive
    }
    if(options.show){
      that.setData({
        showHome:options.show
      })
    }
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          w: res.windowWidth,
          h: res.windowHeight,
          sh: res.windowHeight - 50
        })
      }
    })
    wx.showNavigationBarLoading() //标题的加载效果
    var parm = "ID|" + val
    info(that, parm)
    var parm = "itemID|" + val;
    app.parm = parm
    commentlist(that, parm)
    WxNotificationCenter.addNotification(getApp().shuaXin.gouWuChe, that.getCartNum, that)
  },
  onShow() {
    var that = this
    if (getApp().appData.userInfo) {
      that.checkCollect()
    } else {
      that.setData({
        isCollect: false
      })
    }
    that.getCartNum()
  },
  onUnload() {
    WxNotificationCenter.removeNotification(getApp().shuaXin.gouWuChe, this)
  },
  /**
   * 跳转主页
   */
  home(){
    wx.switchTab({
      url: '/pages/index/index',
    })
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
    console.log("tpuserDetail", getApp().appData.tpuser)
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
          that.setData({
            carNum: res.data.data
          })
        } else { //请求失败      

        }
      },
      fail: function (res) {

      },
      complete: function () {

      }
    })
  },
  bannerswiper: function (e) {
    var that = this;
    that.setData({
      currents: e.detail.current + 1,
    })
  },
  /**
   * 跳转购物车
   */
  carTap() {
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },
  /**
   * 检查关注
   */
  checkCollect() {
    var that = this
    wx.request({
      url: getApp().appData.host + "GetOne", //仅为示例，并非真实的接口地址
      data: {
        "parm": "uid|" + getApp().appData.userInfo.ID + ",itemID|" + val,
        "mod": "collect",
        "token": getApp().md5("uid|" + getApp().appData.userInfo.ID + ",itemID|" + val + "collect")
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function (res) {
        console.log("获取收藏", res.data)
        //请求成功
        if (res.data.state == 1) {
          that.setData({
            isCollect: true
          })
        } else { //请求失败      
          that.setData({
            isCollect: false
          })
        }
      },
      fail: function (res) {

      },
      complete: function () {

      }
    })
  },
  /**
   * 关注
   */
  guanZhu() {
    var that = this
    if (getApp().appData.userInfo) {

    } else {
      console.log("需要登录")
      that.setData({
        confirmShow: true
      })
      return
    }
    if (that.data.isCollect) {
      wx.showLoading({
        title: '加载中……',
        mask: true
      })
      wx.request({
        url: getApp().appData.host + "UserDel", //仅为示例，并非真实的接口地址
        data: {
          "delID": val,
          "mod": "collect",
          "token": getApp().appData.userInfo.token
        },
        header: {
          'content-type': 'application/json', // 默认值
        },
        method: 'POST',
        success: function (res) {
          console.log("取消关注", res.data)
          //请求成功
          if (res.data.state == 1) {
            wx.hideLoading()
            setTimeout(function () {
              wx.showToast({
                title: '取消关注',
              })
            }, 300)
            that.setData({
              isCollect: false
            })
          } else { //请求失败      
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
    } else {
      wx.showLoading({
        title: '加载中……',
        mask: true
      })
      wx.request({
        url: getApp().appData.host + "Collect", //仅为示例，并非真实的接口地址
        data: {
          "item": val,
          "token": getApp().appData.userInfo.token
        },
        header: {
          'content-type': 'application/json', // 默认值
        },
        method: 'POST',
        success: function (res) {
          console.log("关注", res.data)
          //请求成功
          if (res.data.state == 1) {
            wx.hideLoading()
            setTimeout(function () {
              wx.showToast({
                title: '关注成功',
              })
            }, 300)
            that.setData({
              isCollect: true
            })
          } else { //请求失败      
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
    }
  },
  /**
   * 立即购买
   */
  buyNow: function () {
    this.buy(true)
  },
  /**
   * 加入购物车
   */
  addCar() {
    this.buy(false)
  },

  /**
   * 套餐数量输入
   */
  taoCanNumInput: function (e) {
    var that = this
    if (e.detail.value) {
      that.setData({
        taoCanNum: parseInt(e.detail.value)
      })
    } else {
      that.data.taoCanNum = 0
    }
  },
  /**
   * 商品数量输入
   */
  numInput: function (e) {
    var that = this
    if (e.detail.value) {
      that.setData({
        num: parseInt(e.detail.value)
      })
    } else {
      that.data.num = 0
    }
  },
  /**
   * 套餐加入购物车
   */
  addCarTaoCan: function () {
    var that = this
    if (that.data.taoCanNum > 0) {

    } else {
      wx.showToast({
        title: '数量必须大于0',
      })
      return
    }
    if (getApp().appData.userInfo) {

    } else {
      console.log("需要登录")
      that.setData({
        confirmShow: true
      })
      return
    }
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    var islogin = false
    var token = ""
    if (getApp().appData.userInfo) {
      islogin = true
      token = getApp().appData.userInfo.token
    } else {
      token = getApp().md5(val + "|" + that.data.pert + "|" + that.data.num + "|" + isBuy + "|" + getApp().appData.tpuser + "|" + islogin)
    }
    wx.request({
      url: getApp().appData.host + "CartPackAge", //仅为示例，并非真实的接口地址
      data: {
        "packkey": that.data.taoCan.keyID,
        "ct": that.data.taoCanNum,
        "tpuser": getApp().appData.tpuser,
        "islogin": islogin,
        "token": token
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function (res) {
        console.log("套餐加入购物车", res.data)
        //请求成功
        if (res.data.state == 1) {
          wx.hideLoading()
          that.setData({
            maskShow: false,
            packageShow: false,
          })
          setTimeout(function () {
            wx.showToast({
              title: '加入购物车成功',
            })
          }, 300)
          WxNotificationCenter.postNotificationName(getApp().shuaXin.gouWuChe);
        } else { //请求失败      
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
  /**
   * 减
   */
  delTaoCan: function () {
    if (this.data.taoCanNum > 1) {
      this.setData({
        taoCanNum: this.data.taoCanNum - 1
      })
    }
  },
  /**
   * 加
   */
  addTaoCan: function () {
    this.setData({
      taoCanNum: this.data.taoCanNum + 1
    })
  },
  /**
   * 减
   */
  del: function () {
    if (this.data.num > 1) {
      this.setData({
        num: this.data.num - 1
      })
    }
  },
  /**
   * 加
   */
  add: function () {
    this.setData({
      num: this.data.num + 1
    })
  },
  //选择规格
  onSpecification: function (event) {
    var that = this;
    var index = event.currentTarget.dataset.index;
    var a = that.data.stalist;
    if (a != null) {

      for (var i = 0; i < a.length; i++) {
        var obj = a[i];
        obj['flag'] = false;
      }

      var obj = a[index];
      if (obj != null) {
        obj['flag'] = true;
      }
    }
    if (that.data.isPic) {
      that.setData({
        picCar: event.currentTarget.dataset.pic,
      })
    }
    var isTip = false
    if (that.data.isTipX && event.currentTarget.dataset.tipprice != event.currentTarget.dataset.price) {
      that.data.price = event.currentTarget.dataset.tipprice.toFixed(2)
      that.data.priceX = event.currentTarget.dataset.price.toFixed(2)
      isTip = true
    } else {
      isTip = false
      that.data.price = event.currentTarget.dataset.price.toFixed(2)
    }
    that.setData({
      stalist: a,
      price: that.data.price,
      priceX: that.data.priceX,
      flag: !event.currentTarget.dataset.flag,
      unit: event.currentTarget.dataset.unit,
      oaCount: event.currentTarget.dataset.oacount,
      unit: event.currentTarget.dataset.unit,
      pert: event.currentTarget.dataset.pert,
    })
  },
  //联系客服
  makePhoneCall: function (event) {
    wx.makePhoneCall({
      phoneNumber: event.currentTarget.dataset.phone
    })
  },
  // 加入购物车
  addtocart: function (e) {
    this.setData({
      fixedbg: true,
      download: true,
    })
  },
  closepop: function () {
    this.setData({
      fixedbg: false,
      download: false,
    })
  },

  choosePackage: function (e) {
    var that = this
    if (that.data.packBeanList.length > 0) {
      for (let i = 0; i < that.data.packBeanList.length; i++) {
        that.data.packBeanList[i].select = false
      }
      that.data.packBean = that.data.packBeanList[e.currentTarget.dataset.index]
      that.data.packBeanList[e.currentTarget.dataset.index].select = true
      that.setData({
        packBean: that.data.packBean,
        packBeanList: that.data.packBeanList
      })
    }
    that.getTaoCao()

  },
  /**
   * 获取套餐
   */
  getTaoCao: function () {
    var that = this

    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    wx.request({
      url: getApp().appData.host + "GetOne", //仅为示例，并非真实的接口地址
      data: {
        "mod": "package",
        "parm": "ID|" + that.data.packBean.ID,
        "token": getApp().md5("ID|" + that.data.packBean.ID + "package")
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function (res) {
        console.log("套餐", res.data)
        //请求成功
        if (res.data.state == 1) {
          var packItem = res.data.data.PackItem
          for (let i = 0; i < packItem.length; i++) {
            packItem[i].last = false
          }
          res.data.data.price = res.data.data.price.toFixed(2)
          packItem[packItem.length - 1].last = true
          wx.hideLoading()
          that.setData({
            taoCan: res.data.data,
            packItem: packItem
          })

          that.setData({
            maskShow: true,
            packageShow: true,
          })
        } else { //请求失败
          that.setData({

          })
          wx.hideLoading()
        }
      },
      fail: function (res) {
        that.setData({

        })
        wx.hideLoading()
      },
      complete: function () {
        wx.stopPullDownRefresh();
      }
    })

  },

  closePackagePop: function () {
    this.setData({
      maskShow: false,
      packageShow: false,
    })
  },
  // 切换
  headernav: function (e) {
    var _id = e.currentTarget.dataset.id;
    var show = e.currentTarget.dataset.show;
    this.setData({
      toView: 'inToView' + _id,
      change: _id,
    })
  },
  refresh: function () {
    var that = this;
  },
  loadMore: function () {
    wx.showNavigationBarLoading() //标题的加载效果
    var that = this;
    var parm = app.parm;
    page++;
    morecomment(that, parm)
  },
  clickcomment: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    page = 0;
    that.setData({
      morecomment: false, //更多评论
    });
    var val = app.val;
    if (id == 1) {
      var parm = "itemID|" + val;
      app.parm = parm;
      that.setData({
        commentid: 1
      });
    }
    if (id == 2) {
      var parm = "itemID|" + val + ",score|else>3"
      app.parm = parm;
      that.setData({
        commentid: 2
      });
    }
    if (id == 3) {
      var parm = "itemID|" + val + ",score|3"
      app.parm = parm;
      that.setData({
        commentid: 3
      });
    } else if (id == 4) {
      var parm = "itemID|" + val + ",score|else<3"
      app.parm = parm;
      that.setData({
        commentid: 4
      });
    }
    commentlist(that, parm)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this
    return {
      title: this.data.detailname,
      path: "/pages/detail/detail?id=" + app.val + "&show=true"
    }
  },
  buy: function (isBuy) {
    var that = this
    if (that.data.num > 0) {

    } else {
      wx.showToast({
        title: '数量必须大于0',
      })
      return
    }
    if (isBuy) {
      if (getApp().appData.userInfo) {

      } else {
        console.log("需要登录")
        that.setData({
          confirmShow: true
        })
        return
      }
    }
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    var islogin = false
    var token = ""
    if (getApp().appData.userInfo) {
      islogin = true
      token = getApp().appData.userInfo.token
    } else {
      token = getApp().md5(val + "|" + that.data.pert + "|" + that.data.num + "|" + isBuy + "|" + getApp().appData.tpuser + "|" + islogin)
    }
    wx.request({
      url: getApp().appData.host + "CartAdd", //仅为示例，并非真实的接口地址
      data: {
        "item": val,
        "pert": that.data.pert,
        "ct": that.data.num,
        "isbuy": isBuy,
        "tpuser": getApp().appData.tpuser,
        "islogin": islogin,
        "islive": that.data.islive,
        "token": token
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function (res) {
        console.log("加入购物车", res.data)
        //请求成功
        if (res.data.state == 1) {
          wx.hideLoading()
          that.setData({
            fixedbg: false,
            download: false,
          })
          if (isBuy) {
            wx.navigateTo({
              url: '/pages/orderConfirm/orderConfirm?id=' + res.data.data.ID,
            })
          } else {
            setTimeout(function () {
              wx.showToast({
                title: '加入购物车成功',
              })
            }, 300)
          }
          WxNotificationCenter.postNotificationName(getApp().shuaXin.gouWuChe);
        } else { //请求失败      
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
})
//图片滚动展示
function info(that, parm) {
  var mod = "item";
  md5(parm, mod)
  wx.request({
    url: 'https://appshi.api.stonebuy.com/mobile/GetOne',
    data: {
      parm: parm,
      mod: mod,
      token: token,
    },
    method: 'post',
    success: function (res) {
      wx.hideNavigationBarLoading(); //隐藏标题的加载效果
      var Perty = res.data.data.Perty;
      var article_content = res.data.data.Tail.itemIntro
      // var article_content = res.data.data.Tail.itemIntro.replace(/shi.cn/g,'stoneo2o.com');
      var disGood = res.data.data.disGood;
      var disCount = res.data.data.disCount;
      var praise = parseInt(disGood / disCount * 100)
      for (var i = 0; i < Perty.length; i++) {
        var obj = Perty[i];
        if (that.data.sid == 0) {
          if (i == 0) {
            var isTip = false
            console.log(obj)
            if (res.data.data.istip && obj.tipprice != obj.price) {
              that.data.price = obj.tipprice.toFixed(2)
              that.data.priceX = obj.price.toFixed(2)
              isTip = true
            } else {
              isTip = false
              that.data.price = obj.price.toFixed(2)
            }
            obj['flag'] = true;
            that.setData({
              price: that.data.price, //产品价格
              priceX: that.data.priceX, //产品价格
              isTip: isTip,
              isTipX: res.data.data.istip,
              picCar: res.data.data.dir + res.data.data.imgName,
              oaCount: obj.oaCount,
              pert: obj.ID,
              unit: obj.unit,
            });
          } else {
            obj['flag'] = false;
          }
        } else {
          if (that.data.sid == Perty[i].ID) {
            var isTip = false
            if (res.data.data.istip && obj.tipprice != obj.price) {
              that.data.price = obj.tipprice.toFixed(2)
              that.data.priceX = obj.price.toFixed(2)
              isTip = true
            } else {
              isTip = false
              that.data.price = obj.price.toFixed(2)
            }
            obj['flag'] = true;
            that.setData({
              price: that.data.price, //产品价格
              priceX: that.data.priceX, //产品价格
              isTip: isTip,
              isTipX: res.data.data.istip,
              picCar: res.data.data.dir + res.data.data.imgName,
              oaCount: obj.oaCount,
              pert: obj.ID,
              unit: obj.unit,
            });
          } else {
            obj['flag'] = false;
          }
        }

      }
      if (!praise) {
        //判断是否有评论数 
        that.setData({
          praise: "0",
        })
      } else {
        that.setData({
          praise: praise,
        })
      }
      if (res.data.data.Perty[0].perValue == "") {
        // console.log("null")
        that.setData({
          gd_show: false,
        })
      }
      that.setData({
        detailname: res.data.data.itemName, //产品名称
        stalist: res.data.data.Perty, //产品规格
        article_content: WxParse.wxParse('article_content', 'html', article_content, that, 5),
        disBad: res.data.data.disBad,
        disCount: res.data.data.disCount,
        disGood: res.data.data.disGood,
        disMidd: res.data.data.disMidd,
        placeprvName: res.data.data.prvName,
        placecityName: res.data.data.cityName,
        isPic: res.data.data.isPic,
        packBeanList: res.data.data.Pack
      })
      if (res.data.data.Pic.length) {
        that.setData({
          banner: res.data.data.Pic,
          bannerlength: res.data.data.Pic.length,
        })
      }
    },
    // fail:function(res){
    //   console.log(res.errMsg)
    // }

  })
}


function commentlist(that, parm) {
  var mod = "itemdis";
  md5(parm, mod)
  wx.request({
    url: 'https://appshi.api.stonebuy.com/mobile/GetPage',
    data: {
      parm: parm,
      mod: mod,
      token: token,
      page: 0,
      size: size,
    },
    success: function (res) {
      if (res.data.data[0]) {
        that.setData({
          commentlist: res.data.data[0].rows,
        })
      } else {
        if (that.data.commentlist) {
          if (that.data.commentlist.length > 10) {
            that.setData({
              morecomment: true,
              commentlist: "",
            })
          } else {
            that.setData({
              morecomment: false,
              commentlist: "",
            })
          }
        } else {
          that.setData({
            morecomment: false,
            commentlist: "",
          })
        }
      }

    }
  })
}

function morecomment(that, parm) {
  var mod = "itemdis";
  md5(parm, mod)
  wx.request({
    url: 'https://appshi.api.stonebuy.com/mobile/GetPage',
    data: {
      parm: parm,
      mod: mod,
      token: token,
      page: page,
      size: size,
    },
    success: function (res) {
      var result = that.data.commentlist;
      if (res.data.data[0]) {
        for (var i = 0; i < res.data.data[0].rows.length; i++) {
          result.push(res.data.data[0].rows[i]);
        }
        that.setData({
          commentlist: result,
        })
      } else {
        if (that.data.commentlist) {
          if (that.data.commentlist.length > 10) {
            that.setData({
              morecomment: true
            })
          } else {
            that.setData({
              morecomment: false
            })
          }
        } else {
          that.setData({
            morecomment: false
          })
        }

      }
      wx.hideNavigationBarLoading() //标题的加载效果
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