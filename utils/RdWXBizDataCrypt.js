/**
 * Created by rd on 2017/5/4.
 */

var Crypto = require('cryptojs/cryptojs.js').Crypto;
var app = getApp();

function RdWXBizDataCrypt(appId, sessionKey) {
  this.appId = appId
  this.sessionKey = sessionKey
}

RdWXBizDataCrypt.prototype.decryptData = function (encryptedData, iv) {
  
  var encryptedData = Crypto.util.base64ToBytes(encryptedData)
  var key = Crypto.util.base64ToBytes(this.sessionKey);
  var iv = Crypto.util.base64ToBytes(iv);


  var mode = new Crypto.mode.CBC(Crypto.pad.pkcs7);
  
  try {

    var bytes = Crypto.AES.decrypt(encryptedData, key, {
        asBpytes:true,
        iv: iv,
        mode: mode
    });
    
    var decryptResult = JSON.parse(bytes);
    
  } catch (err) {
    console.log(err)
  }

  if (decryptResult.watermark.appid !== this.appId) {
    console.log(err)
  }

  return decryptResult
}

module.exports = RdWXBizDataCrypt