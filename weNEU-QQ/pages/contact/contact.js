//获取应用实例
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var app = getApp();
Page({
  data: {
    place: ["快速报警", "教务处", "校长办公室", "招生办", "计划财经处", "图书馆","公安处(南湖)"]

  },
  onLoad: function () {
   
  },

  copy: function(){
    
  }
  ,
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