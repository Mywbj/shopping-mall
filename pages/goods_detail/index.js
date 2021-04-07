// pages/goods_detail/index.js
import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 详情页数据
    goodsMessage: {}
  },
    goodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {goods_id} = options
    this.getGoodsList(goods_id)
  },
  async getGoodsList(goods_id) {
    const {data:{message}} = await request({
      url: '/goods/detail', 
      data: {goods_id:Number(goods_id)}
    })
    this.setData({
      goodsMessage: {
        goods_id: goods_id,
        goods_name: message.goods_name,
        goods_price: message.goods_price,
        // iphone部分升级 不识别webp图片格式
        // 最好解决方式是找后台 让他进行修改
        // 临时自己改的话用 replace(/\.webp/g, '.jpg') 把.webp 替换成.jpg
        goods_introduce: message.goods_introduce.replace(/\.webp/g, '.jpg'),
        goods_small_logo: message.goods_small_logo,
        pics: message.pics
      }
    })
    this.goodsInfo = this.data.goodsMessage
  },
  ClickSwiprImg({currentTarget:{dataset:{current}}}) {
    const urls = this.data.goodsMessage.pics.map(val => val.pics_mid)
    // console.log(current)
    // console.log(urls)
    // 小程序api的放大图片
    wx.previewImage({
      current,
      urls
    });
  },
  // 点击加入购物车
  addTtoCart() {
    /*
      1. 获取浏览器存储的cart数组，如果没有返回口数组
      2. 拿到数组用findIndex()api 来过滤一下，判断数组里面的商品id是否和详情页的一样
         如果不一样返回-1，如果一样返回当前下标
      3. 第一次肯定是空的，所以等于-1，然后给商品对象添加商品num+1, 再把商品对象push到cart数组里
      4. 如果id一样的话，就直接给商品对象num+1 就行了。
      5. 最后把数组wx.setStorageSync('cart', cart); 到浏览器存储里面。
     */
    let cart = wx.getStorageSync('cart') || [];
    let index = cart.findIndex(val => val.goods_id === this.goodsInfo.goods_id)
    if(index === -1) {
      this.goodsInfo.num = 1
      this.goodsInfo.checked = true
      cart.push(this.goodsInfo)
      wx.showToast({
        title: '添加商品成功',
        icon: 'success',
        mask: true
      });
    }else {
      cart[index].num += 1
      wx.showToast({
        title: '单前商品+1',
        icon: 'success',
        mask: true
      });
    }
    wx.setStorageSync('cart', cart);
  }
})