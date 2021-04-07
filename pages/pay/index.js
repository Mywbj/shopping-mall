

/*
  1. 绑定点击事件
  2. 调用小程序内置 api 获取用户的收货地址 wx.chooseAddress

  authSetting scope.address
*/
import {getSetting,chooseAddress,openSetting,showModal,showToast} from '../../utils/asyncWx'
// import regeneratorRuntime from '../../lib/runtime/runtime'
Page({
  data: {
    address: {},
    goodsItem: [],
    TotalPrice: 0,
    TotalNum: 0,
    token: null
  },
  onShow() {
    // 1 获取缓存中的收货地址信息
    const address = wx.getStorageSync('address');
    // 1 获取缓存中的购物车数据
    let goodsItem = wx.getStorageSync('cart') || [];
    // 商品总价格
    let TotalPrice = 0
    // 商品总数量
    let TotalNum = 0
    // 过滤商品是否给选中, 如果项中了，那么就返回这一项商品
    goodsItem = goodsItem.filter(val => val.checked)
    // 把过滤好的商品计算价格和数量
    goodsItem.forEach(val => {
        TotalPrice +=  val.num * val.goods_price
        TotalNum += 1
    });
    // 最后把数据全部保存
    this.setData({
      address,
      goodsItem,
      TotalPrice,
      TotalNum
    })
  },
  async handlePay() {
    const token = wx.getStorageSync('token')
    if(!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }
    this.setData({
      token
    })
    // await showToast({title: '付款成功~'})
  },
  // 点击取消支付
  async cancelPayment() {
    wx.navigateBack({
      delta: 1
    });
    await showToast({title: '您取消了付款~'})
  }
})