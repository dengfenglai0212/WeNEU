Page({

  data: {
    id: '',
    live_address: '', // 用于回到直播
    live_title: '', // 用于回到直播
    channel: '',
    title: '玩命加载中...',
    state: 0,
    active: 0,
    address: '',
    replay_list: [],
    now: '',
    label: '直播中'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  timestampToTime: function(timestamp) {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000
    var h = date.getHours() + ':';
    var m = date.getMinutes();
    return h + m;
  },

  onLoad: function(options) {
    var _this = this;
    this.setData({
      live_address: options.address,
      address: options.address,
      channel: options.name,
      id: options.id
    })

    _this.refresh_info();
  },

  /* 切换历史回放 */
  changeTime: function(event) {
    var _this = this;
    wx.request({
      url: 'https://hdtv.neu6.edu.cn/v1/sources/' + this.data.id + '/' + event.currentTarget.dataset.start + '-' + event.currentTarget.dataset.end,
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        // console.log(res.data);
        _this.setData({
          address: res.data.sourceList[0].path,
          title: event.currentTarget.dataset.title,
          state: 1,
          label: '[回放]' + event.currentTarget.dataset.start1 + '-' + event.currentTarget.dataset.end1
        });
      }
    });
  },

  refresh: function() {
    var _this = this;
    var timestamp = Date.parse(new Date());
    for (var i = 0; i < _this.data.replay_list[7].list.length; i++) {
      if (_this.data.replay_list[7].list[i].startTime * 1000 < _this.data.now && _this.data.replay_list[7].list[i].endTime * 1000 > _this.data.now) {
        _this.setData({
          title: _this.data.replay_list[7].list[i].title,
          live_title: _this.data.replay_list[7].list[i].title
        });
      }
    }
  },

  /* 返回直播 */
  return_live: function() {
    this.setData({
      state: 0,
      address: this.data.live_address,
      title: this.data.live_title,
      label: '直播中'
    });
    this.refresh();
  },

  refresh_info: function(){
    // 获取当前时间
    var timestamp = Date.parse(new Date());

    var _this = this;
    this.setData({
      now: timestamp
    })

    /* 获得回放列表 */
    wx.request({
      url: "https://hdtv.neu6.edu.cn/v1/list/" + this.data.id + "/7",
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        _this.setData({
          replay_list: res.data,
        });

        // 减少setData次数，提高性能
        var tempList = new Array;
        tempList = _this.data.replay_list;
        console.log(res.data);
        for (var j = 0; j < _this.data.replay_list.length; j++) {
          for (var i = 0; i < _this.data.replay_list[j].list.length; i++) {
            var new_startTime = _this.timestampToTime(_this.data.replay_list[j].list[i].startTime);
            tempList[j].list[i].startTime1 = new_startTime;
            var new_endTime = _this.timestampToTime(_this.data.replay_list[j].list[i].endTime);
            tempList[j].list[i].endTime1 = new_endTime;

            if (_this.data.replay_list[j].list[i].startTime * 1000 > _this.data.now) {
              tempList[j].list[i].start = 0;
            } else if (_this.data.replay_list[j].list[i].startTime * 1000 < _this.data.now && _this.data.replay_list[j].list[i].endTime * 1000 > _this.data.now && _this.data.state == 0) {
              _this.setData({
                title: _this.data.replay_list[j].list[i].title,
                live_title: _this.data.replay_list[j].list[i].title
              });
              tempList[j].list[i].start = 2;
            } else {
              tempList[j].list[i].start = 1;
            }
          }
        }
        _this.setData({
          replay_list: tempList,
        });
      }
    });
  }
})