// pages/allTools/pythonDocIndex/pythonDocIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideStyle:"RslideTwo",//滑动条的动态效果
    pageOneindex:"",
    pageTwoindex:"",
    pageThreeindex:"",
    nowPage:2,//判别页面处于的位置，在1，3页面需要考虑翻动到下一个页面的情况
    startX:0,//滑动时屏幕的初始x坐标
    slideText:["builtIn","热门","最近查看"],
    placeHolder:"输入搜索关键字",
    couldGet:1,
    builtIn:[{"img":"/images/Python.png","name":"fileWrite"},
              {"img":"/images/Python.png","name":"fileWrite"},
              {"img":"/images/Python.png","name":"fileWrite"},
              {"img":"/images/Python.png","name":"fileWrite"},
              {"img":"/images/Python.png","name":"fileWrite"},
              {"img":"/images/Python.png","name":"fileWrite"},
              {"img":"/images/Python.png","name":"fileWrite"},
              {"img":"/images/Python.png","name":"fileWrite"},
              {"img":"/images/Python.png","name":"fileWrite"},
              {"img":"/images/Python.png","name":"fileWrite"},
              {"img":"/images/Python.png","name":"fileWrite"},
              {"img":"/images/Python.png","name":"fileWrite"},
              {"img":"/images/Python.png","name":"fileWrite"},
              {"img":"/images/Python.png","name":"fileWrite"},
              {"img":"/images/Python.png","name":"fileWrite"},
              {"img":"/images/Python.png","name":"fileWrite"}],//存放builtIn
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  slideButton(){
    this.setData({
      slideStyle:"slideTwo"
    })
  },
  touchstart(e){
    // console.log("开始",e.changedTouches[0].clientX)
    this.setData({startX:e.changedTouches[0].clientX})
  },
  touchend(e){
    // console.log("末尾",e.changedTouches[0].clientX)
    if(this.data.startX-e.changedTouches[0].clientX > 50){//滑动向右
      let nowPage=this.data.nowPage;
      if (nowPage==1){
        this.setData({
          nowPage:2,
          slideStyle:"RslideTwo",
          pageOneindex:"hide",
          pageTwoindex:"show",
          pageThreeindex:"hide",
        })
      }
      if (nowPage==2){
        this.setData({
          nowPage:3,
          slideStyle:"RslideThree",
          pageOneindex:"hide",
          pageTwoindex:"hide",
          pageThreeindex:"show",
        })
      }
      if (nowPage==3){
        this.setData({
          nowPage:1,
          slideStyle:"RslideOne",
          pageOneindex:"show",
          pageTwoindex:"hide",
          pageThreeindex:"hide",
        })
      }
    }
    if( this.data.startX - e.changedTouches[0].clientX < -50){//滑动向左
      let nowPage=this.data.nowPage;
      if (nowPage==1){
        this.setData({
          nowPage:3,
          slideStyle:"LslideThree",
          pageOneindex:"hide",
          pageTwoindex:"hide",
          pageThreeindex:"show",
        })
      }
      if (nowPage==2){
        this.setData({
          nowPage:1,
          slideStyle:"LslideOne",
          pageOneindex:"show",
          pageTwoindex:"hide",
          pageThreeindex:"hide",
        })
      }
      if (nowPage==3){
        this.setData({
          nowPage:2,
          slideStyle:"LslideTwo",
          pageOneindex:"hide",
          pageTwoindex:"show",
          pageThreeindex:"hide",
        })
      }
    }
  },

  inputFocus(){
    this.setData({
      placeHolder:""
    })
  },
  inputBlur(){
    this.setData({
      placeHolder:"输入搜索关键字"
    })
  },
  addMore(e){
    if(this.data.couldGet==0){
      console.log("不可以获取")
      
    }
    else{
      console.log("暂时允许")
      console.log(e)
      this.setData({
        couldGet:0,
        builtIn:this.data.builtIn.concat([{"img":"/images/Python.png","name":"fileWrite"},{"img":"/images/Python.png","name":"fileWrite"}])
      }) 
      var that =this;
      setTimeout(function(){that.data.couldGet=1;},2000)
    }
   
  }

})