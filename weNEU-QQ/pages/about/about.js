var app = getApp(); //获取应用实例

Page({
  data: {
    version: '',
    showLog: false
  },

  copyText: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },

  onLoad: function () {
    this.setData({
      version: '1.0.8',
      year: new Date().getFullYear()
    });
  },
  
  toggleLog: function () {
    this.setData({
      showLog: !this.data.showLog
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;　　 // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      title: "在东大 | 你想要的，都在这里",
      path: '/pages/index/index',
      imageUrl: '',
    };
    return shareObj;
  },
});