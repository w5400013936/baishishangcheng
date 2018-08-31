
var cityObj = 
wx.request({
  url: 'https://appshi.api.stonebuy.com/bsStoreInterface.aspx',
  data: {
    method: 'get_area_all',
    vcode: "9%abh5_a#eb7%^&5d412a63a8*69fg*d11f754b9-94497g6!2d.e7a8ea@17%5$a",
  },
  success: function (res) {
    cityObj = res.data.data
  }
})
//城市检索的首字母
var searchLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"]

 
function searchLetter() {
    return searchLetter;
}
// { "id": "119", "provincecode": "350000", "city": "\u6cc9\u5dde\u5e02", "code": "350500", "initial": "Q" }
//对城市信息进行分组
function cityList() {
    var tempObj=[];
    for (var i = 0; i < searchLetter.length; i++) {
        var initial = searchLetter[i];
        var cityInfo = [];
        var tempArr = {};
        tempArr.initial = initial;
        for (var j = 0; j < cityObj.length; j++) {
            if (initial == cityObj[j].firstcharpinyin) {
                cityInfo.push(cityObj[j]);
            }
        }
        tempArr.cityInfo = cityInfo;
        tempObj.push(tempArr);
    }
    return tempObj;
}


module.exports = {
    searchLetter: searchLetter,
    cityList: cityList
}