// pages/goods_list/index.js
import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],
    goodsList: []
  },
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  total: 0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.QueryParams.cid = options.cid || ''
    this.QueryParams.query = options.query || ''
    this.getGoodsList()
  },
  getGoodsList() {
    request({
      url: '/goods/search',
      data: this.QueryParams
    }).then(({data: {message}}) => {
      // console.log(message)
      this.total = Math.ceil(message.total / this.QueryParams.pagesize)
      this.setData({
        goodsList: [...this.data.goodsList,...message.goods]
      })
    })
  },
  // bar 点击切换
  tabsItmeActive(e) {
    let {index} = e.detail
    let {tabs} = this.data
    tabs.forEach((v,i) => index === v.id ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },
  onReachBottom() {
    if(this.QueryParams.pagenum >= this.total) {
      wx.showToast({title: '没有更多了~'});
    }else {
      this.QueryParams.pagenum++
      this.getGoodsList()
    }
  }
})