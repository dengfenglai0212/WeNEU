//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
import * as echarts from '/ec-canvas/echarts';
App({
  Login: true,
  IsTourist: false,
  globalData: {
    StatusBar: null,
    Custom: null,
    CustomBar: null,
    serverName: "localhost:8080",
    userInfo: null,
    statusCode: {
      success: 200,
      tokenExpired: 401
    },
    isiOS: false,
    tourist: {}
  },
  pageBackgroundColor: '#f1f1f1',
  onLaunch: function() {
    var that = this
    
    // 登录代码段
    // wx.showLoading({
    //   title: '登录中',
    //   mask: true
    // })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           // 获取成功后的回调函数
    //           // if (this.userInfoReadyCallbackHandler) {
    //           //   this.userInfoReadyCallbackHandler(res)
    //           // }
    //           this.loginUUIA()
    //         },
    //         fail: res => {
    //           this.applyForPermission()
    //         }
    //       })
    //     } else {
    //       this.applyForPermission()
    //     }
    //   }
    // })

    // 获取系统显示高度信息
    wx.getSystemInfo({
      success: e => {
        console.log(e)
        if(e.system.indexOf('iOS') != -1) {
          this.globalData.isiOS = true 
        }
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })

    var _this = this;

    // 读取本地学号密码缓存，并根据缓存有无判断是否已登录
    try {
      wx.getStorage({
          key: 'stuID',
          success: function(res) {
            console.log("[INFO]当前登录用户学号: " + res.data);
            wx.getStorage({
              key: 'stuPass_eone',
              success: function (res) {
                console.log("[INFO]当前登录用户密码: " + res.data);
              },
              fail: function () {
                _this.Login = false;
                console.log("[INFO]未注册")
              }
            })
          },
          fail: function() {
            _this.Login = false;
            console.log("[INFO]未注册")
            wx.getStorage({
              key: 'Tourist',
                success: function(res) {
                  _this.globalData.tourist = res.data;
                  _this.IsTourist = true;
                  console.log("[INFO]游客登录" + res.data);
                },
                fail: function() {
                  _this.IsTourist = false;
                  console.log("[INFO]非游客登录")
                }
            })
          }
        })
    } catch (e) {
      console.warn('[INFO]登录检验-获取学号缓存失败');
      this.Login = false;
    }
  },
  
  /* 下方为通用工具函数 */
  // 保存缓存
  saveCache: function(key, value) {
    if (!key || !value) {
      return;
    }
    var _this = this;
    _this.cache[key] = value;
    wx.setStorage({
      key: key,
      data: value
    });
  },

  // 清除缓存
  removeCache: function(key) {
    if (!key) {
      return;
    }
    var _this = this;
    _this.cache[key] = '';
    wx.removeStorage({
      key: key
    });
  },

  showLoadToast: function (title, duration) {
    wx.showToast({
      title: title || '玩命加载中...',
      icon: 'loading',
      mask: true,
      duration: duration || 10000
    });
  },

  showErrorModal: function (content, title) {
    wx.showModal({
      title: title || '加载失败',
      content: content || '未知错误',
      showCancel: false
    });
  },

  util: require('./utils/util'),
  key: function (data) {
    return this.util.key(data)
  },
  
  enCodeBase64: function (data) {
    return this.util.base64.encode(data)
  },

  isLoggedIn: function() {
    // 从本地存储获取学号及密码
    var value = wx.getStorageSync('stuPass_eone');
    // 判断登录状态决定显示内容
    if (value || this.IsTourist) {
      return true
    } else {
      return false
    }
  },
  applyForPermission: function () {
    wx.hideLoading()
    // 需要登录授权
    wx.showLoading({
      title: '请授权登录',
      mask: true
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    setTimeout(function () {
      wx.navigateTo({
        url: '/pages/grant-permission/grant-permission',
      })
    }, 1000)
  }, 
  loginUUIA: function () {
    let that = this
    // 登录
    wx.login({
      success: res => {
        console.log(res)
        console.log(this.globalData.userInfo)
        this.request('POST', 'mini-program/login', {
          code: res.code,
          sex: this.globalData.userInfo == null ? 0 : this.globalData.userInfo.gender,
          name: this.globalData.userInfo == null ? null : this.globalData.userInfo.nickName,
          avatarUrl: this.globalData.userInfo == null ? null : this.globalData.userInfo.avatarUrl
        },
          successData => {
            wx.hideLoading()
            if (successData.code == this.globalData.statusCode.success) {
              // 获取成功
              this.globalData.token = successData.token
              
              wx.setStorageSync('token', successData.token)
              if (this.loginSuccessHandler) {
                this.loginSuccessHandler();
              }
            } else {
              // 登录失败
              console.log("登录获取token失败")
            }
            console.log(successData)
          },
          failRes => {
            wx.hideLoading()
            console.log(failRes)
          })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
      fail: res => {
        // 自动登录失败，待用户授权
        wx.hideLoading()
        // that.applyForPermission()
        console.log(res)
      }
    })
  },
  loginSuccessHandler: null,
  request: function (method, url, data, success, fail) {
    let that = this
    wx.request({
      url: 'http://' + that.globalData.serverName + "/" + url + that.getTokenPostfix(),
      data: data,
      header: {},
      method: method,
      dataType: 'json',
      success: function (res) {
        wx.hideLoading()
        if (res.statusCode == 200) {
          if (success) {
            if (res.data.code == 401) {
              // token 过期处理
              console.log("token 过期")
              app.loginUUIA()
              return
            }
            success(res.data)
          }
        } else {
          if (fail) {
            fail(res)
            console.log("请求出错")
            console.log(res)
          }
        }
      },
      fail: function (res) {
        wx.hideLoading()
        wx.showToast({
          title: '网络请求出现问题，请检查您设备的网络状况',
          icon: 'none'
        })
        // console.log("网络请求失败")
        if (fail) {
          fail(res)
        }
      }
    })
  },
  // 解密函数
  decrypt: function (encryptedData, iv, handler) {
    this.request('POST', '/customer/decrypt', {
      encryptedData: encryptedData,
      iv: iv
    },
      successData => {
        console.log(successData.data);
        handler(successData.data)
      },
      failRes => {
        console.log(failRes);
      })
  },
  // 设置保险的登录回调函数
  setLoginSuccessHandler: function (loginSuccessHandler) {
    console.log("handler set")
    this.loginSuccessHandler = loginSuccessHandler
  },
  getTokenPostfix: function () {
    // 返回用于请求的token后缀
    let token = wx.getStorageSync('token')
    if (token == null || token == '') {
      token = this.globalData.token
    }
    return token == null?'':("?token=" + token);
  },

  // 游客登录
  touristLogin() {
    var tourist = {
      name: "在东大游客",
      studentId: "20190001",
      password: "WeNEUtourist",
      gender: "男",
      termCourse: this.generateTermcourse(),
      wallet: {
        banlance: 55.38,
        network_balance: 28.86,
        network_flow: 33028.99
      },
      cjInfo: {
        gpa: 4.0,
        courses: [
          {courseCode: "C1501000100",
          credit: "3.5",
          extraData: [
            {data: "2018-2019春季", key: "学年学期"}, 
            {key: "课程类别", data: "人文社会科学类"}, // 课程类别
            {data: "数学与自然科学类", key: "课程类别"}, 
            {data: "必修", key: "是否选修"}, 
            {key: "学分", data: "3.5"}, // 学分
            {data: "20", key: "平时成绩"},
            {data: "20", key: "期中成绩"},
            {data: "50", key: "期末成绩"},
            {data: "90", key: "总评成绩"},
            {data: "正常", key: "考试情况"}
          ],
          grade: "90",
          name: "软件需求分析与设计"},
          {courseCode: "C1501000100",
          credit: "3.5",
          extraData: [
            {data: "2018-2019春季", key: "学年学期"}, 
            {key: "课程类别", data: "人文社会科学类"}, // 课程类别
            {data: "数学与自然科学类", key: "课程类别"}, 
            {data: "必修", key: "是否选修"}, 
            {key: "学分", data: "3.5"}, // 学分
            {data: "20", key: "平时成绩"},
            {data: "20", key: "期中成绩"},
            {data: "50", key: "期末成绩"},
            {data: "90", key: "总评成绩"},
            {data: "正常", key: "考试情况"}
          ],
          grade: "90",
          name: "毛泽东思想和中国特色社会主义理论体系概论"},
          {courseCode: "C1501000100",
          credit: "3.5",
          extraData: [
            {data: "2018-2019春季", key: "学年学期"}, 
            {key: "课程类别", data: "人文社会科学类"}, // 课程类别
            {data: "数学与自然科学类", key: "课程类别"}, 
            {data: "必修", key: "是否选修"}, 
            {key: "学分", data: "3.5"}, // 学分
            {data: "20", key: "平时成绩"},
            {data: "20", key: "期中成绩"},
            {data: "50", key: "期末成绩"},
            {data: "90", key: "总评成绩"},
            {data: "正常", key: "考试情况"}
          ],
          grade: "90",
          name: "软件项目管理与过程改进"},
          {courseCode: "C1501000100",
          credit: "3.5",
          extraData: [
            {data: "2018-2019春季", key: "学年学期"}, 
            {key: "课程类别", data: "人文社会科学类"}, // 课程类别
            {data: "数学与自然科学类", key: "课程类别"}, 
            {data: "必修", key: "是否选修"}, 
            {key: "学分", data: "3.5"}, // 学分
            {data: "20", key: "平时成绩"},
            {data: "20", key: "期中成绩"},
            {data: "50", key: "期末成绩"},
            {data: "90", key: "总评成绩"},
            {data: "正常", key: "考试情况"}
          ],
          grade: "90",
          name: "移动互联导论"},
          {courseCode: "C1501000100",
          credit: "3.5",
          extraData: [
            {data: "2018-2019春季", key: "学年学期"}, 
            {key: "课程类别", data: "人文社会科学类"}, // 课程类别
            {data: "数学与自然科学类", key: "课程类别"}, 
            {data: "必修", key: "是否选修"}, 
            {key: "学分", data: "3.5"}, // 学分
            {data: "20", key: "平时成绩"},
            {data: "20", key: "期中成绩"},
            {data: "50", key: "期末成绩"},
            {data: "90", key: "总评成绩"},
            {data: "正常", key: "考试情况"}
          ],
          grade: "90",
          name: "软件质量保证与测试"},
          {courseCode: "C1501000100",
          credit: "3.5",
          extraData: [
            {data: "2018-2019春季", key: "学年学期"}, 
            {key: "课程类别", data: "人文社会科学类"}, // 课程类别
            {data: "数学与自然科学类", key: "课程类别"}, 
            {data: "必修", key: "是否选修"}, 
            {key: "学分", data: "3.5"}, // 学分
            {data: "20", key: "平时成绩"},
            {data: "20", key: "期中成绩"},
            {data: "50", key: "期末成绩"},
            {data: "90", key: "总评成绩"},
            {data: "正常", key: "考试情况"}
          ],
          grade: "90",
          name: "Linux操作系统"}
        ]
      },
      ykt: {
        meals: 355.70,
        shower: 8.00,
        shopping: 40.00,
        network: 25,
        detail: [
          {balance: "42.40", cost: "3.00", place: "物联网采集工作站", salesman: "虚拟职员", terminal: "浑南食堂一楼121#", time: "2019/11/8 8:09:43"},
          {balance: "45.40", cost: "0.43", place: "物联网采集工作站", salesman: "虚拟职员", terminal: "浑南食堂一楼111#", time: "2019/11/8 8:09:41" },
          {balance: "45.83", cost: "0.43", place: "物联网采集工作站", salesman: "虚拟职员", terminal: "浑南食堂一楼111#", time: "2019/11/8 8:09:39" },
          {balance: "46.26", cost: "3.80", place: "物联网采集工作站", salesman: "虚拟职员", terminal: "浑南食堂一楼水果店", time: "2019/11/7 18:09:02" },
          {balance: "50.06", cost: "10.00", place: "物联网采集工作站", salesman: "虚拟职员", terminal: "浑南食堂三楼14#", time: "2019/11/7 17:48:00" }
        ],
        sumTotal: [
          {code: "210", cost: "355.70", description: "餐费支出"},
          {code: "211", cost: "8.00", description: "淋浴支出"},
          {code: "215", cost: "40.00", description: "商场购物"},
          {code: "234", cost: "25.00", description: "网络扣费"}
        ]
      }
    }
    wx.setStorageSync('Tourist', tourist);
    this.globalData.tourist = tourist;
    this.IsTourist = true;
    // console.log(wx.getStorageSync('Tourist'));
  },
  generateTermcourse() {
    var course = [];
    var teacher = [];
    var place = [];
    // 实例课程
    course.push("软件需求分析与设计");
    course.push("毛泽东思想和中国特色社会主义理论体系概论");
    course.push("软件项目管理与过程改进");
    course.push("移动互联导论");
    course.push("软件质量保证与测试");
    course.push("Linux操作系统");
    // 实例教师
    teacher.push("刘益先");
    teacher.push("朱丽颖");
    teacher.push("孙立奎");
    teacher.push("刘益先");
    teacher.push("王莹");
    teacher.push("宋航");
    // 实例教室
    place.push("1号A302");
    place.push("信息A112");
    place.push("1号A102");
    place.push("1号A405");
    place.push("1号A302");
    place.push("1号A201");

    var termCourse = [];
    for(var i = 0; i < 23; i ++) {
      var weekCourse = [];
      for(var j = 0; j < 7; j ++) {
        var dayCourse = [];
        for(var k = 0; k < 6; k ++) {
          var singleCourse = [];
          singleCourse.push(null);
          singleCourse.push(null);
          singleCourse.push(null);
          if(Math.random() >= 0.5) {
            singleCourse[0] = course[k];
            singleCourse[1] = teacher[k];
            singleCourse[2] = place[k];
          }
          dayCourse.push(singleCourse);
        }
        weekCourse.push(dayCourse);
      }
      termCourse.push(weekCourse);
    }
    return termCourse;
  }


});
