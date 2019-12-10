Page({

  data: {
    active: 0,
    hot_list: [],
    center_list: [],
    province_list: [],
    liaoning_list: [],
    movie_list: [],
    all_list: [],
    neu_list: [],
    number_list: []
  },



  onLoad: function(options) {
    wx.showLoading({
      title: '请连接校园网',
    })
    var $this = this;
    // 请求频道列表
    wx.request({
      url: 'https://hdtv.neu6.edu.cn/v1/channels',
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        console.log(res.data);
        $this.setData({
          hot_list: res.data[1],
          center_list: res.data[3],
          province_list: res.data[4],
          liaoning_list: res.data[5],
          movie_list: res.data[6],
          all_list: res.data[0],
          neu_list: res.data[7]
        });

        wx.request({
          url: 'https://hdtv.neu6.edu.cn/v1/details',
          method: 'GET',
          dataType: 'json',
          success: function(res) {
            $this.setData({
              number_list: res.data
            });
            console.log($this.data.number_list);

            // 减少setData次数，提高性能
            var tempList1;
            var tempList2;
            var tempList3;
            var tempList4;
            var tempList5;
            var tempList6;
            for (var j = 0; j < $this.data.number_list.length; j++) {
              tempList1 = $this.data.hot_list.channelList;
              for (var i = 0; i < tempList1.length; i++) {
                if ($this.data.number_list[j].channelId == tempList1[i].channelId) {
                  var viewerNum = $this.data.number_list[j].viewerNum;
                  tempList1[i].viewerNum = viewerNum;
                }
              };
              tempList2 = $this.data.center_list.channelList;
              for (var i = 0; i < tempList2.length; i++) {
                if ($this.data.number_list[j].channelId == tempList2[i].channelId) {
                  var viewerNum = $this.data.number_list[j].viewerNum;
                  tempList2[i].viewerNum = viewerNum;
                }
              };
              tempList3 = $this.data.province_list.channelList;
              for (var i = 0; i < tempList3.length; i++) {
                if ($this.data.number_list[j].channelId == tempList3[i].channelId) {
                  var viewerNum = $this.data.number_list[j].viewerNum;
                  tempList3[i].viewerNum = viewerNum;
                }
              };
              tempList4 = $this.data.liaoning_list.channelList;
              for (var i = 0; i < tempList4.length; i++) {
                if ($this.data.number_list[j].channelId == tempList4[i].channelId) {
                  var viewerNum = $this.data.number_list[j].viewerNum;
                  tempList4[i].viewerNum = viewerNum;
                }
              };
              tempList5 = $this.data.movie_list.channelList;
              for (var i = 0; i < tempList5.length; i++) {
                if ($this.data.number_list[j].channelId == tempList5[i].channelId) {
                  var viewerNum = $this.data.number_list[j].viewerNum;
                  tempList5[i].viewerNum = viewerNum;
                }
              };
              tempList6 = $this.data.all_list.channelList;
              for (var i = 0; i < tempList6.length; i++) {
                if ($this.data.number_list[j].channelId == tempList6[i].channelId) {
                  var viewerNum = $this.data.number_list[j].viewerNum;
                  tempList6[i].viewerNum = viewerNum;
                }
              };
            }
            var str = 'hot_list.channelList';
            $this.setData({
              [str]: tempList1,
            });
            var str = 'center_list.channelList';
            $this.setData({
              [str]: tempList2,
            });
            var str = 'province_list.channelList';
            $this.setData({
              [str]: tempList3,
            });
            var str = 'liaoning_list.channelList';
            $this.setData({
              [str]: tempList4,
            });
            var str = 'movie_list.channelList';
            $this.setData({
              [str]: tempList5,
            });
            var str = 'all_list.channelList';
            $this.setData({
              [str]: tempList6,
            });
          },
          complete: function(res) {
            wx.hideLoading();
          }
        });
      }
    });
    // 请求频道观看人数
  },

  // 一键回到顶部
  toTop: function (e) {  
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前版本过低，无法使用该功能，请升级到最新版本后重试。'
      })
    }
  },
  
  navi: function() {
    wx.navigateTo({
      url: '',
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