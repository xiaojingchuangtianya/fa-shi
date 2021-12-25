// pages/allTools/pythonEdit/pythonEdit.js
const app = getApp();
Page({

  data: {
    article:{},//代码内容
  },

  onLoad: function (options) {
    let result=app.towxml("def somefunc():","html",{
      // theme:"dark",
      events:{					// 为元素绑定的事件方法
        tap:(e)=>{
          console.log('tap',e);
        }
      }
  })
    this.setData({
      article:result
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

})