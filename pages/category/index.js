// pages/category/index.js
import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧的菜单数据
    leftMenuList: [],
    // 右侧的商品数据
    rightContent: [],
    activeIndex: 0,
    scrollTop: 0
  },
  // 接口的返回数据
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
      1. 进来得时候判断小程序缓存中有没有数据，如果有那么就判断之前缓存好的时间戳和现在得时间戳对比
      2. 对比是否大于这个时间段了，如果没有则用缓存好的，如果过了时间段那就重新请求数据
    */
    const Cates = wx.getStorageSync('cates');
    // console.log(Date.now() - Cates.time)
    if(!Cates) {
      this.getCates()
    }else {
      if(Date.now() - Cates.time > 10000 * 10) {
        this.getCates()
      }else {
        this.setCatesData(Cates.data)
      }
    }
  },
  setCatesData(datas) {
    // 把获取到得数据分配左右
    let leftMenuList = datas.map(val => val.cat_name)
    let rightContent = datas[0].children
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  // 请求数据
  getCates() {
    request({
      url: '/categories'
    }).then(({data:{message}}) => {
      this.Cates = message
      wx.setStorageSync('cates', {time: Date.now(), data: this.Cates});
      this.setCatesData(this.Cates)
      // console.log(this.data.rightContent)
    })
  },
  activeMenu(indexs) {
    let {index} = indexs.currentTarget.dataset
    this.setData({
      activeIndex: index,
      rightContent: this.Cates[index].children,
      scrollTop: 0
    })
  }
})