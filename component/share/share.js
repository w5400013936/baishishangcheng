// component/share/share.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show:{
      type: Boolean,
      value: true
    },
    showHome: {
      type: Boolean,
      value: false
    },
    hasTab:{
      type: Boolean,
      value: false
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
    home(){
      this.triggerEvent('home', {});
    }
  }
})
