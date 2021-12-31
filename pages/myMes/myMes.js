// pages/myMes/myMes.js
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    headWidth:200,
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的信息',
    })
    if (wx.canIUse('getUserProfile')){
      this.setData({
        canIUseGetUserProfile:true
      })
    }
    if(app.globalData.userInfo !=null){
      this.setData({
        hasUserInfo:true,
        userInfo: app.globalData.userInfo,
        headWidth: wx.getSystemInfoSync().windowHeight*0.2,
      })
    }

  },
  getUserProfile(e) {
    wx.getUserProfile({
    desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    success: (res) => {
        app.globalData.userInfo=res.userInfo,
        this.setData({
        userInfo: res.userInfo,
        hasUserInfo: true,
        headWidth: wx.getSystemInfoSync().windowHeight*0.2,
        postMes:{
          "encryptedData":res.encryptedData,
          "iv":res.iv
        }, 
        })
        console.log(this.data)
        // wx.request({
        //   url: 'https://linjingfly.top/auth/wechat/',
        //   header:{"content-type":"application/json"},
        //   method:"POST",
        //   data:{
        //     "encryptedData":this.data.postMes.encryptedData,
        //     "iv":this.data.postMes.iv,
        //     "code":app.globalData.code,
        //   },
        //   success(res){
        //     console.log(res)
        //   },
        //   fail(error){
        //     console.log(error)
        //   }
        // })
    }
    })
  },
  goToHome(){
    wx.navigateTo({
      url: '../head/head',
    })
  },
  showDoing(){
    wx.showModal({
      title: '操作指引',
      confirmText:"打小聪明",
      cancelText:"不用你教",
      content:"你这么聪明的孩子，大概率不会要我教你怎么用这么简单的小程序吧？",
      success:function(res){
        if (res.confirm){
          console.log("确认回调")
        }else{
          console.log("取消回调")
        }
      }
    })
  },
  showAuthor(){
    wx.showModal({
      title: '关于作者',
      showCancel:false,
      content:"坚信生命的所有热爱都是来源于对新事物的好奇,并不出众,但是希望可以活出精彩的一个宅男",
      success:function(res){
        if (res.confirm){
          console.log("确认回调")
        }else{
          console.log("取消回调")
        }
      }
    })
  },
  showBad(){
    wx.showModal({
      title: '意见反馈',
      content:"项目设计时不够严谨,如果存在较影响操作的bug,麻烦请直接反映至qq:1986705965",
      showCancel:false,
      confirmText:"收到",
      success:function(res){
        if (res.confirm){
          console.log("确认回调")
        }else{
          console.log("取消回调")
        }
      }
    })
  },

})