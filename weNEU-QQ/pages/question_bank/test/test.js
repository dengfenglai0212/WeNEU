import Dialog from '../../../dist_vant/dialog/dialog';
import Toast from '../../../vant_weapp/components/dist/toast/toast';
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    scrollLeft: 0,
    scrollUnit: 33,
    dataList: [], // 题目章节数组
    questionList: [], // 题目数组
    finalQues: [], // 测试集
    checked: [], //初始选项 答案集
    finishCount: [], // 完成情况
    unFinish: "", //未完成题目
    record: [], // 答案对比记录
    load: true,
    percentage: 0, // 进度条
    // ***计时器***
    Timer: null,
    min: 30, 
    hour: 1,
    secend: 0,
    total: 90, // 这里是总时间分数 要配合时(hour)分(min)计算好
    // ***计时器***
    submitted: false,
    grade: 0, //得分
    timeConsuming: 0,
    show: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.handleRouterData(options);
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    let that = this;
    setTimeout(function() {
      that.setData({
        loading: true
      })
    }, 500)
    this.getQuestionList();
    this.generateCheck();
    this.timer() // 不能写在onShow生命周期里 不然在真机上预览图片会开启多个定时器 导致定时加快
    // console.log("onload");
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setSize();
    // console.log("onshow");
  },
  /**
   * 生命周期函数-监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideLoading();
    Toast("~练习倒计时" + this.data.total + "分钟");
    // console.log(this.data.questions);
  },
  // 处理路由参数
  handleRouterData(data) {
    for(var title in data) {
      this.data.dataList.push(data[title]);
    }
    wx.setStorageSync("dataList",this.data.dataList);
  },
  // 获取题目信息
  getQuestionList() {
    var that = this;
    wx.request({
      url: 'https://weneu.neuyan.com/quiz',
      data: {
        "action": "getQuestion",
        "knowledgeList": that.data.dataList
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        // console.log(res.data);
        that.setData({
          questionList: res.data.data.questions,
        });
        that.setData({
          finalQues: that.extractQues(that.data.questionList)
        })
        // that.setData({
        //   questionList: res.data.data.questions,
        // });
        // console.log(that.data.questionList);
      }
    })
    
  },
  // 随机抽取其中的25道题
  extractQues(questions) {
    // console.log(questions);
    var finalQues = [];
    for(var j = 0; j < questions.length; j ++) {
      var rate = Math.random();
      if(rate > 0.5 && finalQues.indexOf(questions[j]) == -1) {
        var question = {
          answer: questions[j].answer,
          answerDetail: questions[j].answerDetail,
          question: questions[j].question,
          questionId: questions[j].questionId,
          item: questions[j].question.split("0.png")[0],
          pics: [
            "https://math.neuyan.com/"+questions[j].question,
            "https://math.neuyan.com/"+questions[j].question.split("0.png")[0]+"1.png",
            "https://math.neuyan.com/"+questions[j].question.split("0.png")[0]+"2.png",
            "https://math.neuyan.com/"+questions[j].question.split("0.png")[0]+"3.png",
            "https://math.neuyan.com/"+questions[j].question.split("0.png")[0]+"4.png"
          ]
        }
        finalQues.push(question);
      }
      if(finalQues.length == 25) {
        console.log(finalQues);
        return finalQues;
      } else if(j == questions.length - 1){
        j = 0;
      }
    }
    
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },
  chooseItem(e) {
    // var nowId = this.data.TabCur;
    console.log(e);
    this.setData({
      TabCur: parseInt(e.currentTarget.id),
      show: false,
      scrollLeft: this.data.scrollUnit * (e.currentTarget.id)
    })
  },
  // 上一道题
  front(e) {
    if(this.data.TabCur > 0) {
      this.setData({
        TabCur: this.data.TabCur - 1,
        scrollLeft: this.data.scrollUnit * (this.data.TabCur - 1),
      })
    }
    
  },
  // 下一道题
  next(e) {
    if(this.data.TabCur < 24) {
      this.setData({
        TabCur: this.data.TabCur + 1,
        scrollLeft: this.data.scrollUnit * (this.data.TabCur + 1),
      })
    }
    
  },
  // 答案记录
  checkboxChange(e) {
    // console.log(e);
    var temp = e.target.id;
    for(var i = 0; i < 4; i ++) {
      this.data.checked[this.data.TabCur][i] = false;
    }
    this.data.checked[this.data.TabCur][temp] = true;
    if(this.data.finishCount.indexOf(this.data.TabCur) == -1) {
      this.data.finishCount.push(this.data.TabCur);
    }
    // console.log(this.data.finishCount);
    // if(this.data.checked[this.data.TabCur][temp]) {
    //   this.data.checked[this.data.TabCur][temp] = false;
    // } else {
    //   this.data.checked[this.data.TabCur][temp] = true;
    // }
    this.setData({
      checked: this.data.checked,
      percentage: ((this.data.finishCount.length / 25) * 100).toFixed(0)
    })

    // var index = this.data.answers[this.data.TabCur].user_answer.indexOf(temp);
    // if(index > -1) {
    //   this.data.answers[this.data.TabCur].user_answer.splice(index, 1);
    // } else {
    //   var question = {
    //     id: this.data.TabCur,
    //     answer: this.data.finalQues[this.data.TabCur].answer,
    //     user_answer: this.data.answers[this.data.TabCur].user_answer
    //   }
    //   question.user_answer.push(temp);
    //   this.data.answers[this.data.TabCur] = (question);
    // }
    // console.log(this.data.checked);
  },
  // 检查答案
  answerCheck() {
    var unFinish = ""
    for(var i = 0; i < 25; i ++) {
      var flag = true;
      for(var j = 0; j < 4; j ++) {
        if(this.data.checked[i][j]) {
          flag = false;
        }
      }
      if(flag) {
        unFinish += i + 1 + " ";
      }
    }
    this.setData({
      unFinish: unFinish
    })
    // console.log(unFinish);
  },
  // 答案比对打分
  marking() {
    // 可以存在本地 存一个时间戳加数据
    var record = []
    var mark = 0;
    var finish = 0;
    for(var i = 0; i < 25; i ++) {
      var userAnswer = [];
      for(var j = 0; j < 4; j ++) {
        if(this.data.checked[i][j]) {
          userAnswer.push(j)
        }
      }
      var obj = {
        id: i,
        answer: this.data.finalQues[i].answer,
        userAnswer: userAnswer,
        answerDetail: this.data.finalQues[i].answerDetail,
        status: false,
      }
      for(var k = 0; k < obj.userAnswer.length; k ++) {
        finish ++;
        if(obj.answer - 1 == obj.userAnswer[k] && obj.userAnswer.length == 1) {
          mark += 4;
          obj.status = true;
        }
      }
      record.push(obj);
    }
    record.push({
      mark: mark,
      finish: finish,
      time: new Date().getTime()
    })
    this.setData({
      record: record
    })
    // 做题记录村本地 完善的时候先取 再存 总的存为一个数组
    var TR = wx.getStorageSync("TestRecord");
    if(TR) {
      var TestRecord = TR;
    } else {
      var TestRecord = []
    }
    TestRecord.push(record);
    wx.setStorageSync("TestRecord",TestRecord);
    console.log(record);
    return record[25].mark;
  },
  // 生成初始答案选项
  generateCheck() {
    var checked = [];
    for(var i = 0; i < 25; i ++) {
      var temp = [];
      for(var j = 0; j < 4; j ++) {
        temp.push(false);
      }
      checked.push(temp);
    }
    this.setData({
      checked: checked
    })
    return checked;
  },
  // 练习提交
  confirm() {
    this.answerCheck()
    let that = this;
    var message = "~你还有这些题没完成哦: " + this.data.unFinish;
    console.log(message);
    Dialog.confirm({
      title: '提交确认',
      message: this.data.unFinish != "" ? message : '真的不再检查一下吗？'
    }).then(() => {
      console.log('[INFO] 准备提交练习')
      clearInterval(this.data.Timer);
      var mark = that.marking();
      var comment = mark > 80 ? "答得不错，再接再厉!" : "还需努力哦!"
      Toast("~你的得分: " + mark + " " + comment)
      that.setData({
          scrollLeft: 0,
          TabCur: 0,
          submitted: true,
          grade: mark,
          timeConsuming: ((this.data.total) - (this.data.hour*60 + this.data.min)).toFixed(2)
        })
      // wx.navigateTo({
      //   url: '/pages/question_bank/test/test',
      //   success: function(e) {
      //     var page = getCurrentPages().pop();
      //     page.onLoad();
      //     page.onShow();
      //     page.onReady();
      //   }
      // })
      
    }).catch((e) => {
      console.log(e);
      console.log('[INFO] 放弃提交练习')
    });
  },
  // 计时器
  timer() {
      var Timer = setTimeout(() => {
      if (this.data.min == 0 && this.data.hour != 0) {
        this.data.min = 60;
        this.data.hour --;
        this.setData({
          min:  this.data.min,
          hour: this.data.hour,
        })
      };
      if (this.data.secend == 0 && (this.data.min != 0 || this.data.hour != 0)) {
        this.data.secend = 60;
        this.data.min --;
        this.setData({
          secend: this.data.secend,
          min: this.data.min,
        })
      }
        if(this.data.secend == 0 && this.data.min == 0 && this.data.hour == 0) {
          clearInterval(this.data.Timer);
          Toast("~时间已到!")
          this.setData({
            scrollLeft: 0,
            TabCur: 0,
            submitted: true,
            grade: this.marking(),
            timeConsuming: ((this.data.total) - (this.data.hour*60 + this.data.min)).toFixed(2)
          })
        }
        var per = (this.data.min + this.data.hour*60 + 1) / (this.data.total) 
        // console.log(per)      
        this.data.secend --;
        this.setData({
          secend: this.data.secend
        })
        // console.log(this.data.hour + " " + this.data.min +  " " + this.data.secend);
        this.timer();
      },1000);
      this.setData({
          Timer: Timer
      })
  },
  picClick(e) {
    // console.log(e);
    var id = e.target.id;
    var current = ""
    if(id == "title") {
      current = this.data.finalQues[this.data.TabCur].pics[0]
    } else if(id == 1){
      current = this.data.finalQues[this.data.TabCur].pics[1]
    } else if(id == 2){
      current = this.data.finalQues[this.data.TabCur].pics[2]
    } else if(id == 3){
      current = this.data.finalQues[this.data.TabCur].pics[3]
    } else if(id == 4){
      current = this.data.finalQues[this.data.TabCur].pics[4]
    }
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: this.data.finalQues[this.data.TabCur].pics // 需要预览的图片http链接列表
    })
  },
  // 查看答案解析
  seeDetail(e) {
    console.log(e);
    var id = e.target.id;
    wx.previewImage({
      current: "", // 当前显示图片的http链接
      urls: ["https://math.neuyan.com/" + this.data.record[this.data.TabCur].answerDetail]
    })
  },

  // 处理平板与不同型号手机部分组件尺寸位置
  setSize() {
    var $this = this;
    wx.getSystemInfo({
      success: e => {       
        $this.setData({
          'scrollUnit': e.screenHeight > 1000 ? 90 : (e.screenHeight < 1000 && e.screenHeight >= 667) ? 44 : (e.screenHeight < 667 && e.screenHeight >= 570) ? 40 : $this.data.scrollUnit,
        });
      }
    })
  },
  // openMore
  openMore(e) {
    // console.log(e);
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({ 
      show: false,
      circleDis: "block"
    });
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