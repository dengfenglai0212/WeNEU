// pages/map/map.js
Page({

  data: {
    userid: '',
    currentCampus: 1,
    markers: [{
      iconPath: '/images/index/map/unbrella.png',
        id: 0,
        latitude: 41.652184,
        longitude: 123.425743,
        width: 20,
        height: 20,
        callout: {
          content: '一号楼',
          color: '#fff',
          fontSize: '27rpx',
          bgColor: '#505050',
          display: 'ALWAYS',
          padding: '5rpx',
          borderColor: '#505050',
          borderRadius: 5
        }
      },
      {
        iconPath: '/images/index/map/unbrella.png',
        id: 0,
        latitude: 41.655828,
        longitude: 123.426595,
        width: 20,
        height: 20,
        callout: {
          content: '信息A/B',
          color: '#fff',
          fontSize: '27rpx',
          bgColor: '#505050',
          display: 'ALWAYS',
          padding: '5rpx',
          borderColor: '#505050',
          borderRadius: 5
        }
      },
      {
        iconPath: '/images/index/map/unbrella.png',
        id: 0,
        latitude: 41.654181,
        longitude: 123.426692,
        width: 20,
        height: 20,
        callout: {
          content: '生科A/B',
          color: '#fff',
          fontSize: '27rpx',
          bgColor: '#505050',
          display: 'ALWAYS',
          padding: '5rpx',
          borderColor: '#505050',
          borderRadius: 5
        }
      },
      {
        iconPath: '/images/index/map/unbrella.png',
        id: 0,
        latitude: 41.655884,
        longitude: 123.422803,
        width: 20,
        height: 20,
        callout: {
          content: '建筑A/B',
          color: '#fff',
          fontSize: '27rpx',
          bgColor: '#505050',
          display: 'ALWAYS',
          padding: '5rpx',
          borderColor: '#505050',
          borderRadius: 5
        }
      },
      {
        iconPath: '/images/index/map/unbrella.png',
        id: 0,
        latitude: 41.654317,
        longitude: 123.422754,
        width: 20,
        height: 20,
        callout: {
          content: '文管A/B',
          color: '#fff',
          fontSize: '27rpx',
          bgColor: '#505050',
          display: 'ALWAYS',
          padding: '5rpx',
          borderColor: '#505050',
          borderRadius: 5
        }
      }
    ]
  },

  scan: function(e) {
    wx.navigateTo({
      url: 'detail/detail'
    })

  },

  swichNav: function(e) { //点击更换坐标点系
    var currentTab = e.target.dataset.current
    this.setData({
      currentTab: currentTab
    })
    this.onLoad(currentTab, currentTab);
  },

  onLoad: function(currentTab, tag) {
    this.setData({
      userid: wx.getStorageSync('stuID'),
    });
    // 从本地存储获取学号及密码
    var value = wx.getStorageSync('stuPass_eone')

    // 判断登录状态决定显示内容
    if (!value) {
      wx.navigateTo({
        url: '../login_eone/login_eone',
      })
    } 

    // this.setData({
    //   markers: this.data.all_markers[currentTab - 1]
    // })
  },

  onReady: function() {

  },

  onShow: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})