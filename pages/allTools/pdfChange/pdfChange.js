// pages/allTools/pdfChange/pdfChange.js
const app = getApp()
Page({
  data: {
    // 允许保留的后缀
    suffixes:["doc","docx","ppt","pptx","xlsx","xlsm","csv","txt"],
    imageSrc:"/images/uploadFile.png",
    isChange:true,
    downloadPath:"",
    pastName:"",
    downLocalPath:"", //下载文件路径
    countTime:0
  },

  onLoad: function (options) {
    //加载
    if(app.globalData.userInfo !=null){
      this.setData({
        hasUserInfo:true,
        userInfo: app.globalData.userInfo,
        headWidth: wx.getSystemInfoSync().windowHeight*0.2,
      })
    }
  },


  choseFile(){
    if (app.globalData.userInfo ==null){
      this.getUserProfile()
    }
    var that=this
    wx.chooseMessageFile({
      count: 1,
      type:"file",
      success(res){
        console.log(res)
        var fileSize=res.tempFiles[0].size;
        var fileName=res.tempFiles[0];
        that.setData({pastName:fileName["name"]})
        if (fileSize >20971520|| that.data.suffixes.indexOf(fileName.name.split(".").pop()) == -1){
          wx.showToast({
            title: '文件后缀不符合要求或超出20M了！',
            icon:"error",
            duration:2000,
            mask:true
          })
        }
        else{
          wx.showLoading({
            title: '正在处理中。。',
          })
          wx.uploadFile({
            filePath: fileName.path,
            name: 'file',
            url: 'https://linjingfly.top/wechat/postData',
            formData:{
              "userName":app.globalData.userInfo.nickName,
            },
            success: function (res) {
              console.log(JSON.parse(res.data)["path"])
              var timeOut=setTimeout(function(){
                that.setData({
                  imageSrc:"/images/recieve.png",
                  isChange:false,
                  downloadPath:"https://linjingfly.top"+JSON.parse(res.data)["path"].replace("static_root","static")
                })
                wx.hideLoading({
                  success: (res) => {
                    console.log("处理结束，准备下载")
                    // console.log(that.data)
                  },
                })
              },1000)

            },
            fail: function (error) {
              console.log(error)
            }
          })
        }

      }
    })
  },

  //获取用户信息
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
        wx.request({
          url: 'https://linjingfly.top/auth/wechat/',
          header:{"content-type":"application/json"},
          method:"POST",
          data:{
            "encryptedData":this.data.postMes.encryptedData,
            "iv":this.data.postMes.iv,
            "code":app.globalData.code,
          },
          success(res){
            console.log(res)
          },
          fail(error){
            console.log(error)
          }
        })
    }
    })
  },

  downLoadFile(){
    wx.showLoading({
      title: '开始下载文件！',
    })
   
    var that=this
    console.log(that.data.downloadPath)
    var threeTime=setInterval(function(){
      wx.downloadFile({
        url: that.data.downloadPath,
        filePath:wx.env.USER_DATA_PATH+"/"+that.data.pastName.split(".")[0]+".pdf",
        success(res){
          if (res.statusCode==404){
            that.setData({countTime:that.data.countTime+1})
            if(that.data.countTime>=5){
              wx.showToast({
                title: '文件出错,请重传',
              })
            }
          }else{
            console.log(res)
            wx.hideLoading()
            wx.openDocument({
              filePath: res.tempFilePath||res.filePath,
            })
            that.setData({
              countTime:0,
              imageSrc:"/images/uploadFile.png",
              isChange:true,
            })
            clearInterval(threeTime);//清楚定时器
          }
        },fail(error){
          console.log(error)
        }
      })
    },3000)

  }
})