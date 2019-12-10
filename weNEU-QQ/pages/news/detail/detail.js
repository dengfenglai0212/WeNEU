//detail.js (common)
var app = getApp();
Page({
  data: {
    type: '',
    typeid: '',
    remind: "加载中",
    id: '',
    title: "",    // 新闻标题
    date: "",     // 发布日期
    content: "7月5日上午，东北大学在主楼824室召开食品安全专题工作会及食品安全隐患整改工作推进会。副校长徐峰出席会议并讲话，安委会办公室、后勤管理处、创业创新学院、校医院、后勤服务中心、体育场馆管理中心、科技产业集团等部门安全负责人参加会议。/n会上，安委会办公室主要负责人解读了学校制定的《多人集中腹泻事件现场处置方案》、《食品安全隐患整改方案》及相关应急处置预案，并进行了多人集中腹泻事件现场处置演练。\n徐峰指出，相关部门要高度重视学校食品安全管理工作，进一步提高政治站位，认真履行岗位职责，以红线意识、底线思维保障食品安全。徐峰要求，校食品经营部门必须合规合法经营；各级安全督查队伍要常抓不懈做好督查检查工作。针对安全检查中发现食品安全隐患及“三违”行为，要根据《食品安全隐患整改方案》责任到人，切实做好隐患整改和“三违”行为治理，坚决遏制食品安全事故，为学校“双一流”建设创造安全稳定的校园环境。",  // 新闻内容
    imgs: "",
    urls: ["06-01getNEUnews/06-01grabNEU_content.php",
      "06-02getAAOnews/06-02grabAAO_content.php",
      "06-03getCollegenews/06-03-01grabSE_content.php"]
  }
  ,
  // //分享
  // onShareAppMessage: function () {
  //   var _this = this;
  //   return {
  //     title: _this.data.title,
  //     desc: 'NEUer 咨询详情',
  //     path: 'pages/news/detail/detail?type=' + _this.data.type + '&id=' + _this.data.id
  //   }
  // },
  onLoad: function (options) {
    //初始化
    this.setData({
      type: '',
      typeid: '',
      remind: "加载中",
      id: '',
      // content: "",  // 新闻内容
      imgs: "",
    });

    console.log(options)
    var _this = this;
    var modifyID = options.id+"";
    var type = options.type;
    if(type=='jw'){
      modifyID = modifyID.replace('wenhao', '\\?')
      modifyID = modifyID.replace('dengyu', '=')
    }
   
    _this.setData({
      type: options.type,
      id: modifyID,
      title: options.title,
      date: options.date
    });
    if (_this.data.type == 'neu') {
      _this.setData({ typeid: '0' })
    }
    else if (_this.data.type == 'jw') {
      _this.setData({ typeid: '1' })

    }
    else if (_this.data.type == 'rj') {
      _this.setData({ typeid: '2' })
    }
    console.log(_this.data.typeid)

    wx.request({
      url: 'https://wxapi.hotapp.cn/proxy/?appkey=hotapp477295126&url=http://www.weneu.xyz/weNEU/' + _this.data.urls[_this.data.typeid] + "?link=" + _this.data.id,
      success: function (res) {
        console.log(res)
        if (res.data) {
          if(res.data.title){
            _this.setData({
              title:res.data.title
            })
          }
          _this.setData({
            content: res.data.content,  // 新闻内容
            imgs: res.data.img,
            remind: ''
          });

          if(res.data.img=="http://neunews.neu.edu.cn"){
            _this.setData({
              imgs: ""
            })
          }
        }
      },
      fail: function () {
        app.showErrorModal(res.errMsg);
        _this.setData({
          remind: '网络错误'
        });
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