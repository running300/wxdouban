const postData = require('../../../data/post-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlaying: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id,
        _this = this,
        postDetail = postData.postDataList[options.id];
    this.setData({
      postDetail,
      postId
    })   
    //获取所有新闻的状态 
    var postsStatus = wx.getStorageSync("post_collect_status");
    if(!postsStatus) {
      let postsStatus = {};
      postsStatus[postId] = false;
      wx.setStorageSync("post_collect_status", postsStatus);
    }else {
      //有收藏状态
      let postStatus = postsStatus[postId];//true false
      if(postStatus) {
        this.setData({
          isCollect: postStatus
        })
      }
    }
    // 监听音乐的暂停和播放
    wx.onBackgroundAudioPlay(function () {
      _this.setData({
        isPlaying : true
      })
    });
    wx.onBackgroundAudioPause(function() {
      _this.setData({
        isPlaying: false
      })
    });
    wx.onBackgroundAudioStop(function () {
      _this.setData({
        isPlaying: false
      })
    });
  },
  onColletTop: function () {
  //  获取所有缓存
    let postsStatus = wx.getStorageSync('post_collect_status'),
        postStatus = postsStatus[this.data.postId];
    postStatus = !postStatus;
    postsStatus[this.data.postId] = postStatus;
    wx.setStorageSync("post_collect_status", postsStatus);
    this.setData({
      isCollect: postStatus
    })

    wx.showToast({
      title: this.data.isCollect ?'收藏成功' : '取消收藏',
      icon: 'success',
      duration: 2000
    })
  },
  // 分享
  onShareTop: function () {
    wx.showActionSheet({
      itemList: ["分享到朋友圈","分享给好友","分享到微博"],
      success(res) {
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.eeMsg)
      }
    })
  },
  // 播放
  onAudioTop: function () {
    if(this.data.isPlaying) {
      // 已播放
      wx.pauseBackgroundAudio();//停止播放
      this.setData({
        isPlaying: false
      })
    }else {
      // 未播放
      wx.playBackgroundAudio({//开启播放
        dataUrl: this.data.postDetail.music.musicUrl,
        title: this.data.postDetail.music.title,
        coverImgUrl: this.data.postDetail.music.coverImgUrl
      })
      this.setData({
        isPlaying: true
      })
    }
   
    
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