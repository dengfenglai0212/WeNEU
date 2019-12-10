import * as echarts from '../../ec-canvas/echarts';

Page({
  getBar1(chart, last, now) {
    const option = {
      title: {
        text: '就餐人次',
        left: 'center',
      },
      color: ['#eaff8f', '#bae637'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['昨天', '今天'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      series: [{
          name: '昨天',
          type: 'bar',
          label: {
            normal: {
              color: 'black',
              show: true,
              position: 'top'
            }
          },
        data: [last, now]
        }
      ]
    };
    chart.setOption(option);
  },
  getBar2(chart, last, now) {
    const option = {
      title: {
        text: '人均消费',
        left: 'center',
      },
      color: ['#eaff8f', '#bae637'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['昨天', '今天'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      series: [{
        name: '昨天',
        type: 'bar',
        label: {
          normal: {
            color: 'black',
            show: true,
            position: 'top'
          }
        },
        data: [last, now]
      }
      ]
    };
    chart.setOption(option);
  },
  getBar3(chart, last, now) {
    const option = {
      title: {
        text: '购物人数',
        left: 'center',
      },
      color: ['#ffadd2', '#f759ab'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['昨天', '今天'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      series: [{
        name: '昨天',
        type: 'bar',
        label: {
          normal: {
            color: 'black',
            show: true,
            position: 'top'
          }
        },
        data: [last, now]
      }
      ]
    };
    chart.setOption(option);
  },
  getBar4(chart, last, now) {
    const option = {
      title: {
        text: '人均消费',
        left: 'center',
      },
      color: ['#ffadd2', '#f759ab'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['昨天', '今天'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      series: [{
        name: '昨天',
        type: 'bar',
        label: {
          normal: {
            color: 'black',
            show: true,
            position: 'top'
          }
        },
        data: [last, now]
      }
      ]
    };
    chart.setOption(option);
  },
  getBar5(chart, last, now) {
    const option = {
      title: {
        text: '交易次数',
        left: 'center',
      },
      color: ['#ffe58f', '#ffc53d'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['昨天', '今天'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      series: [{
        name: '昨天',
        type: 'bar',
        label: {
          normal: {
            color: 'black',
            show: true,
            position: 'top'
          }
        },
        data: [last, now]
      }
      ]
    };
    chart.setOption(option);
  },
  getBar6(chart, last, now) {
    const option = {
      title: {
        text: '交易总额',
        left: 'center',
      },
      color: ['#ffe58f', '#ffc53d'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['昨天', '今天'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      series: [{
        name: '昨天',
        type: 'bar',
        label: {
          normal: {
            color: 'black',
            show: true,
            position: 'top'
          }
        },
        data: [last, now]
      }
      ]
    };
    chart.setOption(option);
  },
  getBar7(chart, last, now) {
    const option = {
      title: {
        text: '就餐人次',
        left: 'center',
      },
      color: ['#adc6ff', '#ffc53d'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['昨天', '今天'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      series: [{
        name: '昨天',
        type: 'bar',
        label: {
          normal: {
            color: 'black',
            show: true,
            position: 'top'
          }
        },
        data: [last, now]
      }
      ]
    };
    chart.setOption(option);
  },
  getBar8(chart, last, now) {
    const option = {
      title: {
        text: '次均消费',
        left: 'center',
      },
      color: ['#adc6ff', '#ffc53d'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['昨天', '今天'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      series: [{
        name: '昨天',
        type: 'bar',
        label: {
          normal: {
            color: 'black',
            show: true,
            position: 'top'
          }
        },
        data: [last, now]
      }
      ]
    };
    chart.setOption(option);
  },
  getBar9(chart, last, now) {
    const option = {
      title: {
        text: '就餐人次',
        left: 'center',
      },
      color: ['#ffbb96', '#ffc53d'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['昨天', '今天'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      series: [{
        name: '昨天',
        type: 'bar',
        label: {
          normal: {
            color: 'black',
            show: true,
            position: 'top'
          }
        },
        data: [last, now]
      }
      ]
    };
    chart.setOption(option);
  },
  getBar10(chart, last, now) {
    const option = {
      title: {
        text: '次均消费',
        left: 'center',
      },
      color: ['#ffbb96', '#ffc53d'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['昨天', '今天'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      series: [{
        name: '昨天',
        type: 'bar',
        label: {
          normal: {
            color: 'black',
            show: true,
            position: 'top'
          }
        },
        data: [last, now]
      }
      ]
    };
    chart.setOption(option);
  },
  getBar11(chart, last, now) {
    const option = {
      title: {
        text: '就餐人次',
        left: 'center',
      },
      color: ['#ffd591', '#ffc53d'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['昨天', '今天'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      series: [{
        name: '昨天',
        type: 'bar',
        label: {
          normal: {
            color: 'black',
            show: true,
            position: 'top'
          }
        },
        data: [last, now]
      }
      ]
    };
    chart.setOption(option);
  },
  getBar12(chart, last, now) {
    const option = {
      title: {
        text: '次均消费',
        left: 'center',
      },
      color: ['#ffd591', '#ffc53d'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['昨天', '今天'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      series: [{
        name: '昨天',
        type: 'bar',
        label: {
          normal: {
            color: 'black',
            show: true,
            position: 'top'
          }
        },
        data: [last, now]
      }
      ]
    };
    chart.setOption(option);
  },
  getBar13(chart, last, now) {
    const option = {
      title: {
        text: '就餐人次',
        left: 'center',
      },
      color: ['#fffb8f', '#ffc53d'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['昨天', '今天'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      series: [{
        name: '昨天',
        type: 'bar',
        label: {
          normal: {
            color: 'black',
            show: true,
            position: 'top'
          }
        },
        data: [last, now]
      }
      ]
    };
    chart.setOption(option);
  },
  getBar14(chart, last, now) {
    const option = {
      title: {
        text: '次均消费',
        left: 'center',
      },
      color: ['#fffb8f', '#ffc53d'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['昨天', '今天'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      series: [{
        name: '昨天',
        type: 'bar',
        label: {
          normal: {
            color: 'black',
            show: true,
            position: 'top'
          }
        },
        data: [last, now]
      }
      ]
    };
    chart.setOption(option);
  },
  getBar15(chart, last, now) {
    const option = {
      title: {
        text: '就餐人次',
        left: 'center',
      },
      color: ['#87e8de', '#ffc53d'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['昨天', '今天'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      series: [{
        name: '昨天',
        type: 'bar',
        label: {
          normal: {
            color: 'black',
            show: true,
            position: 'top'
          }
        },
        data: [last, now]
      }
      ]
    };
    chart.setOption(option);
  },
  getBar16(chart, last, now) {
    const option = {
      title: {
        text: '次均消费',
        left: 'center',
      },
      color: ['#87e8de', '#ffc53d'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['昨天', '今天'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      series: [{
        name: '昨天',
        type: 'bar',
        label: {
          normal: {
            color: 'black',
            show: true,
            position: 'top'
          }
        },
        data: [last, now]
      }
      ]
    };
    chart.setOption(option);
  },
  getBar17(chart, last, now) {
    const option = {
      title: {
        text: '就餐人次',
        left: 'center',
      },
      color: ['#d3adf7', '#ffc53d'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['昨天', '今天'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      series: [{
        name: '昨天',
        type: 'bar',
        label: {
          normal: {
            color: 'black',
            show: true,
            position: 'top'
          }
        },
        data: [last, now]
      }
      ]
    };
    chart.setOption(option);
  },
  getBar18(chart, last, now) {
    const option = {
      title: {
        text: '次均消费',
        left: 'center',
      },
      color: ['#d3adf7', '#ffc53d'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['昨天', '今天'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      series: [{
        name: '昨天',
        type: 'bar',
        label: {
          normal: {
            color: 'black',
            show: true,
            position: 'top'
          }
        },
        data: [last, now]
      }
      ]
    };
    chart.setOption(option);
  },
  /**
   * 页面的初始数据
   */
  data: {
    active1: 0,
    active2: 0,
    index1: 0,
    index2: 0,
    bigdata: '',
    ec1: {
      lazyLoad: true
    },
    ec2: {
      lazyLoad: true
    },
    ec3: {
      lazyLoad: true
    },
    ec4: {
      lazyLoad: true
    },
    ec5: {
      lazyLoad: true
    },
    ec6: {
      lazyLoad: true
    },
    ec7: {
      lazyLoad: true
    },
    ec8: {
      lazyLoad: true
    },
    ec9: {
      lazyLoad: true
    },
    ec10: {
      lazyLoad: true
    },
    ec11: {
      lazyLoad: true
    },
    ec12: {
      lazyLoad: true
    },
    ec13: {
      lazyLoad: true
    },
    ec14: {
      lazyLoad: true
    },
    ec15: {
      lazyLoad: true
    },
    ec16: {
      lazyLoad: true
    },
    ec17: {
      lazyLoad: true
    },
    ec18: {
      lazyLoad: true
    },
    isLoaded: false
  },
  onLoad: function() {

  },
  // 初始化图表
  init: function() {
    var $this = this;

    this.ecComponent1.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.getBar1(chart, $this.data.bigdata.MEALS_COUNT_LAST, $this.data.bigdata.MEALS_COUNT_NOW);
      this.chart1 = chart;
    });
    this.ecComponent2.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.getBar2(chart, $this.data.bigdata.MEALS_AVERAGE_LAST, $this.data.bigdata.MEALS_AVERAGE_NOW);
      this.chart2 = chart;
    });
    this.ecComponent3.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.getBar3(chart, $this.data.bigdata.SHOPPING_COUNT_LAST, $this.data.bigdata.SHOPPING_COUNT_NOW);
      this.chart3 = chart;
    });
    this.ecComponent4.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.getBar4(chart, $this.data.bigdata.SHOPPING_AVERAGE_LAST, $this.data.bigdata.SHOPPING_AVERAGE_NOW);
      this.chart4 = chart;
    });
    this.ecComponent5.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.getBar5(chart, $this.data.bigdata.MAKE_COUNT_LAST, $this.data.bigdata.MAKE_COUNT_NOW);
      this.chart5 = chart;
    });
    this.ecComponent6.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.getBar6(chart, $this.data.bigdata.MAKE_SUM_LAST, $this.data.bigdata.MAKE_SUM_NOW);
      this.chart6 = chart;
    });
    this.ecComponent7.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.getBar7(chart, $this.data.bigdata.CANTEEN_ONE_COUNT_LAST, $this.data.bigdata.CANTEEN_ONE_COUNT_NOW);
      this.chart7 = chart;
    });
    this.ecComponent8.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.getBar8(chart, $this.data.bigdata.CANTEEN_ONE_AVERAGE_LAST, $this.data.bigdata.CANTEEN_ONE_AVERAGE_NOW);
      this.chart8 = chart;
    });
    this.ecComponent9.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.getBar9(chart, $this.data.bigdata.CANTEEN_TWO_COUNT_LAST, $this.data.bigdata.CANTEEN_TWO_COUNT_NOW);
      this.chart9 = chart;
    });
    this.ecComponent10.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.getBar10(chart, $this.data.bigdata.CANTEEN_TWO_AVERAGE_LAST, $this.data.bigdata.CANTEEN_TWO_AVERAGE_NOW);
      this.chart10 = chart;
    });
    this.ecComponent11.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.getBar11(chart, $this.data.bigdata.CANTEEN_STUDENT_COUNT_LAST, $this.data.bigdata.CANTEEN_STUDENT_COUNT_NOW);
      this.chart11 = chart;
    });
    this.ecComponent12.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.getBar12(chart, $this.data.bigdata.CANTEEN_STUDENT_AVERAGE_LAST, $this.data.bigdata.CANTEEN_STUDENT_AVERAGE_NOW);
      this.chart12 = chart;
    });
    this.ecComponent13.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.getBar13(chart, $this.data.bigdata.CANTEEN_HUNNAN_COUNT_LAST, $this.data.bigdata.CANTEEN_HUNNAN_COUNT_NOW);
      this.chart13 = chart;
    });
    this.ecComponent14.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.getBar14(chart, $this.data.bigdata.CANTEEN_HUNNAN_AVERAGE_LAST, $this.data.bigdata.CANTEEN_HUNNAN_AVERAGE_NOW);
      this.chart14 = chart;
    });
    this.ecComponent15.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.getBar15(chart, $this.data.bigdata.CANTEEN_TEACHER_COUNT_LAST, $this.data.bigdata.CANTEEN_TEACHER_COUNT_NOW);
      this.chart15 = chart;
    });
    this.ecComponent16.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.getBar16(chart, $this.data.bigdata.CANTEEN_TEACHER_AVERAGE_LAST, $this.data.bigdata.CANTEEN_TEACHER_AVERAGE_NOW);
      this.chart16 = chart;
    });
    this.ecComponent17.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.getBar17(chart, $this.data.bigdata.CANTEEN_MUSLIM_COUNT_LAST, $this.data.bigdata.CANTEEN_MUSLIM_COUNT_NOW);
      this.chart17 = chart;
    });
    this.ecComponent18.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.getBar18(chart, $this.data.bigdata.CANTEEN_MUSLIM_AVERAGE_LAST, $this.data.bigdata.CANTEEN_MUSLIM_AVERAGE_NOW);
      this.chart18 = chart;
    });
  },

  onLoad: function() {
    this.ecComponent1 = this.selectComponent('#mychart-dom-bar-1');
    this.ecComponent2 = this.selectComponent('#mychart-dom-bar-2');
    this.ecComponent3 = this.selectComponent('#mychart-dom-bar-3');
    this.ecComponent4 = this.selectComponent('#mychart-dom-bar-4');
    this.ecComponent5 = this.selectComponent('#mychart-dom-bar-5');
    this.ecComponent6 = this.selectComponent('#mychart-dom-bar-6');
    this.ecComponent7 = this.selectComponent('#mychart-dom-bar-7');
    this.ecComponent8 = this.selectComponent('#mychart-dom-bar-8');
    this.ecComponent9 = this.selectComponent('#mychart-dom-bar-9');
    this.ecComponent10 = this.selectComponent('#mychart-dom-bar-10');
    this.ecComponent11 = this.selectComponent('#mychart-dom-bar-11');
    this.ecComponent12 = this.selectComponent('#mychart-dom-bar-12');
    this.ecComponent13 = this.selectComponent('#mychart-dom-bar-13');
    this.ecComponent14 = this.selectComponent('#mychart-dom-bar-14');
    this.ecComponent15 = this.selectComponent('#mychart-dom-bar-15');
    this.ecComponent16 = this.selectComponent('#mychart-dom-bar-16');
    this.ecComponent17 = this.selectComponent('#mychart-dom-bar-17');
    this.ecComponent18 = this.selectComponent('#mychart-dom-bar-18');
  },

  onChange(event){
    // console.log(event.detail.index);
    // this.setData({
    //   index2: event.detail.index
    // });
    let that = this
    setTimeout(function(){
      that.init();
    }, 200)
  },

  onReady: function () {
    wx.showLoading({
      title: '玩命加载中...',
    })
    var $this = this;
    this.setData({
      userid: wx.getStorageSync('stuID'),
      passwd: wx.getStorageSync('stuPass_eone'),
    });
    wx.request({
      url: 'https://neuvwo.com/mini/api/bigData',
      method: 'POST',
      dataType: 'json',
      data: ({
        'stuID': $this.data.userid,
        'stuPass': $this.data.passwd
      }),
      success: function (res) {
        wx.hideLoading();
        console.log(res.data.data);
        $this.setData({
          bigdata: res.data.data
        });
        $this.init();
        $this.setData({
          isLoaded: true
        });
      },
      complete: function (res) {
        wx.hideLoading();
      }
    })
  },

  onShow: function() {

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