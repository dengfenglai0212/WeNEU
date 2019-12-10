import Dialog from '../../dist_vant/dialog/dialog';
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    isGra: 0,
    userid: '',
    passwd: '',
    name: '',
    id: '',
    gender: '',
    grade: '',
    myClass: '',
    college: '',
    major: '',
    state: '',
    img: '',
    week: '',
    weekday: '',
    userInfo: '',
    term: '2019-2020学年秋季学期',
    show: false,
    isLoggedIn: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    // 判断登录状态决定显示内容
    if (app.isLoggedIn()) {
      this.setData({
        isLoggedIn: true
      });
    } else {
      this.setData({
        isLoggedIn: false
      });
    }

    var _this = this;

    var tourist = app.globalData.tourist;

    if(app.IsTourist) {
      _this.setData({
        userInfo: {
          USER_NAME: tourist.name,
          ID_NUMBER: tourist.studentId
        },
        isGra: 0,
        index: 1,
        img: '../../images/me/boy.png'
      });
    } else {
      
      this.showWeek();
      if (wx.getStorageSync('stuID')) {
        _this.setData({
          userid: wx.getStorageSync('stuID'),
          passwd: wx.getStorageSync('stuPass'),
          isGra: wx.getStorageSync('isGra'),
          index: 1
        });
        //判断并读取缓存
        if (wx.getStorageSync('userInfo')) {
          _this.setData({
            userInfo: wx.getStorageSync('userInfo'),
          });
          if (_this.data.userInfo.USER_SEX == '男') {
            _this.setData({
              img: '../../images/me/boy.png'
            });
          } else {
            _this.setData({
              img: '../../images/me/girl.png'
            });
          };
        } else {
          _this.showMe()
        }
      }
    }
  },

  showMe: function() {
    var _this = this;
    var url;
    if (wx.getStorageSync('isGra') == 0) {
      url = 'https://weneu.neuyan.com/api/userInfo';
    } else {
      url = 'https://neuvwo.com/mini/postgraduate/api/getInfo';
    }
    wx.showNavigationBarLoading();
    wx.request({
      url: url,
      method: 'POST',
      dataType: 'json',
      data: ({
        'stuID': _this.data.userid,
        'stuPass': wx.getStorageSync("stuPass_eone")
      }),
      success: function(res) {
        wx.hideToast();
        _this.setData({
          userInfo: res.data.data,
        });
        if (res.data.data.USER_SEX == '男') {
          _this.setData({
            img: '../../images/me/boy.png'
          });
        } else {
          _this.setData({
            img: '../../images/me/girl.png'
          });
        }
        console.log(res.data);
        _this.showWeek();
        if (res.data.data.name != null) {
          wx.setStorageSync('userInfo', res.data.data);
        } else {
          _this.showToptips();
        }

        wx.hideNavigationBarLoading();

      },
      fail: function(res) {
        if (_this.data.remind == '加载中') {
          _this.setData({
            remind: '网络错误'
          });
        }
        console.warn('网络错误');
      },
      complete: function() {
        wx.hideNavigationBarLoading();
      }
    });
  },
  
  showWeek: function() {
    var _this = this;
    var util = require('../../utils/Data.js');
    var formatTime = new Date(util.formatDateByH(new Date())).getDay();
    var formatTime1 = new Date(util.formatDateByH(new Date())).getTime();
    var formatTimeS = new Date('2019/09/08').getTime();
    var formatTimeS1 = new Date('2019/09/09').getTime();
    var days = (formatTime1 - formatTimeS) / (formatTimeS1 - formatTimeS);
    var weekday1 = ["日", "一", "二", "三", "四", "五", "六"];
    var week = (days / 7) + 1;
    _this.setData({
      week: parseInt(week),
      weekday: weekday1[formatTime]
    });
  },

  // 重新登录
  login() {
    console.log("[INFO] 用户点击头像");
    Dialog.confirm({
      title: '重置账户',
      message: '您确定要重置账户吗？重置账户后您的所有本地信息将清除!当您需要再次使用本服务时需重新进行绑定操作。'
    }).then(() => {
      console.log('[INFO] 确定重置账户')
      wx.clearStorage()
      app.IsTourist = false;
      wx.switchTab({
        url: '/pages/me/me',
        success: function(e) {
          var page = getCurrentPages().pop();
          page.onLoad();
          page.onShow();
          page.onReady();
        }
      })
    }).catch(() => {
      console.log('[INFO] 已取消重置')
    });
  },
  showToptips: function() {

  },
  onClose() {
    this.setData({
      show: false
    });
  },
  onOpen() {
    this.setData({
      show: true
    });
  },
  changeColor(event) {
    console.log(this.pageBackgroundColor);
    console.log(event.currentTarget.id);
    var newColor = event.currentTarget.id;
    app.changeColor(newColor);
    appColor = app.getBGColor();
    this.setData({
      pageBackgroundColor: appColor
    })
    console.log(this.pageBackgroundColor);
  },

  share() {
    this.onShareAppMessage();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    var that = this;　　 // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      title: "在东大 | 你想要的，都在这里",
      path: '/pages/index/index',
      imageUrl: '',
    };
    return shareObj;
  },
})