import Dialog from '../../dist_vant/dialog/dialog';
import Toast from '../../vant_weapp/components/dist/toast/toast';
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoggedIn: false,
    value: 66,
    gradientColor: {
      '0%': '#ffd01e',
      '100%': '#06c160'
    },
    circleDis: "block",
    fulfilOne: 1, //题库完成度
    fulfilTwo: 66, // 平均正确率
    // ***setSize*** //
    bottom: "-166rpx", // 默认统计圆圈两边文字的相对高度
    circleSize: 129, // 默认统计圆环大小
    strokeWidth: 7, // 默认统计圆环进度条宽度
    popHeight: "80vh", // 默认弹出框高度
    wrapperHeight: "100vh", // 默认背景高度
    // ***setSize*** //
    show: false, 
    activeNames: ['1'],
    chooseChapter: [], //所选章节及知识点
    knowledgeList: [],// 知识点
    GS: [],
    GL: [],
    FB: [],
    XD: [],
    datas: [], //传给子组件的数据
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getKnowledgeList();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.refresh();    
    this.setSize();
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.onClose();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // wx.removeStorageSync('listData')
    console.log("下拉刷新")
    wx.showLoading({
      title: '玩命加载中...',
    })
    wx.showNavigationBarLoading();
    this.refresh();
    setTimeout(()=>{
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
      wx.hideLoading()
    },2000)
    // this.showTermCourse(); //后期完善此刷新功能
    // this.showCourse();
  },
  // 刷新做题记录
  refresh() {
    var TestRecord = wx.getStorageSync("TestRecord");
    console.log("[INFO]做题记录: ");
    console.log(TestRecord);
    var totalFinish = 0;
    var accuracyRate = 0;
    var flag = false;
    for(var i = 0; i < TestRecord.length; i ++) {
      totalFinish += TestRecord[i][25].finish
      accuracyRate += TestRecord[i][25].mark / 100
      flag = true;
    }
    // 假定有2000道题
    var length = (flag == false ? 1 : TestRecord.length);
    this.setData({
      value: totalFinish, 
      fulfilOne: (totalFinish / 2000).toFixed(2),
      fulfilTwo: ((accuracyRate / length) * 100).toFixed(2),
    })
  },
  // 功能面板
  functionClick(e) {
    // console.log(e);
    Toast("~对不起哦，该功能还未完善，正在努力开发中...");
  },


  // 弹出选题框
  showPopup(e) {
    this.chapterChooseHandle(e.currentTarget.id);
    this.setData({ 
      show: true,
      circleDis: "none"
    });
  },
  // 科目选择处理
  chapterChooseHandle(subjectName) {
    if(subjectName == "GS") {
      this.setData({
        datas: this.generateData(this.data.GS.chapterList)
      })
    } else if(subjectName == "GL"){
      this.setData({
        datas: this.generateData(this.data.GL.chapterList)
      })
    } else if(subjectName == "FB"){
      this.setData({
        datas: this.generateData(this.data.FB.chapterList)
      })
    } else {
      this.setData({
        datas: this.generateData(this.data.XD.chapterList)
      })
    }
  },
  // 生成传给子组件格式的数据
  /**
     * datas: {
     * title: "",
     * icon: "", //colorui icon
     * choose: "",
     * items: [{name: , checked: false}]
     * }
     */
  generateData(data) {
    var datas = [];
    for(var i = 0; i < data.length; i ++) {
      var temp = {
        title: data[i].chapterName,
        icon: "check",
        choose: false,
        items: []
      };
      for(var j = 0; j < data[i].knowledgeList.length; j ++) {
        var obj = {
          name: data[i].knowledgeList[j],
          checked: false
        }
        temp.items.push(obj);
      }
      datas.push(temp);
    }
    return datas;
  },
  onClose() {
    this.setData({ 
      show: false,
      circleDis: "block"
    });
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  // 获取知识点列表
  getKnowledgeList() {
    var that = this;
    wx.request({
      url: 'https://weneu.neuyan.com/quiz',
      data: {
        "action": "list"
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        // console.log(res);
        that.setData({
          knowledgeList: res.data.data.questions,
        });
        that.spliteSubject(that.data.knowledgeList);
        // console.log(that.data.knowledgeList);
      }
    })
  },
  // 科目分离
  spliteSubject(knowledgeList) {
    for(var i = 0; i < knowledgeList.length; i ++) {
      var subjectName = knowledgeList[i].subjectName;
      if(subjectName == "GS") {
        this.data.GS = knowledgeList[i];
      } else if(subjectName == "GL"){
        this.data.GL = knowledgeList[i];
      } else if(subjectName == "FB"){
        this.data.FB = knowledgeList[i];
      } else {
        this.data.XD = knowledgeList[i];
      }
    }
  },
  // 确认选择章节
  confirm(e) {
    let that = this;
    that.data.chooseChapter = e.detail.data;
    Dialog.confirm({
      title: '开始练习',
      message: '我们将为你选择25道选择题，限时90分钟，准备好了吗?'
    }).then(() => {
      console.log('[INFO] 准备练习')
      if(that.data.chooseChapter.length < 2) {
        Toast("~请至少选择两个知识点");
      } else {
        that.onClose();
        console.log(that.data.chooseChapter);
        // console.log(that.generateDataUrl());
        wx.navigateTo({
          url: that.generateDataUrl(),
          success: function(e) {
            // var page = getCurrentPages().pop();
            // page.onLoad();
            // page.onShow();
            // page.onReady();
          },
        })
      }
    }).catch(() => {
      console.log('[INFO] 放弃练习')
    });
  },
  // 生成传递用户选择的章节url
  generateDataUrl() {
    var url = "/pages/question_bank/test/test?"
    for(var i = 0; i < this.data.chooseChapter.length; i ++) {
      if(i != 0) {
        url += "&title" + "_" + i + "=" + this.data.chooseChapter[i];
      }else {
        url += "title" + "_" + i + "=" + this.data.chooseChapter[i];        
      }
    }
    return url;
  },

  setSize() {
    var $this = this;
    wx.getSystemInfo({
      success: e => {       
        $this.setData({
          'bottom': e.screenHeight > 1000 ? "-106rpx" : $this.data.bottom,
          'circleSize': e.screenHeight > 1000 ? 190 : $this.data.circleSize,
          'strokeWidth': e.screenHeight > 1000 ? 16 : $this.data.strokeWidth,
          'popHeight': e.screenHeight > 1000 ? "90vh" : (e.screenHeight < 1000 && e.screenHeight > 736) ? "76vh" : $this.data.popHeight,
          'wrapperHeight': e.screenHeight > 736 && e.screenHeight < 1000 ? "80vh" : $this.data.wrapperHeight, // iPhoneX
        });
      }
    })
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
  }

})