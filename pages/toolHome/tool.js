// pages/toolPage/tool.js
const app = getApp()
Page({
  data: {
    toolFuns:[
      {"toolImg":"../../images/pdf.png","toolName":"转PDF","goPage":"pdfChange"},
      {"toolImg":"../../images/writeBlog.png","toolName":"博客交流","goPage":"blogIndex"},
      {"toolImg":"../../images/Python.png","toolName":"python文档","goPage":"pythonDocIndex"},
      {"toolImg":"../../images/json.png","toolName":"JSON解析器","goPage":"/"},
      {"toolImg":"../../images/MD5.png","toolName":"MD5加密","goPage":"/"},
    ]
  },

  onLoad: function (options) {
  },
  goPage(e){
    console.log(e.currentTarget.dataset.page)
    if (app.globalData.userInfo ==null){
      this.getUserProfile(e.currentTarget.dataset.page)
    }else{
      if (e.currentTarget.dataset.page !="/"){
        wx.redirectTo({
          url:"../allTools/"+e.currentTarget.dataset.page+"/"+e.currentTarget.dataset.page,
        })
      }
      else{
        wx.showToast({
          title: '此功能暂未开放',
        })
      }
    }

  },
  toWallpaper(){
    wx.redirectTo({
      url: '../wallpaper/wallpaper',
    })
  },
  toMes(){
    wx.redirectTo({
      url: '../myMes/myMes',
    })
  },  
  getUserProfile(e) {
    console.log(e)
    wx.redirectTo({
      url:"../allTools/"+e+"/"+e,
    })
    // wx.getUserProfile({
    // desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    // success: (res) => {
    //     app.globalData.userInfo=res.userInfo,
    //     wx.request({
    //       url: 'https://linjingfly.top/auth/wechat/',
    //       header:{"content-type":"application/json"},
    //       method:"POST",
    //       data:{
    //         "encryptedData":res.encryptedData,
    //         "iv":res.iv,
    //         "code":app.globalData.code,
    //       },
    //       success(res){
    //         wx.redirectTo({
    //           url:"../allTools/"+e+"/"+e,
    //         })
    //       },
    //       fail(error){
    //         console.log(error)
    //       }
    //     })
    // }
    // })
  },
})