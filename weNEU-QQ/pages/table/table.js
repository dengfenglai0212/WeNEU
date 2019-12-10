var app = getApp();
import Toast from '../../vant_weapp/components/dist/toast/toast';
import dataUtil from '../../utils/Data.js'
Page({

  data: {
    // 屏幕尺寸响应式布局
    needSet: {
      buttonHeight: "65rpx",
      picWidth: "10px",
      pullDownPic: "12px"
    },


    timeColor:null,
    currentTime:"", //添加新课程的时间
    currentDate:"", //添加新课程的日期
    timePicker: [],
    chooseTimePop:false,
    pulldown:true,
    color:"#f8f8f9",
    color1: "#f8f8f9",
    color2: "#f8f8f9",
    color3: "#f8f8f9",
    buttonColor:null,
    buttonColor1: null,
    buttonColor2: null,
    buttonColor3: null,
    buttonColor4: null,
    buttonColor5: null,
    addCoursePop:false, //添加课程弹窗
    modifyCoursePop:false,//课程详细信息弹窗
    courseName:"",  //添加课程名称
    courseLocation:"",  //添加课程地点
    courseTime:"",  //添加课程时间
    remarks:"", //添加课程备注
    array1: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26'],
    listData: [],
    array: ["1\n2", "3\n4", "5\n6", "7\n8", "9\n10", "11\n12"],
    colorList: ["#262626", "#262626", "#262626", "#262626", "#262626", "#262626", "#262626"],
    userid: '',
    passwd: '',
    week: '',
    index: 0,
    dateList: [1, 2, 3, 4, 5, 6, 7],
    isLoggedIn: false
  },

  // 计算日期
  getNewData(days) {
    var nDate = new Date("09" + '/' + "09" + '/' + "2019");
    var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
    var rDate = new Date(millSeconds);
    var year = rDate.getFullYear();
    var month = rDate.getMonth() + 1;
    if (month < 10) month = "0" + month;
    var date = rDate.getDate();
    if (date < 10) date = "0" + date;
    return (month+"-"+date);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

    // 判断登录状态决定显示内容
    if (app.isLoggedIn()) {
      this.setData({
        isLoggedIn: true
      });
    } else {
      this.setData({
        isLoggedIn: false
      });
      // 未绑定直接返回
      return;
    }

    var that = this;
    that.setSize();
    let dateArray = dataUtil.listDateFormToday("2019/09/08", 23)
    dateArray.forEach(ele=>{
      switch (ele.week){
        case 1:{
          ele.week="周一"
          break;
        }
        case 2: {
          ele.week = "周二"
          break;
        }
        case 3: {
          ele.week = "周三"
          break;
        }
        case 4: {
          ele.week = "周四"
          break;
        }
        case 5: {
          ele.week = "周五"
          break;
        }
        case 6: {
          ele.week = "周六"
          break;
        }
        default:{
          ele.week = "周日"
          break;
        }
      }
      this.data.timePicker.push(ele.date+" "+ele.week)
    })

    if(app.IsTourist) {
      var tourist = app.globalData.tourist;
      // 如果本地缓存里有数据
      var value = wx.getStorageSync('TermCourse');
      if(value) {
        wx.setStorageSync('TermCourse', value);
      } else {
        wx.setStorageSync('TermCourse', tourist.termCourse);
      }
      that.setData({
        currentDate: that.data.timePicker[2],
        timePicker: that.data.timePicker
      });
    }else {
      if(app.isLoggedIn()) {
        that.setData({
          userid: wx.getStorageSync('stuID'),
          passwd: wx.getStorageSync('stuPass_eone'),
          currentDate:that.data.timePicker[2],
          timePicker: that.data.timePicker
        });
      }
    }
    
    // 处理时间相关
    var util = require('../../utils/Data.js');
    var formatTime = new Date(util.formatDateByH(new Date())).getDay();
    var formatTimeS = new Date('2019/09/08').getTime();
    var formatTimeS1 = new Date('2019/09/09').getTime();
    var formatTime1 = new Date(util.formatDateByH(new Date())).getTime();
    var days = (formatTime1 - formatTimeS) / (formatTimeS1 - formatTimeS);
    var week = (days / 7) + 1;
    var someday = "colorList[" + formatTime + "]";
    this.setData({
      week: parseInt(week),
      originWeek: parseInt(week),
      index: parseInt(week) - 1,
      days: days,
      formatTime: formatTime,
      [someday]: "#0081ff"
    });

    this.showCourse();
  },

  //显示课程详情
  showDetails(event){
    let position = event.currentTarget.dataset.position
    let timeList;
    let time; //课程日期
    let timeDetail; //课程节数
    let weekday;  //课程星期
    switch (position[0]) {
      case 0: {
        weekday = "周一";
        break;
      }
      case 1: {
        weekday = "周二";
        break;
      }
      case 2: {
        weekday = "周三";
        break;
      }
      case 3: {
        weekday = "周四";
        break;
      }
      case 4: {
        weekday = "周五";
        break;
      }
      case 5: {
        weekday = "周六";
        break;
      }
      default: {
        weekday = "周日";
        break;
      }
    }
    switch (position[1]) {
      case 0: {
        timeDetail = "1-2节";
        break;
      }
      case 1: {
        timeDetail = "3-4节";
        break;
      }
      case 2: {
        timeDetail = "5-6节";
        break;
      }
      case 3: {
        timeDetail = "7-8节";
        break;
      }
      case 4: {
        timeDetail = "9-10节";
        break;
      }
      default: {
        timeDetail = "11-12节";
        break;
      }
    }
    if (position[0]==6){
      timeList = this.data.dateList[0].split("-")
      time = timeList[0] + "." + timeList[1]
      console.log(time)
    }else{
      timeList = this.data.dateList[position[0] + 1].split("-")
      time = timeList[0] + "." + timeList[1]
    }
    let details = event.currentTarget.dataset.details;
    if (details.length==3){
      this.setData({
        modifyCoursePop: true,
        courseName2: details[0],
        courseLocation2: details[2],
        currentDate3:"2019."+time+" "+weekday,
        currentTime4: timeDetail,
        position: position
      })
    }else{
      this.setData({
        modifyCoursePop: true,
        courseName2: details[0],
        courseLocation2: details[2],
        remarks2: details[3],
        currentDate3: "2019." + time + weekday,
        currentTime4: timeDetail,
        position: position
      })
    }
  },

  //确认修改课程
  confirmModify(){
    if (this.data.courseName2 == "" || this.data.courseLocation2 == "") {
      Toast("请填写完整课程信息")
    }else{
      let week = this.data.week;
      let weekDay = this.data.position[0];
      let course = this.data.position[1];
      let that = this;
      wx.getStorage({
        key: 'TermCourse',
        success(res) {
          if (res.data[week - 1][weekDay][course][1] != 1) {
            Toast("教务处的课不可以更改哦～")
          } else {
            res.data[week - 1][weekDay][course] = [that.data.courseName2, 1, that.data.courseLocation2]
            res.data[week - 1][weekDay][course].push(that.data.remarks2)
            wx.setStorage({
              key: 'TermCourse',
              data: res.data,
            })
            that.setData({
              modifyCoursePop: false
            })
            that.showCourse();
            Toast("修改成功～")
          }
        }
      })
    }
  },

  //删除课程
  deleteCourse(){
    let week = this.data.week;
    let weekDay=this.data.position[0];
    let course=this.data.position[1];
    let that=this;
    wx.getStorage({
      key: 'TermCourse',
      success(res) {
        if (res.data[week - 1][weekDay][course][1]!=1){
          Toast("教务处的课不可以删除哦～")
        }else{
          res.data[week - 1][weekDay][course] = [null, null, null]
          wx.setStorage({
            key: 'TermCourse',
            data: res.data,
          })
          that.setData({
            modifyCoursePop:false
          })
          that.showCourse();
          Toast("删除成功～")
        }
      }
    })
  },

  //添加课程
  addCourse(){
    this.setData({
      addCoursePop:true
    })
  },

  //关闭添加课弹窗
  onCloseAddCoursePop(){
    this.setData({
      addCoursePop:false
    })
  },

  //关闭选择时间弹窗
  onCloseChooseTimeePop(){
    this.setData({
      chooseTimePop: false
    })
  },

  //关闭课程详细信息弹窗
  onCloseModifyCoursePop(){
    this.setData({
      modifyCoursePop: false,
      courseName2: "",
      courseLocation2: "",
      remarks2: "",
      currentDate3: "",
      currentTime4:""
    })
  },

  //确认添加课程
  confirmAdd(){
    if (this.data.courseName == "" || this.data.courseLocation == "" || this.data.courseTime==""){
      Toast("请填写完整课程信息")
    }else{
      let k = null;  //某天的第几节课
      //将字符串的某节课转换为数字
      switch (this.data.currentTime2){
        case "1-2节":{
          k=0;
          break;
        }
        case "3-4节": {
          k = 1;
          break;
        }
        case "5-6节": {
          k = 2;
          break;
        }
        case "7-8节": {
          k = 3;
          break;
        }
        case "9-10节": {
          k = 4;
          break;
        }
        default: {
          k = 5;
          break;
        }
      }
      let dayList=this.data.currentDate2.split(" ")[0].split(".")
      let endDay = dayList[0]+"/"+dayList[1]+"/"+dayList[2]
      let getWeekAndDayFromSomeday = dataUtil.getWeekAndDayFromSomeday("2019/09/08", endDay)
      console.log(getWeekAndDayFromSomeday);
      let i = getWeekAndDayFromSomeday.week;
      let j = getWeekAndDayFromSomeday.weekday;
      let that=this;
      wx.getStorage({
        key: 'TermCourse',
        success(res) {
          if (res.data[i - 1][j - 1][k][0]==null){
            res.data[i - 1][j - 1][k] = [that.data.courseName, 1, that.data.courseLocation];
            res.data[i - 1][j - 1][k].push(that.data.remarks)
            wx.setStorage({
              key: 'TermCourse',
              data: res.data,
            })
            Toast("添加成功～");
            that.setData({
              addCoursePop:false,
              courseName:"",
              courseLocation:"",
              remarks:"",
              currentDate2:"",
              currentTime2:""
            })
            that.showCourse();
          }else{
            Toast("此时间已有课程了～")
          }
        }
      })
    }
    // console.log(this.data.courseName);
    // console.log(this.data.courseLocation);
    // console.log(this.data.courseTime);
    // console.log(this.data.remarks);
  },

  //改变边框颜色
  chooseName(){
    this.setData({
      color:"#90caf9",
      color1: "#f8f8f9",
      color2: "#f8f8f9",
      color3: "#f8f8f9",
    })
  },
  chooseLoaction() {
    this.setData({
      color1: "#90caf9",
      color: "#f8f8f9",
      color2: "#f8f8f9",
      color3: "#f8f8f9",
    })
  },
  chooseTime() {
    this.setData({
      color2: "#90caf9",
      color1: "#f8f8f9",
      color: "#f8f8f9",
      color3: "#f8f8f9",
      chooseTimePop: true
    })
  },
  chooseRemarks() {
    this.setData({
      color3: "#90caf9",
      color1: "#f8f8f9",
      color2: "#f8f8f9",
      color: "#f8f8f9",
    })
  },
  //监听输入信息的变化
  onChangeCourseName(event){
    this.setData({
      courseName:event.detail
    })
  },
  onChangeCourseLocation(event) {
    this.setData({
      courseLocation: event.detail
    })
  },
  onChangeRemarks(event) {
    this.setData({
      remarks: event.detail
    })
  },
  onChangeCourseName2(event) {
    this.setData({
      courseName2: event.detail
    })
  },
  onChangeCourseLocation2(event) {
    this.setData({
      courseLocation2: event.detail
    })
  },
  onChangeRemarks2(event) {
    this.setData({
      remarks2: event.detail
    })
  },

  //确认新建课程的时间
  confirmTime(){
    if(this.data.currentTime==""){
      Toast('请选择上课时间');
    }else{
      this.setData({
        currentDate2: "2019." + this.data.currentDate ,
        currentTime2: this.data.currentTime,
        courseTime: "2019." + this.data.currentDate +" "+this.data.currentTime,
        chooseTimePop:false,
        timeColor: "#495060"
      })
    }
  },

  //选择新建课程的时间
  onChangeTimePick(event){
    this.setData({
      currentDate: event.detail.value
    })
  },

  //选择上课时间
  choose0(){
   this.setData({
     buttonColor:"#80848f",
     buttonColor1: null,
     buttonColor2: null,
     buttonColor3: null,
     buttonColor4: null,
     buttonColor5: null,
     currentTime:"1-2节"
   })
  },
  choose1() {
    this.setData({
      buttonColor1: "#80848f",
      buttonColor: null,
      buttonColor2: null,
      buttonColor3: null,
      buttonColor4: null,
      buttonColor5: null,
      currentTime: "3-4节"
    })
  },
  choose2() {
    this.setData({
      buttonColor2: "#80848f",
      buttonColor1: null,
      buttonColor: null,
      buttonColor3: null,
      buttonColor4: null,
      buttonColor5: null,
      currentTime: "5-6节"
    })
  },
  choose3() {
    this.setData({
      buttonColor3: "#80848f",
      buttonColor1: null,
      buttonColor2: null,
      buttonColor: null,
      buttonColor4: null,
      buttonColor5: null,
      currentTime: "7-8节"
    })
  },
  choose4() {
    this.setData({
      buttonColor4: "#80848f",
      buttonColor1: null,
      buttonColor2: null,
      buttonColor: null,
      buttonColor5: null,
      buttonColor3: null,
      currentTime: "9-10节"
    })
  },
  choose5() {
    this.setData({
      buttonColor5: "#80848f",
      buttonColor1: null,
      buttonColor2: null,
      buttonColor: null,
      buttonColor4: null,
      buttonColor3: null,
      currentTime: "11-12节"
    })
  },

  onShow: function() {
    // 判断登录状态决定显示内容
    if (app.isLoggedIn()) {
      this.setData({
        isLoggedIn: true
      });
    } else {
      this.setData({
        isLoggedIn: false
      });
      // 未绑定直接返回
      return;
    }
  },

  listenerPickerSelected: function(e) {
    //改变index值，通过setData()方法重绘界面
    var _this = this
    var number = parseInt(e.detail.value) + parseInt(1);
    _this.setData({
      week: number,
    });
    wx.removeStorageSync('listData')
    this.showCourse();

  },
  last: function() {
    var _this = this
    var number = this.data.week - 1;
    if (number >= 1) {
      _this.setData({
        week: number,
        index: number
      });
      wx.removeStorageSync('listData')
      this.showCourse();
    }
  },
  next: function() {
    var _this = this
    var number = this.data.week + 1;
    if (number <= 25) {
      _this.setData({
        week: number,
        index: number
      });
      wx.removeStorageSync('listData')
      this.showCourse();
    }
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
    setTimeout(()=>{
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
      wx.hideLoading()
    },2000)
    // this.showTermCourse(); //后期完善此刷新功能
    // this.showCourse();
  },
  
  showTermCourse: function() {
    var that = this;
    var tourist = app.globalData.tourist;
    var value = null;
    if(app.IsTourist) {
      var value = wx.getStorageSync('TermCourse');
      if(value) {
        wx.setStorageSync('TermCourse', value);
      } else {
        wx.setStorageSync('TermCourse', tourist.termCourse);
      }
      // app.showLoadToast("请稍等...", 1);
    }else {
      var url = 'https://neuvwo.com:8899/uuia';
      wx.showLoading({
        title: '玩命加载中...',
      })
      wx.showNavigationBarLoading();
      wx.request({
        url: url,
        data: {
          'group':'base',
          'action': 'schedule',
          'stuID': that.data.userid,
          'password': that.data.passwd,
        },
        method: 'POST',
        dataType: 'json',
        success: function(res) {
          console.log(res)
          var courseData = res.data.data.courses;
          var courseArray = that.courseTranslater(courseData);
          wx.setStorageSync('TermCourse', courseArray);
        },
        complete: function() {
          wx.hideNavigationBarLoading();
          wx.hideLoading();
        }
      })
    }
  },

  showCourse: function() {
    var that = this;
    var tourist = app.globalData.tourist;
    var value = wx.getStorageSync('TermCourse');
    var days = this.data.days; originWeek
    var formatTime = this.data.formatTime;
    var originWeek = this.data.originWeek;
    var week = this.data.week;
    that.setData({
      listData: value[this.data.week - 1],
    });

    for (var i = 0; i < 7; i++) {
      var date = "dateList[" + i + "]";
      that.setData({
        [date]: that.getNewData(days - (formatTime - i + 1) + 7 * (week - originWeek))
      })
    }

    var someday = "colorList[" + formatTime + "]";
    if(week==originWeek){
      that.setData({
        [someday]: "#0081ff"
      })
    } else {
      that.setData({
        [someday]: "#262626"
      })
    }
  },

  setSize() {
    var $this = this;
    wx.getSystemInfo({
      success: e => {       
        $this.setData({
          'needSet.buttonHeight': e.screenHeight > 1000 ? "none" : $this.data.needSet.buttonHeight,
          'needSet.picWidth': e.screenHeight > 1000 ? "30px" : $this.data.needSet.picWidth,
          'needSet.pullDownPic': e.screenHeight > 1000 ? "30px" : $this.data.needSet.picWidth,
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
  },
})
