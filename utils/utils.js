// 计算五角星的数量
function computeStartArr(stars) {
  var arr = [],
      starNum = stars.toString().substring(0, 1);
  for(var i = 1; i <= 5; i++) {
    if(i < starNum) {
      arr.push(1);
    } else {
      arr.push(0);
    }   
  }
  return arr;
};
// [1,1,1,1,0]

function getPageData(reqOpt, callback) {
  var that = this;
  wx.request({
    url: reqOpt.url,
    method: 'GET',
    header: {
      'Content-Type': 'json',
    },
    success: function (res) {
      var data = res.data,
        handleOpt = {
          data: data,
          type: reqOpt.type,
          categoryTitle: reqOpt.categoryTitle
        }
      callback(handleOpt);
    },
    fail: function (res) {
      console.log(res)
    }
  })
}
// 演员阵容字符串
function computeCastString(casts) {
  var castString = "";
  for(var i in casts) {
    castString += casts[i].name + ' / ';
  } 
  return castString.substring(0, castString.length - 3);
}
function computeCastInfos(casts) {
  var castInfos = [];
  for(var i in casts) {
    var castInfo = {
      avatars: casts[i].avatars ? casts[i].avatars.large : '',
      name: casts[i].name
    }
    castInfos.push(castInfo);
  }
  return castInfos;
}

module.exports = {
  computeStartArr,
  getPageData,
  computeCastString,
  computeCastInfos
}