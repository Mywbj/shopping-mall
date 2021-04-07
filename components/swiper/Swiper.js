// components/swiper/Swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    swiperData: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    newSwiperData: []
  },
  /**
   * 组件的方法列表
   */
  methods: {

  },
  created() {
    setTimeout(() => {
      this.properties.swiperData.forEach((key) => {
        key.navigator_url = key.navigator_url.replace('main', 'index')
      })
      this.setData({
        newSwiperData: this.properties.swiperData
      })
    },1000)
  }
})
