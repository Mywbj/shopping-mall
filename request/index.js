let ajaxIndex = 0;
export const request = (operties) => {
  ajaxIndex++;
  // 显示加载中
  wx.showLoading({
    title: '加载中',
    mask: true
  });
  return new Promise((resolve, reject) => {
    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
    wx.request({
      ...operties,
      url: baseUrl + operties.url,
      success: (result)=> resolve(result),
      fail: (err)=> reject(err),
      // 请求数据回来了 关闭加载中
      complete: ()=> {
        ajaxIndex--;
        // 为什么要做这个判断呢~ 如果同时触发很多请求得时候这不就乱套了，所以等全部触发完了再关闭
        if(ajaxIndex === 0) {
          // 关闭加载中
          wx.hideLoading()
        }
      }
    });
  })
}