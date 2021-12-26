// pages/allTools/pythonEdit/pythonEdit.js
const app = getApp();
Page({

  data: {
    article:{},//代码内容
    content:"其实一开始我就给内容了",
    placeHolder:"代码编辑区域,点击此处进行编辑",
    focusIsEdit:"dontShow",
    toBottom:0,
    isFoucs:false
  },

  onLoad: function (options) {
    // let result=app.towxml("def somefunc():","html",{
      // theme:"dark",
      // events:{					// 为元素绑定的事件方法
      //   tap:(e)=>{
      //     console.log('tap',e);
      //   }
      // }
  // // })
  //   this.setData({
  //     article:result
  //   })
  },
  keyboardChange(e) {
    if(e.detail.height ==0){
      this.setData({
        focusIsEdit:"dontShow",
      })
    }
    else{
      if (this.data.toBottom >e.detail.height){
        this.setData({
          focusIsEdit:"show",
        })
      }
      else{
        this.setData({
          focusIsEdit:"show",
          toBottom:e.detail.height
        })
      }
    }
    },
    // 缩进
    focusEdit(e){
      console.log(e)
      this.setData({
        focusIsEdit:"show",
      })
    },
    blurEdit(e){
      // console.log(e.detail.value)
      this.setData({
        focusIsEdit:"dontShow",
        content:e.detail.value
      })
    },
    makeTap(e){
      console.log(app.globalData.content)
      this.setData({
        content:"尼玛死了",
        isFoucs:true,
      })
    },
})