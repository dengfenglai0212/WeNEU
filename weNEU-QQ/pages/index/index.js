import {
  setStatusBarHeight
} from "../../utils/util.js"
var app = getApp();

Page({
  data: {
    userid: '', //学号
    passwd: '', //一网通密码
    TermCourse: [], //学期课表
    todayCourse: [], //今日课表
    loan: [], //借阅
    weekday: '', //星期数-星期几
    week: '', //周数-第几周
    index: 0, //判断今天是否有课
    isLoggedIn: false, //是否已登录
    course_state: 1, //课表卡片-是否加载完成
    lib_state: 0, //图书馆卡片-是否加载完成
    balance: '-.-', //一卡通卡片-余额
    status: '-·-·-', //一卡通卡片-校园网余额
    networkInfo: {
      sum_bytes: 0
    },
    notify_data: '',
    ifNotify: false,
    isLoadingCourse: false
  },

  onLoad: function (options) {
    // 检查用户版本更新
    if (wx.canIUse("getUpdateManager")) {
      let updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate((res) => {
        // 请求完新版本信息的回调
        console.log("[INFO]是否有新版本: " + res.hasUpdate);
      })
      updateManager.onUpdateReady(() => {
        wx.showModal({
          title: '更新提示',
          content: '有新版本更新哦，点击确定完成更新',
          success: (res) => {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            } else if (res.cancel) {
              return false;
            }
          }
        })
      })
      updateManager.onUpdateFailed(() => {
        // 新的版本下载失败
        wx.hideLoading();
        wx.showModal({
          title: '升级失败',
          content: '新版本下载失败，请检查网络！',
          showCancel: false
        });
      });
    }
  },

  // 获取个人信息
  showMe: function () {
    var that = this;
    var url = 'https://weneu.neuyan.com/api/userInfo';

    // 游客登录

    if(app.IsTourist) {

    } else {
      wx.request({
        url: url,
        method: 'POST',
        dataType: 'json',
        data: ({
          'stuID': that.data.userid,
          'stuPass': that.data.passwd
        }),
        success: function (res) {
          wx.hideToast();
          console.log(res.data);
          if (res.data.data.USER_NAME != null) {
            wx.setStorageSync('userInfo', res.data.data);
          } else {
            //that.showToptips();
          }
        },
        fail: function (res) {
          console.warn('网络错误');
        },
        complete: function () {
          wx.hideNavigationBarLoading();
        }
      });
    }
  },

  onShow: function () {
    this.refresh();
  },

  refresh: function () {
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

    if(app.IsTourist) {
      this.setData({
        userid: app.globalData.tourist.studentId,
        passwd: app.globalData.tourist.password
      })

      var that = this;

      // 判断当前时间 - 第几周，星期几
      var util = require('../../utils/Data.js');
      // console.log(util.getWeekAndDayFromSomeday('2019/09/08', '2019/11/13'));
      // console.log(util.listDateFormToday('2019/09/08',23));
      // 从 Date 对象返回一周中的某一天 (0 ~ 6)
      var formatTime = new Date(util.formatDateByH(new Date())).getDay();
      // 返回 1970 年 1 月 1 日至今的毫秒数
      var formatTime1 = new Date(util.formatDateByH(new Date())).getTime();
      var formatTimeS = new Date('2019/09/08').getTime();
      var formatTimeS1 = new Date('2019/09/09').getTime();
      var days = (formatTime1 - formatTimeS) / (formatTimeS1 - formatTimeS);
      var week = (days / 7) + 1;
      if (formatTime == 0) {
        formatTime = 7
        this.setData({
          week: parseInt(week),
          weekday: formatTime
        });
      } else {
        this.setData({
          week: parseInt(week),
          weekday: formatTime
        });
      }
      var value = app.globalData.tourist.studentId;
      var value1 = app.globalData.tourist.termCourse;
      console.log(value1);
      if (value) {
        this.showCard()
        // this.showLib()
        if (value1) {
          var i = 0
          var n = 0
          // 检查当日是否有课
          for (; i < 6; i++) {
            if (value1[this.data.week - 1][this.data.weekday - 1][i][0] == null) {
              n = n + 1;
            }
          }
          // 一天最多六节课都没有
          if (n == 6) {
            that.setData({
              'index': 0,
            });
          } else {
            that.setData({
              'index': 1,
            });
          }
          that.setData({
            'todayCourse': value1[this.data.week - 1][this.data.weekday - 1],
            'course_state': 1
          });
          console.log("[INFO]今日课表: " + this.data.todayCourse)
        } else {
          console.log("[INFO]本地未存储课表/个人信息，即将获取: ")
          this.showTermCourse();
          this.showMe();
        }
      }

    } else {
      // 从本地存储获取学号及密码
      this.setData({
        userid: wx.getStorageSync('stuID'),
        passwd: wx.getStorageSync('stuPass_eone')
      });

      var that = this;

      // 判断当前时间 - 第几周，星期几
      var util = require('../../utils/Data.js');
      // console.log(util.getWeekAndDayFromSomeday('2019/09/08', '2019/11/13'));
      // console.log(util.listDateFormToday('2019/09/08',23));
      // 从 Date 对象返回一周中的某一天 (0 ~ 6)
      var formatTime = new Date(util.formatDateByH(new Date())).getDay();
      // 返回 1970 年 1 月 1 日至今的毫秒数
      var formatTime1 = new Date(util.formatDateByH(new Date())).getTime();
      var formatTimeS = new Date('2019/09/08').getTime();
      var formatTimeS1 = new Date('2019/09/09').getTime();
      var days = (formatTime1 - formatTimeS) / (formatTimeS1 - formatTimeS);
      var week = (days / 7) + 1;
      if (formatTime == 0) {
        formatTime = 7
        this.setData({
          week: parseInt(week),
          weekday: formatTime
        });
      } else {
        this.setData({
          week: parseInt(week),
          weekday: formatTime
        });
      }
      var value = wx.getStorageSync('stuID')
      var value1 = wx.getStorageSync('TermCourse')
      console.log(value1);
      if (value) {
        this.showCard()
        // this.showLib()
        if (wx.getStorageSync('TermCourse')) {
          var i = 0
          var n = 0
          // 检查当日是否有课
          for (; i < 6; i++) {
            if (value1[this.data.week - 1][this.data.weekday - 1][i][0] == null) {
              n = n + 1;
            }
          }
          // 一天最多六节课都没有
          if (n == 6) {
            that.setData({
              'index': 0,
            });
          } else {
            that.setData({
              'index': 1,
            });
          }
          that.setData({
            'todayCourse': value1[this.data.week - 1][this.data.weekday - 1],
            'course_state': 1
          });
          console.log("[INFO]今日课表: " + this.data.todayCourse)
        } else {
          console.log("[INFO]本地未存储课表/个人信息，即将获取: ")
          this.showTermCourse();
          this.showMe();
        }
      }
    }
    
  },

  // 展示借阅信息
  showLib: function () {
    var that = this;
    wx.request({
      url: 'https://weneu.neuyan.com/api/currentBorrow',
      data: {
        'stuID': that.data.userid,
        'stuPass': that.data.passwd
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        that.setData({
          loan: res.data.data,
          lib_state: 1
        });
        console.log(res.data);
      }
    })
  },

  // 展示一卡通信息
  showCard: function () {
    var that = this;

    if(app.IsTourist) {
      var tourist = app.globalData.tourist;
      that.setData({
        balance: tourist.wallet.banlance,
        status: tourist.wallet.network_balance,
        networkInfo: {
          sum_bytes: tourist.wallet.network_flow
        }
      });
    } else {
      wx.request({
        url: 'https://weneu.neuyan.com/api/cardMoney',
        data: {
          'stuID': that.data.userid,
          'stuPass': that.data.passwd,
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          that.setData({
            balance: res.data.data.card_balance / 100
          });
          console.log(res.data);
        }
      })

      wx.request({
        url: 'https://weneu.neuyan.com/api/wlzzList',
        data: {
          'stuID': that.data.userid,
          'stuPass': that.data.passwd,
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          if (res.data.data != null) {
            var temp_user_balance = res.data.data.user_balance.toFixed(2)
            res.data.data.sum_bytes = (res.data.data.sum_bytes/1000000).toFixed(2)
            that.setData({
              status: temp_user_balance,
              networkInfo: res.data.data
            });
            console.log(res.data);
          }
        }
      })
    }
  },

  // 展示课表
  showTermCourse: function() {
    var that = this;

    if(app.IsTourist) {

    } else {
      var url = 'https://weneu.neuyan.com/api/aao/getCourse';
      wx.showLoading({
        title: '玩命加载中...',
      })
      wx.showNavigationBarLoading();
      wx.request({
        url: url,
        data: {
          // 'group':'base',
          // 'action': 'schedule',
          'stuID': that.data.userid,
          'stuPass': that.data.passwd,
        },
        method: 'POST',
        dataType: 'json',
        success: function(res) {
          console.log(res)
          var courseData = res.data.data;
          try{
            var courseArray = that.courseTranslater(courseData);
          }catch(e) {
            console.log(e);
          }
          wx.setStorageSync('TermCourse', courseArray);
        },
        complete: function() {
          wx.hideNavigationBarLoading();
          wx.hideLoading();
          that.refresh();
        }
      })
    }
  },

    // 将UUIA格式课表转化为多维数组
  courseTranslater: function (uuiaCourseData) {
    // 初始化数组
    var courses = [];
    for (let i = 0; i < 24; i++) {
      var weekArray = [];
      for (let j = 0; j < 7; j++) {
        var dateArray = [];
        for (let k = 0; k < 6; k++) {
          dateArray.push([null, null, null]);
        }
        weekArray.push(dateArray);
      }
      courses.push(weekArray);
    }
    for (let i = 0; i < uuiaCourseData.length; i++) {
      
      for (let j = 0; j < uuiaCourseData[i].schedules.length; j++) {
        for(let l = 0;l < uuiaCourseData[i].schedules[j].weeks.length; l++) {
          var weNeusectionArray = this.sectionTranslater(uuiaCourseData[i].schedules[j].section);
          for (let k = 0; k < weNeusectionArray.length; k++) {
            courses[uuiaCourseData[i].schedules[j].weeks[l]][uuiaCourseData[i].schedules[j].day-1][weNeusectionArray[k]-1][0] = uuiaCourseData[i].name;
            courses[uuiaCourseData[i].schedules[j].weeks[l]][uuiaCourseData[i].schedules[j].day-1][weNeusectionArray[k]-1][2] = uuiaCourseData[i].schedules[j].classroom;
            courses[uuiaCourseData[i].schedules[j].weeks[l]][uuiaCourseData[i].schedules[j].day-1][weNeusectionArray[k]-1][1] = uuiaCourseData[i].teachers[0];
          }
        }
        
      }
    }
    return courses;
  },

    // 将标准12课时课表转化为6节课课表
  sectionTranslater: function (sectionArry) {
    var res = [];
    for (let i = 0; i < sectionArry.length; i++) {
      if (sectionArry[i] % 2 == 0) {
        res.push(sectionArry[i] / 2);
      }
    }
    return res;
  },

  /* 用户点击右上角分享 */
  onShareAppMessage: function () {
    var that = this;　　 // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      title: "在东大 | 你想要的，都在这里",
      path: '/pages/index/index',
      imageUrl: '',
    };
    return shareObj;
  }
})