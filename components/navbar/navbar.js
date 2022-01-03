// components/navbar/navbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isGray:{
      type: Number,
      value:1
    },
    navShow:{
      type:Number,
      value:2
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navShow:1
  },

  methods: {
    //三个跳转事件
    toWallpaper(){
      wx.redirectTo({
        url: '/pages/wallpaper/wallpaper',
      })
    },
    toMes(){
      wx.redirectTo({
        url: '/pages/myMes/myMes',
      })
    }, 
    toTools(){
      wx.redirectTo({
        url: '/pages/toolHome/tool',
      })
    },
    //收缩、弹出事件
    showBottomNav(){
      if(this.data.navShow>=1){
        this.triggerEvent("navShowFun",{"navShow":0})
        this.setData({
          navShow:0
        })
      }
      else{
        this.triggerEvent("navShowFun",{"navShow":1})
        this.setData({
          navShow:1
        })
      } 
    },
  }

})
