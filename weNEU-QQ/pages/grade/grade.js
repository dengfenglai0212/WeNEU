const demo = require("../../utils/demo.js");
var app = getApp();
Page({
  data: {
    value1: '',
    title: ['2019-2020学年秋季学期', '2018-2019学年夏季学期', '2018-2019学年春季学期', '2018-2019学年秋季学期', '2017-2018学年第二学期', '2017-2018学年第一学期', '2016-2017学年第二学期', '2016-2017学年第一学期',  '2015-2016学年第二学期', '2015-2016学年第一学期'],
    term: ['12', '49', '30', '11', '29', '10', '28', '9', '27', '8'],
    userid: '',
    passwd: '',
    cjInfo: {},
    GPA: '',
    isGra: 0,
    loading: false, // 是否请求完毕
    show: false,
    index: 2,
    sum_credit: '请稍候',

  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    this.getInfo()
  },

  onPullDownRefresh() {
    this.getInfo()
  },

  onLoad: function() {
    this.setData({
      userid: wx.getStorageSync('stuID'),
      passwd: wx.getStorageSync('stuPass_eone')
    });
    //判断并读取缓存
    this.getInfo()
  },

  /* 获取成绩 */
  getInfo: function() {
    var that = this;

    var tourist = app.globalData.tourist;
    if(app.IsTourist) {
      that.setData({
        cjInfo: tourist.cjInfo
      });
      wx.setStorageSync('cInfo', tourist.cjInfo);
      that.handle();
      that.setData({
        loading: true
      });
    }else {
      var url;
      wx.showLoading({
        title: '正在加载...',
      })
      wx.showNavigationBarLoading();
      url = 'https://weneu.neuyan.com/api/aao/getScore';
      wx.request({
        url: url,
        method: 'POST',
        dataType: 'json',
        data: ({
          // 'group': "base",
          // 'action': "score",
          'stuID': that.data.userid,
          'stuPass': that.data.passwd,
          'semester': that.data.term[that.data.index]
        }),
        success: function(res) {
          console.log(res.data.data);
          that.setData({
            cjInfo: res.data.data,
          });
          wx.setStorageSync('cInfo', res.data.data)
        },
        fail: function(res) {
          if (that.data.remind == '加载中') {
            that.setData({
              remind: '网络错误'
            });
          }
          that.setData({
            cjInfo: wx.getStorageSync('cInfo'),
            GPA: wx.getStorageSync('GPA'),
          });
        },
        complete: function() {
          wx.hideNavigationBarLoading();
          wx.hideLoading();
          that.setData({
            loading: true
          });
          that.handle();
        }
      });
    }
  },

  enter_calculator() {
    wx.navigateTo({
      url: './calculator/calculator'
    })
  },

  handle() {
    var that = this;
    var sum_credit = 0;
    var sum_neu = 0;
    var gradeList = that.data.cjInfo.courses;
    for (var i = 0; i < gradeList.length; i++) {
      if (gradeList[i].extraData[8].data == '优') {
        gradeList[i].extraData[8].data = 95;
      } else if (gradeList[i].extraData[8].data == "良") {
        gradeList[i].extraData[8].data = 85;
      } else if (gradeList[i].extraData[8].data == "中") {
        gradeList[i].extraData[8].data = 75;
      } else if (gradeList[i].extraData[8].data == "及格") {
        gradeList[i].extraData[8].data = 65;
      } else if (gradeList[i].extraData[8].data == "不及格") {
        gradeList[i].extraData[8].data = 0;
      } else if (gradeList[i].extraData[8].data == "合格") {
        gradeList[i].extraData[8].data = 80;
      } else if (gradeList[i].extraData[8].data == "不合格") {
        gradeList[i].extraData[8].data = 0;
      } else if (gradeList[i].extraData[8].data == "其他") {
        continue;
      } else if (gradeList[i].extraData[8].data == "缺考") {
        continue;
      } else if (gradeList[i].extraData[8].data == "缓考") {
        continue;
      } else if (gradeList[i].extraData[8].data == "请参加考评") {
        continue;
      }
      sum_neu += (parseFloat(gradeList[i].extraData[8].data) / 10 - 5) * parseFloat(gradeList[i].credit);
      sum_credit += parseFloat(gradeList[i].credit);
    }
    console.log("neu: " + sum_neu / sum_credit);
    that.setData({
      neu: parseFloat((sum_neu / sum_credit).toFixed(4)),
      sum_credit: sum_credit
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
      imageUrl: 'https://s2.ax1x.com/2019/01/20/kCDKJJ.jpg',
    };
    return shareObj;
  },
});