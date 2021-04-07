// pages/search/index.js
import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchVal: '',
    goodsList: []
  },
  // 跳转到navTab页面
  navHome() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },
  // 动态绑定input的值
  putSearchVal(e) {
    let {value} =  e.detail
    this.setData({
      searchVal: value
    })
  },
  async sendMsgTap() {
    const {data} = await request({
      url: '/goods/qsearch',
      data: {
        query: this.data.searchVal
      }
    })
    // console.log(data);
    this.setData({
      goodsList: data.message
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})