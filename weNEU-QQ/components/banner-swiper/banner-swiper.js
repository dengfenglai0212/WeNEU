// components/banner-swiper/banner-swiper.js
Component({
  lifetimes: {
    attached() {
      this.showBanner();
    }
  },
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    cardCur: 0,
    banners: [], //首页广告位滚动条幅
  },

  /**
   * 组件的方法列表
   */
  methods: {

    showBanner: function() {
      var that = this;
      // wx.request({
      //   url: 'https://intp.5io2.com/cache/banner.json',
      //   method: 'GET',
      //   dataType: 'json',
      //   success: function(res) {
      //     console.log(res)
      //     that.setData({
      //       banners: res.data
      //     });
      //   }
      // });

      this.setData({
        banners: [

    {
        "url": "https://s2.ax1x.com/2019/09/08/n8Ml34.jpg",
        "nav": "",
        "type": "image",
        "comment": "欢迎新同学"
    },
    // {
    //     "url": "https://s2.ax1x.com/2019/09/08/n8MQCF.jpg",
    //     "nav": "",
    //     "type": "image",
    //     "comment": "3.0焕然一新"
    // }
    {
        "url": "http://qiniu.weneu.xyz/2020_gentle_to_me.png",
        "nav": "",
        "type": "image",
        "comment": "2020请对我好一点"
    }
]
      })
    },

    
    bannerTo(e) {
      wx.navigateTo({
        url: ""
      })
    },
    cardSwiper(e) { // 处理高光卡片滑动事件
      this.setData({
        cardCur: e.detail.current
      })
    }
  }
})