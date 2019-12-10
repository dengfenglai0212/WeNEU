var app = getApp();

Page({

  data: {
    isLoggedIn: false, //是否已登录
    trades: [],
    balance: '--.--',
    subsidy: '-.-元',
    status: '查询中',
    cardID: '',
    name: '',
    record: [],
    page: '',
    passwd: '',
    loading: false,
    list_length: 0,
    trade_page: 0,
    circle_len: '120',
    square: '12px'
  },

  /* 进入查看交易汇总界面 */
  seeDetail: function(){
    wx.navigateTo({
      url: 'detail/detail'
    })
  },

  onReachBottom: function() {

    if(app.IsTourist) {

    }else {
      if (this.data.trade_page==0) {
        return
      }
      var $this = this;
      
      wx.request({
        url: 'https://weneu.neuyan.com/eCard/getTradeRecord',
        data: {
          'stuID': $this.data.cardID,
          'stuPass': $this.data.passwd,
          'page': $this.data.trade_page
        },
        method: 'POST',
        dataType: 'json',
        success: function(res) {
          var tempArr = $this.data.record;
          for(let i=0;i<res.data.data.length;i++) {
            tempArr.push(res.data.data[i])
          }
          $this.setData({
            record:tempArr,
          });
          console.log(res);
          $this.data.trade_page++;
        }
      })
    }
    
  },

  drawCanvas: function(context, centerX, centerY, r1, r2, table_data, color_arr) {

    var drawAt = 0.5*Math.PI;

    for(let i = 0; i < table_data.length;i++) {
      context.beginPath();
      context.arc(centerX, centerY, r1, -drawAt, -(2*Math.PI*table_data[i]+drawAt), true);
      context.arc(centerX, centerY, r2, -(2*Math.PI*table_data[i]+drawAt), -drawAt, false);
      context.setFillStyle(color_arr[i]);
      context.fill();
      context.draw(true);
      drawAt += 2*Math.PI*table_data[i];
    }
    // 绘制中心白色圆 避免Android bug
    context.beginPath();
    context.arc(centerX, centerY, r1, 0, 2*Math.PI, true);
    context.setFillStyle("#FFF");
    context.fill();
    context.draw(true);

    // context.beginPath();
    // context.arc(centerX, centerY, r1, 0, -0.4*Math.PI, true);
    // context.arc(centerX, centerY, r2, -0.4*Math.PI, 0, false);
    // context.setFillStyle('blue');
    // context.fill();
    // context.draw(true);

    // context.beginPath();
    // context.arc(80, 80, 60, -0.4*Math.PI,-0.8*Math.PI, true);
    // context.arc(80, 80, 75, -0.8*Math.PI, -0.4*Math.PI, false);
    // context.setFillStyle('yellow');
    // context.fill();
    // context.draw(true);
  },
  
  onLoad: function() {

    if(app.IsTourist) {

    }else {
      this.setData({
        cardID: wx.getStorageSync('stuID'),
        passwd: wx.getStorageSync('stuPass_eone')
      });
    }
  },
  onShow() {
    var $this = this;

    // 判断登录状态决定显示内容
    if (app.isLoggedIn()) {
      $this.showDetail($this);
      this.setData({
        isLoggedIn: true
      });
    } else {
      this.setData({
        isLoggedIn: false
      });
    }
  },
  showDetail($this) {

    //根据视图设置统计圆环大小
    $this.setCircleSize();

    var tourist = app.globalData.tourist;

    console.log(tourist);
    if(app.IsTourist) {

      // 统计圆环
      const colors = ['#e87949', '#a2b65c', '#b1b0c1', '#e0e5ac', '#ff3333'];
      var trade_sum = 0;
      var _trades = [];
      var cost_arr = [];
      for(let i=0; i < tourist.ykt.sumTotal.length; i++) {
        _trades.push({'color': colors[i], 'description': tourist.ykt.sumTotal[i].description, 'cost':tourist.ykt.sumTotal[i].cost});
        trade_sum +=  Number(tourist.ykt.sumTotal[i].cost);
        cost_arr.push(Number(tourist.ykt.sumTotal[i].cost));
      }
      for(let i=0; i < cost_arr.length; i++) {
        cost_arr[i]/=trade_sum;
      }
      $this.setData({
        trades: _trades
      });
      var context = wx.createCanvasContext('firstCanvas');
      if($this.data.circle_len == '120') {
        $this.drawCanvas(context, 60, 60, 40, 55, cost_arr, colors);
      }else if($this.data.circle_len == '200') {
        $this.drawCanvas(context, 90, 90, 60, 85, cost_arr, colors);
      }else if($this.data.circle_len == '220') {
        $this.drawCanvas(context, 100, 100, 70, 95, cost_arr, colors);
      }else {
        $this.drawCanvas(context, 110, 110, 75, 100, cost_arr, colors);
      }

      // 设置其他属性
      //消费记录
      $this.setData({
        record: tourist.ykt.detail,
        loading: true
      });
      $this.data.trade_page++;

      //余额统计
      $this.setData({
        balance: tourist.wallet.banlance,
        subsidy: 0
      });

      //网络
      $this.setData({
        net_balance: tourist.wallet.network_balance,
        net_time: 123456789,
        net_bytes: tourist.wallet.network_flow,
      });


    }else {
      // 消费记录
      wx.request({
        url: 'https://weneu.neuyan.com/eCard/getTradeSum',
        method: 'POST',
        data: {
          'stuID': $this.data.cardID,
          'stuPass': $this.data.passwd,
        },
        success: function(res) {
          const colors = ['#e87949', '#a2b65c', '#b1b0c1', '#e0e5ac', '#ff3333'];
          var trade_sum = 0;
          var _trades = [];
          var cost_arr = [];
          for(let i=0; i < res.data.data.length; i++) {
            _trades.push({'color': colors[i], 'description': res.data.data[i].description, 'cost':res.data.data[i].cost});
            trade_sum +=  Number(res.data.data[i].cost);
            cost_arr.push(Number(res.data.data[i].cost));
          }
          for(let i=0; i < cost_arr.length; i++) {
            cost_arr[i]/=trade_sum;
          }
          $this.setData({
            trades: _trades
          });
          var context = wx.createCanvasContext('firstCanvas');
          if($this.data.circle_len == '120') {
            $this.drawCanvas(context, 60, 60, 40, 55, cost_arr, colors);
          }else if($this.data.circle_len == '200') {
            $this.drawCanvas(context, 90, 90, 60, 85, cost_arr, colors);
          }else if($this.data.circle_len == '220') {
            $this.drawCanvas(context, 100, 100, 70, 95, cost_arr, colors);
          }else {
            $this.drawCanvas(context, 110, 110, 75, 100, cost_arr, colors);
          }
        }
      });

      
      //$this.drawCanvas(context, 80, 80, 40, 55, [0.4, 0.3, 0.2, 0.1], ['66ff66', '#99d6ff', 'red', 'black']);

      // wx.request({
      //     url: 'https://weneu.neuyan.com/uuia',
      //     data: {
      //       'group': 'base',
      //       'action': 'eCard',
      //       'stuID': $this.data.cardID,
      //       'password': $this.data.passwd,s
      //     },
      //     method: 'POST',
      //     dataType: 'json',
      //     success: function(res) {
      //       let subsidy = $this.getKey(res.data.data.extraData,"补助余额");
      //       let card_status = $this.getKey(res.data.data.extraData,"校卡状态")
      //       $this.setData({
      //         balance: res.data.data.balance,
      //         name: res.data.data.name,
      //         cardID: res.data.data.studentID,
      //         subsidy:subsidy,
      //         status: card_status
      //       });
      //       console.log(res.data.data);
      //     }
      //   }),

        wx.request({
          url: 'https://weneu.neuyan.com/eCard/getTradeRecord',
          data: {
            'stuID': $this.data.cardID,
            'stuPass': $this.data.passwd,
            'page': $this.data.trade_page
          },
          method: 'POST',
          dataType: 'json',
          success: function(res) {
            $this.setData({
              record:res.data.data,
              loading: true
            });
            console.log($this.data.record);
            $this.data.trade_page++;
          }
        }),

        // 余额
        wx.request({
          url: 'https://weneu.neuyan.com/api/cardMoney',
          data: {
            'stuID': $this.data.cardID,
            'stuPass': $this.data.passwd,
          },
          method: 'POST',
          dataType: 'json',
          success: function (res) {
            $this.setData({
              balance: res.data.data.card_balance / 100,
              subsidy: res.data.data.sub_card_balance / 100
            });
            console.log(res.data);
          }
        }),

        // 校园网
      wx.request({
        url: 'https://weneu.neuyan.com/api/wlzzList',
        data: {
          'stuID': $this.data.cardID,
          'stuPass': $this.data.passwd,
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          var temp_user_balance = res.data.data.user_balance.toFixed(2)
          var temp_sum_seconds = (res.data.data.sum_seconds/3600).toFixed(2)
          var temp_sum_bytes = (res.data.data.sum_bytes/1000000).toFixed(2)
          $this.setData({
            net_balance: temp_user_balance,
            net_time: temp_sum_seconds,
            net_bytes: temp_sum_bytes,
          });
          console.log(res.data.data);
        }
      })
    }
  },

  setCircleSize() {
    var $this = this;
    wx.getSystemInfo({
      success: e => {       
        $this.setData({
          circle_len: e.screenHeight > 1000 & e.screenHeight < 1100? 200 : e.screenHeight > 1100 & e.screenHeight < 1300 ? 220 : e.screenHeight > 1300 ? 240 : parseInt($this.data.circle_len),
          square: (e.screenWidth / 20) - 4 + 'px'
        });
      }
    })
    // console.log($this.data.circle_len);
  },

  getKey: function(input_arr, data_key) {
    for(let i=0;i<input_arr.length;i++) {
      if(input_arr[i]['key'] == data_key) {
        return input_arr[i]['data'];
      }
    }
    return "";
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