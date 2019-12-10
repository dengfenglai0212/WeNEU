const demo = require("../../utils/demo.js");
var app = getApp();
Page({
  data: {
    userid: '',
    passwd: '', 
    ksInfo: [],
    isNull: true,
  },
  onLoad: function() {
    var that = this;
    that.setData({
      userid: wx.getStorageSync('stuID'),
      passwd: wx.getStorageSync('stuPass_eone')
    });
    //判断并读取缓存
    wx.showLoading({
      title: '正在加载....',
    })
    // wx.showNavigationBarLoading();
    wx.request({
      url: "https://weneu.neuyan.com/uuia",
      method: 'POST',
      dataType: 'json',
      data: ({
        'group': "base",
        'action': "exam",
        'stuID': that.data.userid,
        'password': that.data.passwd
      }),
      success: function(res) {
        console.log(res);
        that.setData({
          ksInfo: res.data.data.courses,
        });
        for(var i = 0; i < that.data.ksInfo.length; i++){
          console.log(Date.parse(that.data.ksInfo[i].time));
        }
        if (res.data.data.courses.length == 0) {
          that.setData({
            isNull: true,
          });
          console.log(1)

        } else {
          that.setData({
            isNull: false,
          });
        }
        console.log(res.data.data);
        wx: wx.removeStorage({
          key: 'ksInfo',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
        wx.setStorageSync('ksInfo', res.data.data)
      },
      fail: function(res) {
        if (that.data.remind == '加载中') {
          that.setData({
            remind: '网络错误'
          });
        }
        that.setData({
          ksInfo: wx.getStorageSync('ksInfo'),
        });
        console.warn('网络错误');
      },
      complete: function() {
        wx.hideNavigationBarLoading();
        wx.hideLoading();

      }
    });
  },

  slideDetail: function (e) {
    var id = e.currentTarget.dataset.id,
      list = this.data.ksInfo;
    // 每次点击都将当前open换为相反的状态并更新到视图，视图根据open的值来切换css
    for (var i = 0, len = list.length; i < len; ++i) {
      if (i == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      ksInfo: list
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
