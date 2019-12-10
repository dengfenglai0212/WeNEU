Page({
  data: {
    developers: [
      {
        name: 'Raven',
        description: '主要参与 在东大 前期产品创意设计、界面设计和部分后端工作等。',
        slogan: '坚定的马克思主义战士，毛中特最忠实的拥护者',
        rewardCodeUrl: 'https://ws3.sinaimg.cn/large/006tNbRwly1fxrpgmz0asj30tc0tcq64.jpg'
      },
      {
        name: 'LLG',
        description: '主要参与 在东大 后期用户交互界面设计和部分后端工作等。',
        slogan: '梦想是从事艺术行业 XD',
        rewardCodeUrl: 'https://ws3.sinaimg.cn/large/005BYqpggy1g2o225a6wcj30s00s0juk.jpg'
      },
      {
        name: 'PengPeng',
        description: '主要参与 在东大 部分后端和数据源整理工作等。',
        slogan: 'WP hello world!',
        rewardCodeUrl: 'https://ws3.sinaimg.cn/large/005BYqpggy1g2o2vjvx1bj30u00u0ab5.jpg'
      },
      {
        name: 'yearsyan',
        description: '主要参与 在东大 部分后端和性能优化工作等。',
        slogan: '一个人的命运既要靠自我奋斗也要考虑历史的进程',
        rewardCodeUrl: 'http://ww4.sinaimg.cn/large/006tNc79ly1g52ugrsxhxj30st0st41m.jpg'
      },
      {
        name: 'WeilinerL',
        description: '主要参与 在东大 部分前端和界面优化工作等。',
        slogan: 'Hope is a good thing, maybe the best of things and no good thing erver dies! ',
        rewardCodeUrl: ''
      },
      {
        name: 'dengfenglai0212',
        description: '主要参与 在东大 部分前端和界面优化工作等。',
        slogan: '等风也等你',
        rewardCodeUrl: ''
      },
      {
        name: 'Lilycui98',
        description: '主要参与 在东大 部分前端界面UI设计和用户交互体验等。',
        slogan: '设计改变一切',
        rewardCodeUrl: ''
      } 
      ]
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接   
      urls: [e.currentTarget.dataset.url] // 需要预览的图片http链接列表   
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
  }
})