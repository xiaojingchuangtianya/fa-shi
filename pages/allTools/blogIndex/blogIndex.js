// pages/blogIndex/blogIndex.js
Page({
  data: {
    tenHots:[],
    tenBlogs:[]
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '博客概览',
    })
    var that=this
    wx.request({
      url: 'https://linjingfly.top/blog/wechatBlogIndex',
      success(res){
        that.setData({
          tenHots:res.data.tenHot,
          tenBlogs:res.data.tenNew
        })
      },
      fail(error){
        console.log(error)
      }
    })
  },



})