// index.js
// 获取应用实例
var app = getApp()
Page({
    data: {
        isShowType:true,
        typeList:["abstract", "aliens", "animals", "anime", "anime girls", "BioShock", "cats", "CGI", "city", "cityscape", "Clannad", "colorful", "Daft Punk", "Dark Souls", "destruction", "dinosaurs", "Earth", "EVE Online", "fire", "fish", "fox", "Fujibayashi Kyou", "futuristic", "galaxy", "Gandalf", "Ghost in the Shell", "Godzilla", "graffiti", "gray", "Hatsune Miku", "Japan", "Kill la Kill", "Metroid", "Monster Hunter", "music", "mythology", "nature", "nebula", "optical illusion", "panties", "Pixar Animation Studios", "Portal (game)", "river", "Samus Aran", "science fiction", "snow", "space", "Space Invaders", "spaceship", "Star Wars", "subway", "sword", "The Hobbit", "The Lord of the Rings", "tiger", "triangle", "video games", "Vocaloid", "water", "wizard", "wolf"],
        imgList:[],
        imgtype:"",
        startPage:0,
    },
    onLoad() {
      this.animation=wx.createAnimation({
        delay: 0,
        duration:1000,
        timingFunction:"ease"        
      })
      var that=this
      wx.request({
         url: 'https://linjingfly.top/wallpaper/jsonRandom',
         success(res){
            that.setData({
                imgList:res.data
            })
         }
       })
    },
    onReachBottom(){
        if (this.data.imgtype==""){
          this.getMoreImg("https://linjingfly.top/wallpaper/nextRandom",this)
        }
        else{
          var url ='https://linjingfly.top/wallpaper/WechatType='+this.data.imgtype+"?startPage="+this.data.startPage;
          this.getMoreImg(url,this)
          this.data.startPage=this.data.startPage+1
        }
    },
    //前往壁纸详情
    detail(e){
        wx.navigateTo({
          url: '../wallpaperDetail/detail?imgUrl='+e.currentTarget.dataset.imgsrc,
        })
    },
    //展示列表
    showList(){
      this.animation.translate(wx.getSystemInfoSync().windowWidth*0.6).step()
      // console.log(this.animation)
      this.setData({animation: this.animation.export()})
      //隐藏拉出块，显示收起块
      this.setData({
        isShowType:false
      })
    },
    //收起列表
    hideList(){
      this.animation.translate(-wx.getSystemInfoSync().windowWidth*0.6).step()
      // console.log(this.animation)
      this.setData({animation: this.animation.export()})
      this.setData({
        isShowType:true
      })
    },
    //更换为新的种类
    changeType(e){
      // console.log(e.currentTarget.dataset.imgtype)
      this.setData({
        imgtype:e.currentTarget.dataset.imgtype
      }) 
      wx.setNavigationBarTitle({
        title: this.data.imgtype+"类壁纸",
      })
      this.hideList();
      var that=this
      wx.request({
        url: 'https://linjingfly.top/wallpaper/WechatType='+that.data.imgtype+"?startPage="+that.data.startPage,
        success(res){
           //  此处是闭包，this作用域无法指向
           // console.log(res.data)
           that.setData({
               imgList:res.data,
               startPage:that.data.startPage+1
           })
        }
      })
    }, 
    //下拉时获取新数据，
    getMoreImg(url,that){
      wx.request({
        url:url ,
        success(res){
           //  此处是闭包，this作用域无法指向
           if( res.data.length <1){
             wx.showToast({
               title: 'No more Images',
             })
           }
           else{
            //  console.log(res.data)
            that.setData({
              imgList:that.data.imgList.concat(res.data)
             })
            //  console.log(that.data.imgList)
           }
        }
      })
    },
    //前往个人信息界面
    toMes(){
      wx.redirectTo({
        url: '../myMes/myMes',
      })
    },
    toTools(){
      wx.redirectTo({
        url: '../toolHome/tool',
      })
    }
})
