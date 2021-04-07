//Page Object
import {request} from '../../request/index'
Page({
  data: {
    swiperList: [],
    cateList: [],
    floorList: []
  },
  onLoad: function(options){
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: ({data:{message}})=>{
    //     this.setData({
    //       swiperList: message
    //     })
    //     // 小程序 拿data数据的时候，必须要 this.data
    //     console.log(this.data.swiperList)
    //   }
    // });
    // 用封装的网络请求
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },
  getSwiperList() {
    request({
      url: '/home/swiperdata'
    }).then(({data: {message}}) => {
      this.setData({
        swiperList: message
      })
    })
  },
  getCateList() {
    request({
      url: '/home/catitems'
    }).then(({data: {message}}) => {
      this.setData({
        cateList: message
      })
    })
  },
  getFloorList() {
    request({
      url: '/home/floordata'
    }).then(({data: {message}}) => {
      // 因为接口的数据有错误，遍历更改一下
      message.forEach((key1) => {
      key1.product_list.forEach((key2) => {
        key2.navigator_url = key2.navigator_url.replace('?', '/index?')
      })
    })
    // console.log(message);
      this.setData({
        floorList: message
      })
    })
  }
});