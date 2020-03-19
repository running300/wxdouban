var utils = require("../../../utils/utils.js");
var app = getApp();
Page({
  data: {
    category: "",
    reqUrl: '',
    count: 0,
    isFirst: true,
    total: ''
  }, 
  //底部下拉
  onScrollTolower: function () {
    var reqUrl = this.data.reqUrl,
      count = this.data.count,
      loadMoreUrl = reqUrl + "&start=0" + "&count=" + count;
    utils.getPageData({
      url: loadMoreUrl
    }, this.handlePageData)
    wx.showNavigationBarLoading();
  },
  onLoad: function (options) {
    var category = options.category,
        reqUrl = '';
    switch (category) {
      case "正在热映":
        reqUrl = app.IN_THEATERS;
        break;
      case "即将上映":
        reqUrl = app.COMING_SOON;
        break;
      case "豆瓣电影TOP250":
        reqUrl = app.TOP_250;
        break;
      default:
        break;
    }

    utils.getPageData({
      url:reqUrl
    },this.handlePageData)

    this.setData({
      category,
      reqUrl
    })
  },
  // 动态导航栏
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.category,
    })
  },

  handlePageData: function (handleOpt) {
    var moviesArr = [];
    var dbMovieArr = handleOpt.data.subjects,
      type = handleOpt.type,
      categoryTitle = handleOpt.categoryTitle,
      stars;
    for (var key in dbMovieArr) {
      var movie = dbMovieArr[key],
        title = movie.title,
        coverImg = movie.images.large,
        rating = movie.rating.average,
        stars = movie.rating.stars,
        movieId = movie.id;
      if (title.length >= 5) {
        title = title.substring(0, 5) + '...';
      }
      stars = utils.computeStartArr(stars)
      var temp = {
        title,
        coverImg,
        rating,
        stars,
        movieId,
      }
      moviesArr.push(temp);
      this.setData({
        moviesArr
      })
    }
    var totalMovies = [];
    if(!this.data.isFirst) {
      totalMovies = this.data.moviesArr.concat(totalMovies);
    }else {
      totalMovies = moviesArr;
      this.data.isFirst = false;
    }
    this.setData({
      moviesArr: totalMovies
    }) 
      this.data.count += 20; 
    wx.hideNavigationBarLoading();
  },
  onMovieItemTop: function (e) {
    var movieId = e.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../move-detail/move-detail?id=' + movieId,
    })
  }
})