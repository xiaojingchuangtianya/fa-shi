const app = getApp()
Page({
  data:{
    imgurl:""
  },
  onLoad(options){
    wx.setNavigationBarTitle({
      title: '高清壁纸下载',
    })
    // console.log(options["imgUrl"])
    this.setData({
      imgurl:"https://linjingfly.top/static/img/true/"+options["imgUrl"]
    })
    wx.authorize({
      scope: 'scope.writePhotosAlbum',
        success:(res)=>{console.log("有权限")},
        fail:(error)=>{wx.showToast({
          title: '未授权无法保存',
          icon: 'error'
      })}
    })
  },
  
  saveImg(){
    if (app.globalData.userInfo ==null){
      this.getUserProfile()
    }
    else{
      this.wecahtDownFile()
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    var that=this
    wx.getUserProfile({
    desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    success: (res) => {
        wx.request({
          url: 'https://linjingfly.top/auth/wechat/',
          header:{"content-type":"application/json"},
          method:"POST",
          data:{
            "encryptedData":res.encryptedData,
            "iv":res.iv,
            "code":app.globalData.code,
          },
          success(res){
            console.log(app.globalData.userInfo)
            app.globalData.userInfo={"avatarUrl":res.data.headIcon,"nickName":
          res.data.nickName}
            console.log(app.globalData.userInfo),
            that.wecahtDownFile()
          },
          fail(error){
            console.log(error)
          }
        })
    }
    })
  },
  wecahtDownFile(){
    wx.getSetting({
      success(res){
        if (!res.authSetting["scope.writePhotosAlbum"]){
          wx.openSetting({
            success(res){console.log(res)},
            fail(error){wx.showToast({
              title: '未被允许保存',
            })}
          })
        }
      }
    })
    wx.showLoading({
      title: '下载中，请稍侯',
    })
    console.log(this.data)
    wx.downloadFile({
      url: this.data.imgurl,
      
      success:(res)=>{
        let tempFilePath = res.tempFilePath
        // console.log("开始下载"+this.data.imgurl),
        // console.log("/"+this.data.imgurl.replace("/","-"))
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success:(res)=>{
            wx.showToast({
              title: '保存至本地成功',
              duration:1000,
            })
          },
          fail:(error)=>{
            console.log(error)
            wx.showToast({
              title: '用户拒绝保存',
              duration:1000,
            })
          }
        })
      },
      fail:(error)=>{
        console.log(error)
      }
    })
  },

})