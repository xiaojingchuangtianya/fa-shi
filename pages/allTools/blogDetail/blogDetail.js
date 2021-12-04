// pages/blogDetail/blogDetail.js
var util = require('../../../utils/util.js')
Page({
  data: {
    blog:{},
  },
  onLoad: function (options) {
    // console.log(options["id"])
    var that=this
    wx.request({
      url: 'https://linjingfly.top/blog/wechatBlogDetail/'+options["id"],
      success(res){
        if (res.statusCode==404){
          that.setData({
            blog:{
              "code":-1,
              "title":"未找到对应的博客内容",}
          })
        }
        else{
          var dateBefore=new Date(res.data.createTime)
          var nowDate=new Date();
          that.setData({
            blog:{
            "code":1,
            "title":res.data.title,
            "type":res.data.type,
            "content":res.data.content,
            "createTime":dateBefore.getFullYear()==nowDate.getFullYear()?util.YearTime(dateBefore):util.OtherYear(dateBefore),
            "author":res.data.author}
          })
        }
      },
      fail(error){
        console.log(error)
      }
      
    })
  },
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
  goToBlog(){
    wx.redirectTo({
      url: '/pages/allTools/blogIndex/blogIndex',
    })
  },
  toTools(){
    wx.redirectTo({
      url: '/pages/toolHome/tool',
    })
  }
})