import * as echarts from '../../../ec-canvas/echarts';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardID: '',
    passwd: '',
    startDate: '点击选择',
    endDate: '点击选择',
    currentDate: new Date().getTime(),
    minDate: new Date(2016, 8, 1).getTime(),
    maxDate: new Date().getTime(),
    show1: false,
    show2: false,
    selfRecord: '',
    ec: {
      lazyLoad: true
    },
    map: []
  },
  //时间戳转日期格式
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  },
  //点击选择起始日期
  selectStart() {
    this.setData({
      show1: true,
      show2: false
    });
  },
  //确定起始日期
  onClose1(event) {
    var date = this.formatDate(event.detail);
    this.setData({
      show1: false,
      startDate: date
    });
    console.log(this.data.startDate);
  },
  //取消选择结束日期
  onCancel1(event) {
    this.setData({
      show1: false
    });
  },
  //点击选择结束日期
  selectEnd() {
    this.setData({
      show2: true,
      show1: false
    });
  },
  //确定结束日期
  onClose2(event) {
    var date = this.formatDate(event.detail);
    this.setData({
      show2: false,
      endDate: date
    });
    console.log(this.data.endDate);
  },
  //取消选择结束日期
  onCancel2(event) {
    this.setData({
      show2: false
    });
  },
  getPie(chart) {
    const option = {
      backgroundColor: "#ffffff",
      color: ["#40a9ff", "#bae637", "#ffa940", "#f759ab", "#36cfc9", "#ffec3d", "#ff7a45", "#9254de", "#73d13d", "#ffc53d", "#ff4d4f", "#597ef7"],
      series: [{
        label: {
          normal: {
            fontSize: 14
          }
        },
        type: 'pie',
        center: ['50%', '50%'],
        radius: [0, '60%'],
        data: this.data.map,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 2, 2, 0.3)'
          }
        }
      }]
    };

    chart.setOption(option);
  },
  // 初始化图表
  init: function () {
    var $this = this;
    this.ecComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.getPie(chart);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;
      return chart;
    });
  },
  //查询
  search(){
    var $this = this;
    // wx.showLoading({
    //   title: '正在加载....',
    // })
    wx.showNavigationBarLoading();
    wx.request({
      url: 'https://neuvwo.com/mini/api/getSumRecord',
      data: {
        'stuID': $this.data.cardID,
        'cardPass': $this.data.passwd,
        'startDate': $this.data.startDate,
        'endDate': $this.data.endDate
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data);
        $this.setData({
          selfRecord: res.data.data
        });
        $this.init();
        $this.setData({
          isLoaded: true
        });
        var tempArr = Object.getOwnPropertyNames(res.data.data);
        console.log(tempArr);
        console.log($this.data.selfRecord.餐费支出);
        var tempMap = [];
        for (var i = 0; i < tempArr.length; i++){
          console.log(tempArr[i]);
          // tempMap.push({ name: tempArr[i], value: $this.data.selfRecord.tempArr[i]});
          tempMap.push({ name: tempArr[i], value: 25.00});
        }
        $this.setData({
          map: tempMap
        });
      }
    })
    wx.hideToast();
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var $this = this;
    this.setData({
      cardID: wx.getStorageSync('stuID'),
      passwd: wx.getStorageSync('stuPass_ykt')
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.ecComponent = this.selectComponent('#mychart-dom-pie');
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