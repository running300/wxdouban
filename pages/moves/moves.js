// pages/moves/moves.js
var utils = require('../../utils/utils.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moviesObj: {},
    in_theaters: {},
    coming_soon: {},
    top250: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 'http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10'
    utils.getPageData({
      url: app.IN_THEATERS + '&start=0&count=3',
      type: 'in_theaters',
      categoryTitle: '正在热映'
    }, this.handlePageData);
    utils.getPageData({
      url: app.COMING_SOON + '&start=0&count=3',
      type: 'coming_soon',
      categoryTitle: '即将上映'
    },this.handlePageData);
    utils.getPageData({
      url: app.TOP_250 + '&start=0&count=3',
      type: 'top250',
      categoryTitle: '豆瓣电影TOP250'
    }, this.handlePageData);
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
      if(title.length >= 5) {
        title = title.substring(0,5) + '...';
      }
      stars = utils.computeStartArr(stars)
      var temp = {
        title,
        coverImg,
        rating,
        stars,
        movieId
      }
      moviesArr.push(temp);
    } 
    var moviesObj = {}
    moviesObj[type] = {
      moviesArr:moviesArr,
      categoryTitle: categoryTitle
    }
    this.setData(
      moviesObj
    )
  },
  // 跳转至更多电影页面
  onMoreTop: function (e) {
    var category = e.currentTarget.dataset.category;
    wx.navigateTo({
      url: './move-more/move-more?category=' + category,
    })
  },
  onMovieItemTop: function(e) {
    var movieId = e.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: './move-detail/move-detail?id=' + movieId,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})