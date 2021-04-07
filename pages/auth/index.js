import {login} from '../../utils/asyncWx'
import {request} from '../../request/index'
Page({
  // 获取用户信息
  async handleGetuserinfo(e) {
    // 1 获取用户信息
    const {encryptedData,rawData,iv,signature} = e.detail
    // 2 获取小程序登陆成功后的code
    const {code} = await login()
    // const authInfoAll = {encryptedData,rawData,iv,signature,code}
    // 3 发送请求 获取用户的token
    // const {token} = await request({
    //   url: '/users/wxlogin',
    //   data: authInfoAll,
    //   method: 'post'
    // })
    // 4 把token存入缓存中 同时跳回上一层
    // wx.setStorageSync('token', token);
    // wx.navigateBack({
    //   delta: 1
    // });
    // 由于我的小程序APPID 不是企业的，调起不了这个接口，会失败。
    // 这里我就直接拿code当token来用啦
    // 把token存入缓存中 同时跳回上一层
    wx.setStorageSync('token', code);
    wx.navigateBack({
      delta: 1
    });
  }
})