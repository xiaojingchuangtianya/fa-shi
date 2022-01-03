// pages/blogDetail/blogDetail.js
var util = require('../../../utils/util.js')
const app = getApp();
Page({
  data: {
    blog:{},
    navShow:1,
    writeCom:"",
    allComments:[],
    blogId:1
  },
  onLoad: function (options) {
    this.setData({blogId:options["id"]})
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
          console.log(res)
          let result=app.towxml(res.data.content,"html",{})
          // console.log(res.data.comments.length==0)
          that.setData({
            blog:{
            "code":1,
            "title":res.data.title,
            "type":res.data.type,
            "content":result,
            "createTime":dateBefore.getFullYear()==nowDate.getFullYear()?util.YearTime(dateBefore):util.OtherYear(dateBefore),
            "author":res.data.author,
          },
          "allComments":res.data.comments
          })
        }
      },
      fail(error){
        console.log(error)
      }
      
    })
  },
  goToBlog(){
    wx.redirectTo({
      url: '/pages/allTools/blogIndex/blogIndex',
    })
  },
  textBlur(event){
    this.setData({writeCom:event.detail.value})
    // console.log(event.detail.value)
  },
  sendData(event){
    this.setData({
      navShow:event.detail.navShow
    })
    console.log(event.detail)
  },
  sendCom(){
    // console.log(this.data.writeCom)
    // 这里先发送到评论区
    if (this.data.writeCom.replace (/\s+/g,"") ==""){
      wx.showToast({
        title: '评论为空',
      })
    }
    else{
      var that=this;
      var commentData={"name":app.globalData.userInfo==null? "微信用户":app.globalData.userInfo.nickName ,
      "content":that.data.writeCom,
      "blog":that.data.blogId}
      wx.request({
        url: 'https://linjingfly.top/blog/createComment',
        method:"POST",
        data:commentData,
        success(res){
          console.log(res.data)
          commentData["writeTime"]=res.data.writeTime
          that.setData({
            allComments:that.data.allComments.concat([commentData])
          })
        }
      })
      that.setData({
        writeCom:""
      })
  }
  },

})