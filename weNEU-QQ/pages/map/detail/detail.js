// pages/map/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: '',
    result: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 从本地存储获取学号及密码
    var value = wx.getStorageSync('stuPass_eone')
    // 判断登录状态决定显示内容
    if (!value) {
      wx.navigateTo({
        url: '../login_eone/login_eone',
      })
    }

    var that = this;
    this.setData({
      userid: wx.getStorageSync('stuID')
    });

    // 允许从相机和相册扫码
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
        wx.request({
          url: res.result + that.data.userid,
          method: 'GET',
          dataType: 'json',
          success: function (res) {
            console.log(res);
            that.setData({
              result: res.data.data
            })
          },
          fail: function () {

          },
          complete: function () {

          }
        })
      }
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