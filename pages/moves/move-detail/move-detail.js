// pages/moves/move-detail/move-detail.js
var utils = require('../../../utils/utils.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieId: '',
    movieObj: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId = options.id,
        serverUrl = app.serverUrl,
        reqUrl = "";
    reqUrl = `${serverUrl}/subject/${movieId}?apikey=${app.apikey}`;
    utils.getPageData({url: reqUrl}, this.handlePageData);
    this.setData({
      movieId
    })
  },

  handlePageData: function (handleOptions) {
    var data = handleOptions.data;
    // console.log(data);
    var movieDatas = {
      casts: utils.computeCastString(data.casts),//姓名
      castInfos: utils.computeCastInfos(data.casts),
      commentsCount: data.comments_count,
      country: data.countries[0],
      genres:data.genres.join('、') ,
      movieImg: data.images ? data.images.large : '',
      originaTitle: data.original_title,
      stars: utils.computeStartArr(data.rating.stars),
      reviewCount: data.reviews_count,
      summary: data.summary,
      title: data.title,
      wishCount: data.wish_count,
      year: data.year,
      director: data.directors[0].name,
      score: data.rating.average
    }
    this.setData({ movieDatas});
  },
  // showMoviePreview: function (e) {
  //   console.log(e)
  //   var imgSrc = e.currentTarget.dataset.src;
  //   wx.previewImage({
  //     current: imgSrc,
  //     urls: [imgSrc]
  //   })
  // },


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