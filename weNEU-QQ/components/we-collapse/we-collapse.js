// components/card-title/card-title.js
Component({
  options: {
    addGlobalClass: true
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { 
      this.data.confirm = [];
    },
    hide: function () { 
      this.data.confirm = [];
    },
    resize: function () {
      
    },
  },
  /**
   * 组件的属性列表
   */
  properties: {

    /**
     * datas: {
     * title: "",
     * icon: "", //colorui icon
     * choose: "",
     * items: [{name: , checked: false}]
     * }
     */

    datas: {
      type: Array,
      value: [
        {title: "章节一", icon: "write", items: [
          {name: "复数的概念、表示及运算复数的概念、表示及运算(27题)", checked: false},
          {name: "乘幂与方根(51题)", checked: false},
          {name: "平面点集(51题)", checked: false},
          {name: "函数的连续、导数和解析(13题)", checked: false},
          {name: "函数可导的充要条件(83题)", checked: false},
          {name: "初等解析函数(76题)", checked: false}
        ], choose: ""}, 
        {title: "章节二", icon: "check", items: [
          {name: "复数的概念、表示及运算(27题)1", checked: false},
          {name: "乘幂与方根(51题)1", checked: false},
          {name: "平面点集(51题)1", checked: false},
          {name: "函数的连续、导数和解析(13题)1", checked: false},
          {name: "函数可导的充要条件(83题)1", checked: false},
          {name: "初等解析函数(76题)1", checked: false}
        ], choose: ""},
        {title: "章节三", icon: "favor", items: [
          {name: "复数的概念、表示及运算(27题)2", checked: false},
          {name: "乘幂与方根(51题)2", checked: false},
          {name: "平面点集(51题)2", checked: false},
          {name: "函数的连续、导数和解析(13题)2", checked: false},
          {name: "函数可导的充要条件(83题)2", checked: false},
          {name: "初等解析函数(76题)2", checked: false}
        ], choose: ""}
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    confirm: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    open(e) {
      let choseChange = "datas[" + e.currentTarget.id + "].choose"
      if(this.properties.datas[e.currentTarget.id].choose) {
        this.setData({
          [choseChange]: false
        })
      } else {
        this.setData({
          [choseChange]: true
        })
      }
    }, 
    checkboxChange(e) {
      var temp = e.target.id;
      var index = this.data.confirm.indexOf(temp);
      if(index > -1) {
        this.data.confirm.splice(index, 1);
      } else {
        this.data.confirm.push(temp);
      }
      // console.log(this.data.confirm);
    },
    confirm() {
      this.triggerEvent('confirm', {
        data: this.data.confirm
      })
      // console.log(this.data.confirm);
    }
  }
})
