
 /*
 * 首页 选材区 数据
 */ 
function getIndexxuancai(){
    var arr = [ 
            {
                id: 21, 
                PID:0,
                icon:"../../images/icon-shoose1.png",
                title:"平板"
            },
            {
                id: 22,
                PID: 0,
                icon:"../../images/icon-shoose2.png",
                title:"魔方"
            },
            {
                id:23 , 
                PID: 0,
                icon:"../../images/icon-shoose3.png",
                title:"背景墙"
            },
            {
                id:41 ,
                PID: 0,
                icon:"../../images/icon-shoose4.png",
                title:"异型石材"
            },
            {
                id:42 ,
                PID: 0,
                icon:"../../images/icon-shoose5.png",
                title:"工艺品"
            },
        ]
    return arr
}
// 详情页nav切换
function detailnav() {
  var arr = [
    {
      id: 1,
      title: "商品",
    },
    {
      id: 2,
      title: "详情",
    },
    {
      id: 3,
      title: "评价",
    },
  ]
  return arr
}
function comment() {
  var arr = [
    {
      id: 1,
      title: "全部",
    },
    {
      id: 2,
      title: "好评",
    },
    {
      id: 3,
      title: "中评",
    },
    {
      id: 4,
      title: "差评",
    },
  ]
  return arr
}

/*
 * 对外暴露接口
 */ 
module.exports = {
  getIndexxuancai : getIndexxuancai,  
  detailnav: detailnav,
  comment: comment,

}