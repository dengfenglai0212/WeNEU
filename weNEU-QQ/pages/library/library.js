Page({

  data: {
    value: '',
    bookList: [],
    show: false,
    end: false,
    page: 1
  },

  showDetail: function(e) {
    console.log(e.currentTarget.dataset.bookstate);
    wx.showModal({
      title: '索书号：' + e.currentTarget.dataset.searchno,
      content: e.currentTarget.dataset.location
    })
  },

  onReachBottom: function() {
    var that = this;
    if( (!this.data.show) || this.data.end) {
      return;
    }
    this.data.page ++;
    wx.request({
      url: 'https://weneu.neuyan.com/libraryQuery',
      data: {
        'bookname': that.data.value,
        'page': that.data.page
      },
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        if(res.data.code==-1 || res.data.data==null) {
          that.data.end = true;
          return;
        }
        let currentBookList = that.data.bookList;
        for(let i = 0; i < res.data.data.length;i++) {
          currentBookList.push(res.data.data[i]);
        }
        that.setData({
          bookList: currentBookList
        })
      }
    })
  },

  bindSearchInput: function(e) {
    this.setData({
      value: e.detail
    });
  },

  search: function() {
    var that = this;
    console.log("[INFO]Searching " + that.data.value)
    wx.showLoading({
      title: '玩命加载中...',
    })
    wx.request({
      url: 'https://weneu.neuyan.com/libraryQuery',
      data: {
        'bookname': that.data.value,
        'page': '1'
      },
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        console.log.res;
        that.data.page = 1;
        that.data.end = false;
        that.setData({
          bookList: res.data.data,
          show: true
        });
        console.log(res.data);
      },
      complete: function(res) {
        wx.hideLoading();
      }
    })
  },
  
  onShareAppMessage: function() {
    var that = this;
    var shareObj = {
      title: "在东大 | 你想要的，都在这里",
      path: '/pages/index/index',
      imageUrl: '',
    };
    return shareObj;
  },
})