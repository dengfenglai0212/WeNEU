// pages/math_reserve/math_reserve.js
const hashLib = require('../../utils/md5.js');
var app = getApp();
function getHumanDate(timestamp) {
  var translate_date = new Date(timestamp);
  var day_name = '';
  if (translate_date.getDay() == 1) {
    day_name = '周一';
  } else if (translate_date.getDay() == 2) {
    day_name = '周二';
  } else if (translate_date.getDay() == 3) {
    day_name = '周三';
  } else if (translate_date.getDay() == 4) {
    day_name = '周四';
  } else if (translate_date.getDay() == 5) {
    day_name = '周五';
  } else if (translate_date.getDay() == 6) {
    day_name = '周六';
  } else if (translate_date.getDay() == 7) {
    day_name = '周日';
  }
  return translate_date.getFullYear() + '-' + (translate_date.getMonth() + 1) + '-' + translate_date.getDate() + ' ' + day_name;
}

function isOutOfTime(date_time, end_time) {
  var add_time = Number(/(\d+):(\d+)/i.exec(end_time)[1]) * 60 * 60 * 1000 + Number(/(\d+):(\d+)/i.exec(end_time)[2]) * 60 * 1000;
  var end_time_value = Number(date_time) + add_time;
  var now = new Date();
  if (now.getTime() > end_time_value) {
    return true;
  } else {
    return false;
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper_height: wx.getSystemInfoSync().screenHeight - app.globalData.StatusBar,
    paper_index: '0',
    date_index: '0',
    room_index: '0',
    round_index: '0',
    paper_range: [],
    date_range: [],
    room_range: [],
    round_range: [],
    papers: [],
    dates: [],
    rooms: [],
    rounds: [],
    seats: 0,
    my_papers: [],
    papers_processed: [],
    is_login_reserve: false,
    display_out_of_date: false,
    user_id: wx.getStorageSync('stuID'), 
    token: '',
    on_login: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.getStorage({
      key: 'reserve_password',
      fail: function(res) {},
      success: function(res) {
        wx.request({
          url: 'https://mathe.neu.edu.cn:8080/api/auth/login',
          method: 'POST',
          data: {
            username: wx.getStorageSync('stuID'),
            password: hashLib.hexMD5(res.data)
          },
          fail: function(res){
            wx.showToast({
              title: '网络异常',
              duration: 1000,
              icon: 'none'
            });
            wx.navigateBack({
              delta: 1
            });
          },
          success: function (login_res) {
            console.log(login_res);
            if (login_res.data.code == 0) {
              wx.setStorage({
                key: 'reserve_token',
                data: login_res.data.data.token,
              });
              _this.setData({
                token: login_res.data.data.token,
                is_login_reserve: true,
              });
              _this.onLoginSuccess();
            } else if(login_res.data.code==-303) {
              wx.showToast({
                title: '密码不正确',
                icon: 'none',
                duration: 1000
              })
            }
          }
        })
      },
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
   * 登录函数
   */
  onLogin: function(e) {
    var values = e.detail.value;
    var _this = this;
    if(values.reserve_password<5 || values.user_id<6) {
      wx.showToast({
        title: '密码或学号过短',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    _this.data.on_login = true;
    wx.request({
      url: 'https://mathe.neu.edu.cn:8080/api/auth/login',
      method: 'POST',
      data: {
        username: wx.getStorageSync('stuID'),
        password: hashLib.hexMD5(values.password)
      },
      fail: function(res) {
        wx.showToast({
          title: '请于校园网环境登录',
          icon: 'none',
          duration: 2000
        });
        _this.data.on_login = false;
      },
      success: function(login_res) {
        console.log({
          username: _this.data.user_id,
          password: values.password
        });
        console.log(login_res);
        if(login_res.data.code==0) {
          wx.setStorage({
            key: 'reserve_token',
            data: login_res.data.data.token,
          });
          wx.setStorage({
            key: 'reserve_password',
            data: values.password,
          })
          _this.setData({
            token: login_res.data.data.token,
            is_login_reserve: true,
          });
          _this.onLoginSuccess();
        } else if(login_res.data.code==-303) {
          wx.showToast({
            title: '密码错误',
            icon: 'none',
            duration: 2000
          });
          _this.data.on_login = false;
        } else {
          wx.showToast({
            title: '未知错误',
            icon: 'none',
            duration: 2000
          });
          _this.data.on_login = false;
        }
      }
    })
  },

  /**
   * 登录成功后执行
   * 加载可选考试和已选考试
   */
  onLoginSuccess: function() {
    var _this = this;
    var token = _this.data.token;
    wx.request({
      url: 'https://mathe.neu.edu.cn:8080/api/v2/reserve/papers',
      method: 'POST',
      data: { token: token },
      success: function (res) {
        if (res.data.code == 0) {
          _this.setData({ papers: res.data.data });
          var new_paper = [];
          for (var i = 0; i < res.data.data.length; i++) {
            new_paper.push(res.data.data[i].exam_name);
          }
          _this.setData({ paper_range: new_paper });
          if (_this.data.papers.length > 0) {
            wx.request({
              url: 'https://mathe.neu.edu.cn:8080/api/v2/reserve/dates',
              method: 'POST',
              data: { token: token, paper_id: _this.data.papers[0].paper_id },
              success: function (date_res) {
                if (date_res.data.code == 0) {
                  _this.setData({ dates: date_res.data.data });
                  var new_date = [];
                  for (var i = 0; i < date_res.data.data.length; i++) {
                    new_date.push(getHumanDate(date_res.data.data[i].date));
                  }
                  _this.setData({ date_range: new_date });
                  wx.request({
                    url: 'https://mathe.neu.edu.cn:8080/api/v2/reserve/rooms',
                    method: 'POST',
                    data: { token: _this.data.token, date_id: _this.data.dates[0].date_id },
                    success: function (room_res) {
                      if (room_res.data.code == 0) {
                        var new_room = []
                        for (var i = 0; i < room_res.data.data.length; i++) {
                          new_room.push(room_res.data.data[i].room_name);
                        }
                        _this.setData({ rooms: room_res.data.data });
                        _this.setData({ room_range: new_room })
                        wx.request({
                          url: 'https://mathe.neu.edu.cn:8080/api/v2/reserve/rounds',
                          method: 'POST',
                          data: {
                            date_id: _this.data.dates[0].date_id,
                            paper_id: _this.data.papers[0].paper_id,
                            room_id: _this.data.rooms[0].room_id,
                            token: token
                          },
                          success: function (round_res) {
                            if (round_res.data.code == 0) {
                              var new_round = [];
                              _this.setData({ rounds: round_res.data.data });
                              for (var i = 0; i < round_res.data.data.length; i++) {
                                new_round.push(round_res.data.data[i].round_name + ' ' + round_res.data.data[i].round_time_start + '-' + round_res.data.data[i].round_time_end);
                              }
                              _this.setData({ round_range: new_round });
                              wx.request({
                                url: 'https://mathe.neu.edu.cn:8080/api/v2/reserve/seats',
                                method: 'POST',
                                data: {
                                  date_id: _this.data.dates[0].date_id,
                                  room_id: _this.data.rooms[0].room_id,
                                  round_id: _this.data.rounds[0].round_id,
                                  token: _this.data.token
                                },
                                success: function (seat_res) {
                                  if (seat_res.data.code == 0) {
                                    _this.setData({ seats: seat_res.data.data.seats });
                                  }
                                }
                              })
                            }
                          }
                        })
                      }
                    }
                  })
                }
              }
            })
          }
        } else {
          console.log(res.data);
        }
      }
    });
    wx.request({
      url: 'https://mathe.neu.edu.cn:8080/api/v2/reserve/mine',
      method: 'POST',
      data: { token: token },
      success: function (mine_res) {
        if (mine_res.data.code == 0) {
          var now = new Date();
          var paper_arr = mine_res.data.data
          _this.setData({ my_papers: mine_res.data.data });
          var paper_new = [];
          for (var i = 0; i < paper_arr.length; i++) {
            var isOutof = isOutOfTime(paper_arr[i].reserve_date, paper_arr[i].end_time);
            var canCancel = false;
            if (paper_arr[i].revocation_limit > paper_arr[i].revocation_used) {
              var exam_time = paper_arr[i].reserve_date + Number(/(\d+):(\d+)/i.exec(paper_arr[i].start_time)[1]) * 60 * 60 * 1000 + Number(/(\d+):(\d+)/i.exec(paper_arr[i].start_time)[2]) * 60 * 1000;
              if (exam_time > now.getTime() + (1000 * 60 * 60 * 24)) {
                canCancel = true;
              }
            }
            paper_new.push({
              id: paper_arr[i].id,
              name: paper_arr[i].exam_name,
              room_name: paper_arr[i].room_name,
              round_name: paper_arr[i].round_name,
              start_time: paper_arr[i].start_time,
              end_time: paper_arr[i].end_time,
              seat_name: paper_arr[i].seat_name,
              is_out_of: isOutof,
              can_cancel: canCancel,
              date_str: getHumanDate(paper_arr[i].reserve_date)
            });
          }
          _this.setData({ papers_processed: paper_new });
        }
      }
    })
  },

  /**
   * 改变选择的考试
   */
  bindPaperChange: function (e) {
    var value_set = e.detail.value;
    this.setData({
      paper_index: value_set
    });
    var _this = this;
    var token = this.data.token;
    wx.request({
      url: 'https://mathe.neu.edu.cn:8080/api/v2/reserve/dates',
      method: 'POST',
      data: { token: token, paper_id: _this.data.papers[_this.data.paper_index].paper_id },
      success: function (date_res) {
        if (date_res.data.code == 0) {
          _this.setData({ dates: date_res.data.data });
          var new_date = [];
          for (var i = 0; i < date_res.data.data.length; i++) {
            new_date.push(getHumanDate(date_res.data.data[i].date));
          }
          _this.setData({ date_range: new_date });
          wx.request({
            url: 'https://mathe.neu.edu.cn:8080/api/v2/reserve/rooms',
            method: 'POST',
            data: { token: _this.data.token, date_id: _this.data.dates[0].date_id },
            success: function (room_res) {
              if (room_res.data.code == 0) {
                var new_room = []
                for (var i = 0; i < room_res.data.data.length; i++) {
                  new_room.push(room_res.data.data[i].room_name);
                }
                _this.setData({ rooms: room_res.data.data });
                _this.setData({ room_range: new_room })
                wx.request({
                  url: 'https://mathe.neu.edu.cn:8080/api/v2/reserve/rounds',
                  method: 'POST',
                  data: {
                    date_id: _this.data.dates[0].date_id,
                    paper_id: _this.data.papers[0].paper_id,
                    room_id: _this.data.rooms[0].room_id,
                    token: token
                  },
                  success: function (round_res) {
                    if (round_res.data.code == 0) {
                      var new_round = [];
                      _this.setData({ rounds: round_res.data.data });
                      for (var i = 0; i < round_res.data.data.length; i++) {
                        new_round.push(round_res.data.data[i].round_name + ' ' + round_res.data.data[i].round_time_start + '-' + round_res.data.data[i].round_time_end);
                      }
                      _this.setData({ round_range: new_round });
                      wx.request({
                        url: 'https://mathe.neu.edu.cn:8080/api/v2/reserve/seats',
                        method: 'POST',
                        data: {
                          date_id: _this.data.dates[_this.data.date_index].date_id,
                          room_id: _this.data.rooms[_this.data.room_index].room_id,
                          round_id: _this.data.rounds[_this.data.round_index].round_id,
                          token: _this.data.token
                        },
                        success: function (seat_res) {
                          if (seat_res.data.code == 0) {
                            _this.setData({ seats: seat_res.data.data.seats });
                          }
                        }
                      })
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
  },

  /**
   * 改变选择的日期
   */
  bindDateChange: function (e) {
    var value_set = e.detail.value;
    this.setData({
      date_index: value_set
    });
    var _this = this;
    var token = this.data.token;
    wx.request({
      url: 'https://mathe.neu.edu.cn:8080/api/v2/reserve/rooms',
      method: 'POST',
      data: { token: _this.data.token, date_id: _this.data.dates[_this.data.date_index].date_id },
      success: function (room_res) {
        if (room_res.data.code == 0) {
          var new_room = []
          for (var i = 0; i < room_res.data.data.length; i++) {
            new_room.push(room_res.data.data[i].room_name);
          }
          _this.setData({ rooms: room_res.data.data });
          _this.setData({ room_range: new_room });
          wx.request({
            url: 'https://mathe.neu.edu.cn:8080/api/v2/reserve/rounds',
            method: 'POST',
            data: {
              date_id: _this.data.dates[_this.data.date_index].date_id,
              paper_id: _this.data.papers[_this.data.paper_index].paper_id,
              room_id: _this.data.rooms[_this.data.room_index].room_id,
              token: token
            },
            success: function (round_res) {
              if (round_res.data.code == 0) {
                var new_round = [];
                _this.setData({ rounds: round_res.data.data });
                for (var i = 0; i < round_res.data.data.length; i++) {
                  new_round.push(round_res.data.data[i].round_name + ' ' + round_res.data.data[i].round_time_start + '-' + round_res.data.data[i].round_time_end);
                }
                _this.setData({ round_range: new_round });
                wx.request({
                  url: 'https://mathe.neu.edu.cn:8080/api/v2/reserve/seats',
                  method: 'POST',
                  data: {
                    date_id: _this.data.dates[_this.data.date_index].date_id,
                    room_id: _this.data.rooms[_this.data.room_index].room_id,
                    round_id: _this.data.rounds[_this.data.round_index].round_id,
                    token: _this.data.token
                  },
                  success: function (seat_res) {
                    if (seat_res.data.code == 0) {
                      _this.setData({ seats: seat_res.data.data.seats });
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
  },

  /**
   * 改变选择的考场
   */
  bindRoomChange: function (e) {
    var value_set = e.detail.value;
    this.setData({
      room_index: value_set
    });
    var _this = this;
    var token = this.data.token;
    wx.request({
      url: 'https://mathe.neu.edu.cn:8080/api/v2/reserve/rounds',
      method: 'POST',
      data: {
        date_id: _this.data.dates[_this.data.date_index].date_id,
        paper_id: _this.data.papers[_this.data.paper_index].paper_id,
        room_id: _this.data.rooms[_this.data.room_index].room_id,
        token: token
      },
      success: function (round_res) {
        if (round_res.data.code == 0) {
          var new_round = [];
          _this.setData({ rounds: round_res.data.data });
          for (var i = 0; i < round_res.data.data.length; i++) {
            new_round.push(round_res.data.data[i].round_name + ' ' + round_res.data.data[i].round_time_start + '-' + round_res.data.data[i].round_time_end);
          }
          _this.setData({ round_range: new_round });
          wx.request({
            url: 'https://mathe.neu.edu.cn:8080/api/v2/reserve/seats',
            method: 'POST',
            data: {
              date_id: _this.data.dates[_this.data.date_index].date_id,
              room_id: _this.data.rooms[_this.data.room_index].room_id,
              round_id: _this.data.rounds[_this.data.round_index].round_id,
              token: _this.data.token
            },
            success: function (seat_res) {
              if (seat_res.data.code == 0) {
                _this.setData({ seats: seat_res.data.data.seats });
              }
            }
          })
        }
      }
    })
  },

  /**
   * 改变选择的场次
   */
  bindRoundChange: function (e) {
    var value_set = e.detail.value;
    this.setData({
      round_index: value_set
    });
    var _this = this;
    var token = this.data.token;
    wx.request({
      url: 'https://mathe.neu.edu.cn:8080/api/v2/reserve/seats',
      method: 'POST',
      data: {
        date_id: _this.data.dates[_this.data.date_index].date_id,
        room_id: _this.data.rooms[_this.data.room_index].room_id,
        round_id: _this.data.rounds[_this.data.room_index].round_id,
        token: _this.data.token
      },
      success: function (seat_res) {
        if (seat_res.data.code == 0) {
          _this.setData({ seats: seat_res.data.data.seats });
        }
      }
    })
  },

  /**
   * 提交选座
   */
  submitChoice: function (e) {
    var form_value = e.detail.value;
    var submit_value = {
      date_id: this.data.dates[this.data.date_index].date_id,
      paper_id: this.data.papers[this.data.paper_index].paper_id,
      room_id: this.data.rooms[this.data.room_index].room_id,
      round_id: this.data.rounds[this.data.round_index].round_id,
      token: this.data.token
    };
    wx.showModal({
      title: '确定要预约此场考试吗？',
      content: '请仔细核对您的预约信息，选考成功后一共有' + this.data.papers[this.data.paper_index].revocation_limit + '次撤销机会，您还剩' + (this.data.papers[this.data.paper_index].revocation_limit - this.data.papers[this.data.paper_index].revocation_used) + '次机会',
      success: function (choose_res) {
        if (choose_res.confirm) {
          wx.request({
            url: 'https://mathe.neu.edu.cn:8080/api/v2/reserve/try',
            method: 'POST',
            data: submit_value,
            success: function (try_res) {
              if (try_res.data.code == 0) {
                wx.showToast({
                  title: '预约成功',
                  icon: 'success',
                  duration: 2000
                });
                var page = getCurrentPages().pop();
                page.onLoad();
              } else if (try_res.data.code == 1002) {
                wx.showToast({
                  title: '考试已预约过',
                  icon: 'success',
                  duration: 4000
                })
              } else {
                wx.showToast({
                  title: '提交异常',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        }
      }
    })
  },

  onSwitchChange: function (e) {
    this.setData({ display_out_of_date: e.detail.value });
  },

  cancel: function (e) {
    var cancel_data = e;
    var _this = this;
    wx.showModal({
      title: '确定撤销此次考试吗',
      content: '您可能因此而损失您的位置，请谨慎选择',
      success: function (choose_res) {
        if (choose_res.confirm) {
          var cancel_id = Number(cancel_data.detail.value.paper_id);
          wx.request({
            url: 'https://mathe.neu.edu.cn:8080/api/v2/reserve/cancel',
            method: 'POST',
            data: { id: cancel_id, token: _this.data.token },
            success: function (cancel_res) {
              if (cancel_res.data.code == 0) {
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 2000
                })
                var page = getCurrentPages().pop();
                page.onLoad();
              } else {
                wx.showToast({
                  title: '无法撤销',
                  icon: 'none',
                  duration: 2000
                });
                console.log(cancel_data);
                console.log({ id: cancel_id, token: _this.data.token });
                console.log(cancel_res);
              }
            }
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})