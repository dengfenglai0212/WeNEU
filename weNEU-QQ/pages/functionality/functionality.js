// pages/functionality/functionality.js
import Toast from '../../dist_vant/toast/toast';
const app = getApp();
Page({

  /* 页面的初始数据 */
  data: {
    isLoggedIn: true
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.isLoggedIn()) {
      this.setData({
        isLoggedIn: true
      });
    } else {
      this.setData({
        isLoggedIn: false
      });
    }
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

})