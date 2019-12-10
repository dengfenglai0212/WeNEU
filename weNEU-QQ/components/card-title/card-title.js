// components/card-title/card-title.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    icon: {
      type: String,
      value: null
    }, 
    text: {
      type: String,
      value: '标题'
    },
    subText: {
      type: String,
      value: '在东大'
    },
    // 自定义图片源址
    picSrc: {
      type: String,
      value: null
    }
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
    
  }
})
