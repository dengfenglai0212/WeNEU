Page({

  data: {
    active: 0,
    active1: 0,
    imgalist: ['http://www.neualumni.org.cn/leader/logo1.gif', 'http://www.neualumni.org.cn/leader/logo2.gif', 'http://www.neualumni.org.cn/leader/logo3.gif', 'http://www.neu.edu.cn/assets/photo/photo_name.jpg', 'http://www.neualumni.org.cn/leader/q1.gif', 'http://www.neualumni.org.cn/leader/q2.gif',
    'http://www.neualumni.org.cn/leader/logo4.gif', 'http://www.neualumni.org.cn/leader/VI1.gif', 'http://www.neualumni.org.cn/leader/VI2.gif', 'http://www.neualumni.org.cn/leader/VI3.gif', 'http://www.neualumni.org.cn/leader/VI4.gif',
],
    poster: 'https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=ec455aecbb1c8701d6b6b5e01f44f912/e1fe9925bc315c60f69e8fe785b1cb13495477ab.jpg',
    name: '东北大学校歌',
    author: '词 刘半农| 曲 赵元任',
    src: 'http://music.163.com/song/media/outer/url?id=33544082.mp3'
  },
  audioPlay() {
    this.audioCtx.play()
  },
  audioPause() {
    this.audioCtx.pause()
  },
  audio14() {
    this.audioCtx.seek(14)
  },
  audioStart() {
    this.audioCtx.seek(0)
  },

  previewImage: function(currenturl) {
    wx.previewImage({
      current: this.data.imgalist, // 当前显示图片的http链接   
      urls: this.data.imgalist // 需要预览的图片http链接列表   
    })
  },
  onReady(e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
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