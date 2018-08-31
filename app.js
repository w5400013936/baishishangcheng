//app.js
var WXBizDataCrypt = require('utils/RdWXBizDataCrypt.js');
var fileData = require('utils/md5.js');
var md5utf = require('utils/md5utf-8.js');
var WxNotificationCenter = require("WxNotificationCenter/WxNotificationCenter.js");
App({
  globalData: {
    Hisrecords: "", //搜索记录
    idnum: "", //小分类的id
    colorid: "",
    bidid: "",
    val: "", //搜索框输入的值
    parm: "",
    typename: "", //小分类的名称
  },
  appData: {
    host: "https://appshi.api.stonebuy.com/mobile/",
    // host: "http://192.168.18.166:4369/mobile/",
    userInfo: "",
    userInfoX: "",
    notifyUserInfo: "notifyUserInfo",
    appid: "wxe9e7dbf1e54d9f26",
    secret: "bd32ec5c74f681a135e1e773f3be4873",
    tpuser: "",
    SECRET: "3trf6572dft565yt",
  },
  shuaXin: {
    order: false,
    address: false,
    addressDel: false,
    car: false,
    addressBean: "",
    faPiao: "",
    guanBiZhiFu: "guanBiZhiFu",
    gouWuChe: "gouWuChe",
    renZheng:false,
    youHuiQuan:"youHuiQuan",
  },
  acache: {
    tpuser: "tpuser",
    userInfo: "userInfo",
    userInfoX: "userInfoX",
  },
  onLaunch: function() {
    var that = this;
    try {
      var res = wx.getStorageSync(that.acache.tpuser)
      console.log(res)
      if(res){
        that.appData.tpuser = res
      }else{
        that.appData.tpuser = Date.parse(new Date()) + "";
        wx.setStorageSync(that.acache.tpuser, that.appData.tpuser)
      }
    } catch (e) {
      // Do something when catch error
    }
    that.appData.userInfo = wx.getStorageSync(that.acache.userInfo)
    // wx.getStorage({
    //   key: that.acache.userInfo,
    //   success: function(res) {
    //     that.appData.userInfo = res.data
    //   },
    //   fail: function(res) {

    //   }
    // })

  },
  // lazy loading openid
  getUserOpenId: function(callback) {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        if (res.data) {
          that.appData.userInfo = res.data.userInfo
        } else {
          that.wxLogin()
        }
      },
      fail: function() {
        console.log("取出失败")
        that.wxLogin()
      },
    })
  },
  wxLogin: function(detail) {
    var that = this
    wx.login({
      success: function(res) {
        console.log("微信登录成功")
        console.log(res)
        if (res.code) {
          var code = res.code
          console.log("有code" + code)

          wx.request({
            // url: "https://api.weixin.qq.com/sns/jscode2session?appid=" + that.appData.appid + "&secret=" + that.appData.secret + "&js_code=" + code + "&grant_type=authorization_code", //仅为示例，并非真实的接口地址
            url: that.appData.host + "Xcx_GetUnoin",
            data: {
              jscode: code
            },
            header: {
              'content-type': 'application/json', // 默认值
            },
            method: 'POST',
            success: function(res) {
              console.log("codeqingqiu", res.data)
              var pc = new WXBizDataCrypt(that.appData.appid, res.data.session_key)
              var data = pc.decryptData(detail.encryptedData, detail.iv)
              console.log('解密后 data: ', data)
              wx.showLoading({
                title: '',
                mask: true
              })
              var openid = data.openId
              wx.request({
                url: getApp().appData.host + "GetUser", //仅为示例，并非真实的接口地址                
                data: {
                  "openid": data.openId,
                  "nick": data.nickName,
                  "unionid": data.unionId,
                  "type": "1",
                  "tpuser": that.appData.tpuser,
                  "plat": "1",
                  "rtype": "4",
                  "token": that.md5((data.openId + "|" +
                    data.unionId + "|" +
                    "1" + "|" +
                    "1" + "|" +
                    that.appData.tpuser).toLowerCase())
                },
                header: {
                  'content-type': 'application/json', // 默认值
                },
                method: 'POST',
                success: function (res) {
                  console.log("登录返回", res.data)
                  //请求成功
                  if (res.data.state == 1) {
                    res.data.data.openid = openid
                    wx.setStorage({
                      key: that.acache.userInfo,
                      data: res.data.data,
                    })
                    that.appData.userInfo = res.data.data
                    WxNotificationCenter.postNotificationName(getApp().appData.notifyUserInfo, JSON.stringify(detail.userInfo));
                    wx.hideLoading()
                  } else { //请求失败
                    wx.hideLoading()
                  }
                },
                fail: function (res) {
                  // that.setData({
                  //   isfail: true,
                  // })
                  wx.hideLoading()
                }
              })
            },
            fail: function(res) {
              console.log("shibai")
              console.log(res.data)
              wx.showToast({
                title: '网络请求失败',
              })
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      },
    });
  },
  md5: function(str) {
    var my_provin = str + this.appData.SECRET;
    var md5_provin = md5utf.md5(my_provin);
    var md5_1_provin = md5_provin.substr(0, 3);
    var md5_2_provin = md5_provin.substr(8, 3);
    var md5_3_provin = md5_provin.substr(16, 3);
    var md5_4_provin = md5_provin.substr(24, 3);
    var token = md5_1_provin + md5_2_provin + md5_3_provin + md5_4_provin;
    return token
  },
  /**
   * 检查电话号码
   */
  checkPhone: function (phone) {
    if (!(/^1[1356789]\d{9}$/.test(phone))) {
      return false;
    } else {
      return true;
    }
  }
})