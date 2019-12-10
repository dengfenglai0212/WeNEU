Page({

  data: {
    userid: '',
    passwd: '',
    value:'',
    resultList:[]
  },

  bindSearchInput: function (e) {
    this.setData({
      value: e.detail
    });
  },

  search: function () {
    var $this = this;
    $this.setData({
      userid: wx.getStorageSync('stuID'),
      passwd: wx.getStorageSync('stuPass')
    });
    wx.showLoading({
      title: '正在加载....',
    })
    wx.request({
      url: 'https://neuvwo.com/mini/api/search',
      data: {
        stuID: $this.data.userid,
        stuPass: $this.data.passwd,
        search: $this.data.name
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        $this.setData({
          resultList: res.data.data,
        });
        console.log(res.data);
      },
      complete: function (res) {
        wx.hideLoading();
      }
    })
  },

  showCourse: function(type, code){
    wx.navigateTo({
      url: './detail?type='+type+'code='+code,
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