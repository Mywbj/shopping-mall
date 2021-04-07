// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '收藏的店铺',
        isActive: true
      },
      {
        id: 1,
        value: '收藏的商品',
        isActive: false
      },
      {
        id: 2,
        value: '关注的商品',
        isActive: false
      },
      {
        id: 3,
        value: '我的足迹',
        isActive: false
      }
    ],
  },
  changeTitleByIndex(index) {
    let {tabs} = this.data
    tabs.forEach((v,i) => index === v.id ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },
  // bar 点击切换
  tabsItmeActive(e) {
    let {index} = e.detail
    this.changeTitleByIndex(index)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.changeTitleByIndex(Number(options.type))
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