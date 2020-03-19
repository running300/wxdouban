// pages/posts/posts.js
const postData = require('../../data/post-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载1
   */
  onLoad: function (options) {   
    this.setData(postData)
  },
  onSwiperTop: function (e) {
    var id = e.target.dataset.postid;
    wx.navigateTo({
      url: './post-detail/post-detail?id=' + id
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成3
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示2
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
  // 跳转到新闻详情页
  onItemTop: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './post-detail/post-detail?id='+id
    })
  },
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