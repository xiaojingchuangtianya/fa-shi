// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res =>{
        console.log(res.code)
        this.globalData.code=res.code
      }
    })
  },
  globalData: {
    userInfo: null,
  },
  towxml:require('/towxml/index')
})
