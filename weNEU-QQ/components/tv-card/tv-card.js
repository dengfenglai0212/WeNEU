// components/tv-card/tv-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    channelId: {
      type: String,
      value: 'info'
    },
    name: {
      type: String,
      value: 'info'
    },
    viewerNum: {
      type: String,
      value: 'info'
    },
    snapshotUrl: {
      type: String,
      value: 'info'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /* 点击进入频道 */
    enter_channel: function (event) {
      console.log(event)
      var channelId = event.currentTarget.dataset.id;
      var channelUrl = '';
      console.log(channelId);

      wx.request({
        url: 'https://hdtv.neu6.edu.cn/v1/sources/' + channelId,
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          console.log(res.data.sourceList[0].path);
          wx.navigateTo({
            url: '/pages/tv/detail/detail?address=' + res.data.sourceList[0].path + '&name=' + event.currentTarget.dataset.name + '&id=' + channelId
          })
        }
      });
    }
  }
})
