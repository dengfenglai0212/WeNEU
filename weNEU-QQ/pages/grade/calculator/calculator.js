var app = getApp();
Page({
  data: {
    value1: '',
    title: ['2018-2019学年夏季学期', '2018-2019学年春季学期', '2018-2019学年秋季学期', '2017-2018学年第二学期', '2017-2018学年第一学期', '2016-2017学年第二学期', '2016-2017学年第一学期', '2015-2016学年第二学期', '2015-2016学年第一学期'],
    term: ['49', '30', '11', '29', '10', '28', '9', '27', '8'],
    // term: ['30', '11', '29', '10', '28', '9'],
    userid: '',
    passwd: '',
    cjInfo: '',
    GPA: '',
    isGra: 0,
    loading: false, // 是否请求完毕
    show: false,
    index: 0,
    gradeList: [],
    currentTask: 0
  },
  
  onLoad: function () {
    var that = this;
    if (!wx.getStorageSync('stuID')){
      wx.navigateTo({
        url: '../../login/login'
      })
    }
    that.setData({
      userid: wx.getStorageSync('stuID'),
      passwd: wx.getStorageSync('stuPass_eone')
    });
    //判断并读取缓存
    this.calculator()
  },

  doSetTimeout(i) {
    var that = this;
    var gradeList = that.data.gradeList;
    var url = 'https://neuvwo.com:8899/uuia';
    setTimeout(function () {
      wx.request({
        url: url,
        method: 'POST',
        dataType: 'json',
        data: ({
          'group': "base",
          'action': "score",
          'stuID': that.data.userid,
          'password': that.data.passwd,
          'semesterID': that.data.term[i]
        }),
        success: function (res) {
          console.log(that.data.title[i])
          console.log(res.data.data)
          gradeList.push.apply(gradeList, res.data.data.courses);
          that.setData({
            currentTask: that.data.currentTask + 1
          });
          if(that.data.currentTask == that.data.term.length) {
            wx.hideLoading();
          }
        },
        complete: function (res) {
          that.setData({
            gradeList: gradeList
          });
          that.handle();
        }
      });
    }, 5000 * (i + 1))
  },

  calculator: function () {
    var that = this;
    wx.showLoading({
      title: "玩命加载中...(预计耗时40-50s)",
    })
    for (var i = 0; i < this.data.term.length; i++) {
      that.doSetTimeout(i);
    }
  },

  handle() {
    var that = this;
    var sum_credit = 0;
    var sum_score = 0;
    var sum_weight = 0;
    var sum_neu = 0;
    var sum_four = 0;
    var sum_standrad = 0;
    var sum_advanced = 0;
    var sum_advanced_new = 0;
    var sum_pku = 0;
    var sum_canada = 0;
    var sum_ustc = 0;
    var sum_sjtu = 0;
    var sum_zju = 0;
    var gradeList = that.data.gradeList;
    for (var i = 0; i < gradeList.length; i++) {
      gradeList[i].zju = gradeList[i].extraData[6].data;
      if (gradeList[i].extraData[6].data == '优') {
        gradeList[i].extraData[6].data = 95;
        gradeList[i].zju = 90;
      } else if (gradeList[i].extraData[6].data == "良") {
        gradeList[i].extraData[6].data = 85;
        gradeList[i].zju = 80;
      } else if (gradeList[i].extraData[6].data == "中") {
        gradeList[i].extraData[6].data = 75;
        gradeList[i].zju = 70;
      } else if (gradeList[i].extraData[6].data == "及格") {
        gradeList[i].extraData[6].data = 65;
        gradeList[i].zju = 60;
      } else if (gradeList[i].extraData[6].data == "不及格") {
        gradeList[i].extraData[6].data = 0;
        gradeList[i].zju = 0;
      } else if (gradeList[i].extraData[6].data == "合格") {
        gradeList[i].extraData[6].data = 80;
        gradeList[i].zju = 75;
      } else if (gradeList[i].extraData[6].data == "不合格") {
        gradeList[i].extraData[6].data = 0;
        gradeList[i].zju = 0;
      } else if (gradeList[i].extraData[6].data == "其他") {
        continue;
      } else if (gradeList[i].extraData[6].data == "缺考") {
        continue;
      } else if (gradeList[i].extraData[6].data == "缓考") {
        continue;
      } else if (gradeList[i].extraData[6].data == "请参加考评") {
        continue;
      }

      /*标准4.0 */
      if (parseFloat(gradeList[i].extraData[6].data) >= 90) {
        sum_standrad += 4.0 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 80 && parseFloat(gradeList[i].extraData[6].data) < 90) {
        sum_standrad += 3.0 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 70 && parseFloat(gradeList[i].extraData[6].data) < 80) {
        sum_standrad += 2.0 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 60 && parseFloat(gradeList[i].extraData[6].data) < 70) {
        sum_standrad += 1.0 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) < 60) {
        sum_standrad += 0 * parseFloat(gradeList[i].credit);
      }
      /*改进4.0 */
      if (parseFloat(gradeList[i].extraData[6].data) >= 85) {
        sum_advanced += 4.0 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 70 && parseFloat(gradeList[i].extraData[6].data) < 85) {
        sum_advanced += 3.0 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 60 && parseFloat(gradeList[i].extraData[6].data) < 70) {
        sum_advanced += 2.0 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) < 60) {
        sum_advanced += 0 * parseFloat(gradeList[i].credit);
      }
      /*改进4.0_new */
      if (parseFloat(gradeList[i].extraData[6].data) >= 85) {
        sum_advanced_new += 4.0 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 75 && parseFloat(gradeList[i].extraData[6].data) < 85) {
        sum_advanced_new += 3.0 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 60 && parseFloat(gradeList[i].extraData[6].data) < 75) {
        sum_advanced_new += 2.0 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) < 60) {
        sum_advanced_new += 0 * parseFloat(gradeList[i].credit);
      }

      /*北大4.0 */
      if (parseFloat(gradeList[i].extraData[6].data) >= 90) {
        sum_pku += 4.0 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 85 && parseFloat(gradeList[i].extraData[6].data) <= 89) {
        sum_pku += 3.7 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 82 && parseFloat(gradeList[i].extraData[6].data) <= 84) {
        sum_pku += 3.3 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 78 && parseFloat(gradeList[i].extraData[6].data) <= 81) {
        sum_pku += 3.0 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 75 && parseFloat(gradeList[i].extraData[6].data) <= 77) {
        sum_pku += 2.7 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 72 && parseFloat(gradeList[i].extraData[6].data) <= 74) {
        sum_pku += 2.3 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 68 && parseFloat(gradeList[i].extraData[6].data) <= 71) {
        sum_pku += 2.0 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 64 && parseFloat(gradeList[i].extraData[6].data) <= 67) {
        sum_pku += 1.5 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 60 && parseFloat(gradeList[i].extraData[6].data) <= 63) {
        sum_pku += 1.0 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) < 60) {
        sum_pku += 0 * parseFloat(gradeList[i].credit);
      }

      /*加拿大4.3 */
      if (parseFloat(gradeList[i].extraData[6].data) >= 90) {
        sum_canada += 4.3 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 85 && parseFloat(gradeList[i].extraData[6].data) <= 89) {
        sum_canada += 4.0 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 80 && parseFloat(gradeList[i].extraData[6].data) <= 84) {
        sum_canada += 3.7 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 75 && parseFloat(gradeList[i].extraData[6].data) <= 79) {
        sum_canada += 3.3 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 70 && parseFloat(gradeList[i].extraData[6].data) <= 74) {
        sum_canada += 3.0 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 65 && parseFloat(gradeList[i].extraData[6].data) <= 69) {
        sum_canada += 2.7 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 60 && parseFloat(gradeList[i].extraData[6].data) <= 64) {
        sum_canada += 2.3 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) < 60) {
        sum_canada += 0 * parseFloat(gradeList[i].credit);
      }

      /*中科大4.3 */
      if (parseFloat(gradeList[i].extraData[6].data) >= 95) {
        sum_ustc += 4.3 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 90 && parseFloat(gradeList[i].extraData[6].data) <= 94) {
        sum_ustc += 4.0 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 85 && parseFloat(gradeList[i].extraData[6].data) <= 89) {
        sum_ustc += 3.7 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 82 && parseFloat(gradeList[i].extraData[6].data) <= 84) {
        sum_ustc += 3.3 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 78 && parseFloat(gradeList[i].extraData[6].data) <= 81) {
        sum_ustc += 3.0 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 75 && parseFloat(gradeList[i].extraData[6].data) <= 77) {
        sum_ustc += 2.7 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 72 && parseFloat(gradeList[i].extraData[6].data) <= 74) {
        sum_ustc += 2.3 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 68 && parseFloat(gradeList[i].extraData[6].data) <= 71) {
        sum_ustc += 2.0 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 65 && parseFloat(gradeList[i].extraData[6].data) <= 67) {
        sum_ustc += 1.7 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 64 && parseFloat(gradeList[i].extraData[6].data) <= 64) {
        sum_ustc += 1.5 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 61 && parseFloat(gradeList[i].extraData[6].data) <= 63) {
        sum_ustc += 1.3 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 60 && parseFloat(gradeList[i].extraData[6].data) <= 60) {
        sum_ustc += 1.0 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) < 60) {
        sum_ustc += 0 * parseFloat(gradeList[i].credit);
      }

      /*上海交大4.3 */
      if (parseFloat(gradeList[i].extraData[6].data) >= 95) {
        sum_sjtu += 4.3 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 90 && parseFloat(gradeList[i].extraData[6].data) <= 94) {
        sum_sjtu += 4.0 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 85 && parseFloat(gradeList[i].extraData[6].data) <= 89) {
        sum_sjtu += 3.7 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 80 && parseFloat(gradeList[i].extraData[6].data) <= 84) {
        sum_sjtu += 3.3 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 75 && parseFloat(gradeList[i].extraData[6].data) <= 79) {
        sum_sjtu += 3.0 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 70 && parseFloat(gradeList[i].extraData[6].data) <= 74) {
        sum_sjtu += 2.7 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 67 && parseFloat(gradeList[i].extraData[6].data) <= 69) {
        sum_sjtu += 2.3 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 65 && parseFloat(gradeList[i].extraData[6].data) <= 66) {
        sum_sjtu += 2.0 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 62 && parseFloat(gradeList[i].extraData[6].data) <= 64) {
        sum_sjtu += 1.7 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) >= 60 && parseFloat(gradeList[i].extraData[6].data) <= 61) {
        sum_sjtu += 1.0 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].extraData[6].data) < 60) {
        sum_sjtu += 0 * parseFloat(gradeList[i].credit);
      }

      /* 浙大4.0 */
      if (parseFloat(gradeList[i].zju) >= 85) {
        sum_zju += 4.0 * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].zju) >= 60 && parseFloat(gradeList[i].zju) <= 84) {
        sum_zju += (4.0 - (85 - gradeList[i].extraData[6].data) * 0.1) * parseFloat(gradeList[i].credit);
      } else if (parseFloat(gradeList[i].zju) < 60) {
        sum_zju += 0 * parseFloat(gradeList[i].credit);
      }

      /* 标准加权 */
      sum_four += (parseFloat(gradeList[i].extraData[6].data) * parseFloat(gradeList[i].credit));
      /* 东北大学5.0算法 */
      sum_neu += (parseFloat(gradeList[i].extraData[6].data) / 10 - 5) * parseFloat(gradeList[i].credit);
      sum_credit += parseFloat(gradeList[i].credit);
      /* 算术平均分 */
      sum_score += parseFloat(gradeList[i].extraData[6].data);
      /* 加权平均分 */
      sum_weight += parseFloat(gradeList[i].extraData[6].data) * parseFloat(gradeList[i].credit);
    }
    // console.log(sum_score);
    // console.log(sum_credit);
    // console.log("neu: " + sum_neu / sum_credit);
    // console.log("four: " + sum_four / sum_credit * 4 / 100);
    // console.log("standrad4.0: " + sum_standrad / sum_credit);
    // console.log("advanced_4.0: " + sum_advanced / sum_credit);
    // console.log("advanced_4.0_new: " + sum_advanced_new / sum_credit);
    // console.log("beida4.0: " + sum_pku / sum_credit);
    // console.log("canada4.3: " + sum_canada / sum_credit);
    // console.log("ustc4.3: " + sum_ustc / sum_credit);
    // console.log("sjtu4.3: " + sum_sjtu / sum_credit);
    that.setData({
      neu: (sum_neu / sum_credit).toFixed(4),
      four: (sum_four / sum_credit * 4 / 100).toFixed(4),
      standrad: (sum_standrad / sum_credit).toFixed(4),
      advanced1: (sum_advanced / sum_credit).toFixed(4),
      advanced2: (sum_advanced_new / sum_credit).toFixed(4),
      pku: (sum_pku / sum_credit).toFixed(4),
      canada: (sum_canada / sum_credit).toFixed(4),
      ustc: (sum_ustc / sum_credit).toFixed(4),
      sjtu: (sum_sjtu / sum_credit).toFixed(4),
      zju: (sum_zju / sum_credit).toFixed(4),
      score: (sum_score / gradeList.length).toFixed(4),
      weight: (sum_weight / sum_credit).toFixed(4),
      sum_credit: sum_credit,
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;　　 // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      title: "在东大 | 东大人的留学GPA计算器",
      path: '/pages/grade/calculator/calculator',
      imageUrl: 'https://s2.ax1x.com/2019/01/20/kCDKJJ.jpg',
    };
    return shareObj;
  },
});