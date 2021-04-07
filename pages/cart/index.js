

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
    allchecked: false,
    TotalPrice: 0,
    TotalNum: 0
  },
  onShow() {
    // 1 获取缓存中的收货地址信息
    const address = wx.getStorageSync('address');
    this.setData({address})
    // 1 获取缓存中的购物车数据
    const goodsItem = wx.getStorageSync('cart') || [];
    // 1 计数全选
    // every() 数组方法 会遍历一个数组,接受一个回调, 如果每个回调都返回true,那么every方法的返回值为true
    // 只要有一个回调函数返回了false 那么就不再继续循环执行,直接返回false
    // 空数组 调用 every,返回值就是true,所以这里就要做一个判断
    // const allchecked = goodsItem.length > 0 ? goodsItem.every(val => val.checked) : false
    this.setCart(goodsItem)
  },
  // 点击获取收货地址
  async obtainClick() {
    try {
      // 这里优化了一波代码，把获取权限代码都用async形式封装了一遍
      // 1. 调用权限,如果是false就打开小程序的权限设置页面，其时就是调用封装好的openSetting()
      const res1 = await getSetting()
      if(res1.authSetting["scope.address"] === false) {
        // 2. 调用设置权限页面
        await openSetting()
      }
      // 3. 如果不是false就直接获取打开获取地址
      let address = await chooseAddress()
      // 把地址拼接一起
      address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo
      wx.setStorageSync('address', address);
    }catch(err) {
      console.log(err)
    }
  },
  // 商品选中
  handeItemChange(e) {
    // 拿到传过来的id 然后遍历商品 如果是这个id的就返回单前下标
    // 拿到下标后,通过下标找到这个商品,然后把它的checked取反
    // 最后调用setCart函数重新设置
    const id = e.currentTarget.dataset.id
    const goodsItem = wx.getStorageSync('cart') || [];
    const index = goodsItem.findIndex(val => val.goods_id === id)
    goodsItem[index].checked = !goodsItem[index].checked
    this.setCart(goodsItem)
  },
  // 商品全选
  handeAllChange() {
    // 1 获取data中的数据
    let {goodsItem, allchecked} = this.data
    // 2 修改全选复选框的值
    allchecked = !allchecked
    // 3 把所有商品的checked 等于 全选复选框的值
    goodsItem.forEach(val => val.checked = allchecked)
    // 4 最后把数据交给setCart重新设置.
    this.setCart(goodsItem)
  },
  // 增减商品数量
  async numEdit(e) {
    // 获取传过来的数据
    let {num, id} = e.currentTarget.dataset
    // 获取data的数据
    let {goodsItem} = this.data
    // 判断商品的的id是否和传过来的id一致,如果一致就返回单前下标
    const index = goodsItem.findIndex(val => val.goods_id = id)
    // 判断商品的num如果等于1了如果再点击减的话,就提示给用户看是否要删除这个商品呀?
    if(goodsItem[index].num === 1 && num === -1) {
      const res = await showModal({content: '您是否要删除这个商品'})
      // 确定了就从返回的这个下标开始删除,删除一个商品
      if(res.confirm) {
        goodsItem.splice(index, 1)
      }
    }else {
      // 不然就正常++呗
      goodsItem[index].num += num
    }
    // 最后重新设置一下.
    this.setCart(goodsItem)
  },
  // 设置购物车状态,重新计算 底部栏 全选 商品总价格 购买数量
  setCart(goodsItem) {
    // 判断商品数组是否为空,如果数组为空就返回false
    let allchecked = goodsItem.length?true:false
    // 商品总价格
    let TotalPrice = 0
    // 商品总数量
    let TotalNum = 0
    // 单选框 => 遍历每一项商品,判断如果checked为true就增加价格和数量
    // 如果有一项不为true,那就不是全选,其时allchecked(全部复选框)设置为false
    goodsItem.forEach(val => {
      if(val.checked) {
        TotalPrice +=  val.num * val.goods_price
        TotalNum += 1
      }else {
        allchecked = false
      }
    });
    // 最后把数据全部保存
    this.setData({
      goodsItem,
      allchecked,
      TotalPrice,
      TotalNum
    })
    wx.setStorageSync('cart', goodsItem);
  },
  // 点击购物车
  async handlePay() {
    let {address, TotalNum} = this.data
    if(!address.userName) {
      await showToast({title: '请填写收货地址'})
      return;
    }
    if(TotalNum === 0) {
      await showToast({title: '请选择商品'})
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    });
  }
})