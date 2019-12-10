/*
*
* 目前QQ小程序还没能力开发出登录网关的功能
*
*/



// pages/ipgw/ipgw.js
Page({

  data: {
    checked: true,
    status: "未连接",
    response: '',
    saveme: true,
    info_arr: [],
    info_str: '',
    time: '',
    usedtime: "",
    use: '',
    money: '',
    addressip: '',
    popupVisible: false,
    logout_state: false,
    username: '',
    password: '',
    action: 'login',
    ac_id: "1",
    user_mac: "",
    user_ip: "",
    nas_ip: "",
    url: ""
  },

  connect_wifi: function () {
    wx.startWifi({
      success(res) {
        console.log(res.errMsg);

        wx.connectWifi({
          SSID: 'NEU',
          BSSID: '',
          password: '',
          success(res) {
            console.log(res.errMsg)
          }
        });
      }
    });

    loginIn();
  },

  change_input: function (e) {
    this.setData({
      username: e.detail.value
    })
    console.log(this.username)
  },

  onReady: function () {
    let _this = this
    const ready_username = wx.getStorageSync("ipgw_username")
    if (ready_username) {
      let ipgw_username = wx.getStorageSync("ipgw_username")
      let ipgw_password = wx.getStorageSync("ipgw_password")
      _this.setData({
        username: ipgw_username,
        password: ipgw_password
      })
      console.log(_this.data.username);
      console.log(_this.data.password);
      _this.upload();
    }
  },

  useridInput: function (e) {
    this.setData({
      username: e.detail
    })
    console.log(this.data.username)
  },

  passwdInput: function (e) {
    this.setData({
      password: e.detail
    })
  },

  format_time: function (sec) {
    var h = Math.floor(sec / 3600);
    var m = Math.floor((sec % 3600) / 60);
    var s = sec % 3600 % 60;
    var out = "";
    if (h < 10) {
      out += "0" + h + " : ";
    }
    else {
      out += h + " : ";
    }

    if (m < 10) {
      out += "0" + m + " : ";
    }
    else {
      out += m + " : ";
    }

    if (s < 10) {
      out += "0" + s + "";
    }
    else {
      out += s + "";
    }
    return out;
  },

  format_flux: function (byte)//格式化流量
  {
    if (byte > (1024 * 1024 * 1024))
      return (this.format_number((byte / (1024 * 1024 * 1024)), 2) + "G");
    if (byte > (1024 * 1024))
      return (this.format_number((byte / (1024 * 1024)), 2) + "M");
    if (byte > 1024)
      return (this.format_number((byte / 1024), 2) + "K");
    return byte + "b";
  },

  format_number: function (num, count) {
    var n = Math.pow(10, count);
    var t = Math.round(num * n);
    return t / n;
  },

  loginIn: function () {
    this.loginEoneAndIpgw();
  },

  upload: function () {
    let _this = this;
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    }
    wx.request({
      url: "https://ipgw.neu.edu.cn/include/auth_action.php",
      header: headers,
      data: {
        "action": "get_online_info",
      },
      method: "POST",
      success: function (res) {
        let ipgw_data = res.data;
        let ipgw_array = ipgw_data.split(",");
        console.log(ipgw_array[0]);
        let ipgw_use = "" + parseInt(ipgw_array[0].substring(0, 5)) + "." + ipgw_array[0].substring(5, 7) + "M"
        let ipgw_money = "￥" + ipgw_array[2]
        let ipgw_address = ipgw_array[5]
        let ipgw_usedtime = _this.format_time(parseInt(ipgw_array[1]))
        console.log(ipgw_address)
        console.log(ipgw_array[5])
        _this.use = ipgw_use;
        console.log(_this.use)
        _this.setData({
          'use': ipgw_use,
          'money': ipgw_money,
          'addressip': ipgw_address,
          'status': "已连接",
          "usedtime": ipgw_usedtime
        })

        console.log(ipgw_array[1])
        console.log(ipgw_data);
      },
    })
  },

  loginEoneAndIpgw: function() {
    let stuID = wx.getStorageSync("stuID");
    let password = wx.getStorageSync("stuPass_eone");
    wx.request({
      url: "https://pass.neu.edu.cn/tpass/login?service=https%3A%2F%2Fipgw.neu.edu.cn%2Fsrun_cas.php%3Fac_id%3D1",
      method: 'GET',
      success: function(res) {
        let jsessionid = res.header['Set-Cookie'].match(/jsessionid_tpass=(.+); p/)[1];
        let lt = res.data.match(/name="lt" value="(.+)"/)[1];
        let execution = res.data.match(/name="execution" value="(.*?)"/)[1];
        let submit_data = {
          'rsa': stuID+password+lt,
          'ul': String(stuID.length),
          'pl': String(password.length),
          'lt': lt,
          'execution': execution,
          '_eventId': 'submit'
        };
        let headers = {
            "Content-type": "application/x-www-form-urlencoded",
            "Cookie": "jsessionid_tpass="+jsessionid
        }
        var req = wx.request({
          url: "https://pass.neu.edu.cn/tpass/login?service=https%3A%2F%2Fipgw.neu.edu.cn%2Fsrun_cas.php%3Fac_id%3D1",
          method: 'POST',
          data: submit_data,
          header: headers,
          complete: function(res) {
            console.log(res)
          }
        });
        req.onHeadersReceived(function(resp_header){
          console.log(resp_header)
        });
      }
    })
  },

  loginOut: function () {
    let _this = this;
    let logout_data = {
      "action": "logout",
      "username": _this.data.username,
      "password": _this.data.password,
      "ajax": "1"
    }
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    wx.request({
      url: 'https://ipgw.neu.edu.cn/include/auth_action.php',
      header: headers,
      data: logout_data,
      method: 'POST',
      success: function (res) {
        _this.setData({
          status: "未连接",
          use: "",
          money: "",
          addressip: "",
          usedtime: "",
        })
      },
      error: function () {
        MessageBox('提示', '您未曾连接到网络')
      }
    })
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