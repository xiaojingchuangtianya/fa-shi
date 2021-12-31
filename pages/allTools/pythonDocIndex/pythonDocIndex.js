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
    slideText:["Packages","Module","最近查看"],
    placeHolder:"输入搜索关键字",
    couldGet:1,
    packages:[{'name': 'asyncio', 'img': '/images/Python.png', 'id': '7'}, {'name': 'collections', 'img': '/images/Python.png', 'id': '22'}, {'name': 'concurrent', 'img': '/images/Python.png', 'id': '25'}, 
    {'name':'ctypes', 'img': '/images/Python.png', 'id': '33'}, {'name': 'dbm', 'img': '/images/Python.png', 'id': '36'}, {'name': 'distutils', 'img': '/images/Python.png', 'id': '40'}, {'name': 'email', 'img': '/images/Python.png', 'id': '43'}, {'name': 'encodings', 'img': '/images/Python.png', 'id': '44'}, {'name': 'ensurepip', 'img': '/images/Python.png', 'id': '45'}, {'name': 'html', 'img': '/images/Python.png', 'id': '63'}, {'name': 'http', 'img': '/images/Python.png', 'id': '64'}, {'name': 'idlelib', 'img': '/images/Python.png', 'id': '65'}, {'name': 'importlib', 'img': '/images/Python.png', 'id': '69'}, {'name': 'json', 'img': '/images/Python.png', 'id': '73'}, {'name': 'lib2to3', 'img': '/images/Python.png', 'id': '75'}, {'name': 'logging', 'img': '/images/Python.png', 'id': '78'}, {'name': 'msilib', 'img': '/images/Python.png', 'id': '86'}, {'name': 'multiprocessing', 'img': '/images/Python.png', 'id': '87'}, {'name': 'pydoc_data', 'img': '/images/Python.png', 'id': '113'}, {'name': 'sqlite3', 'img': '/images/Python.png', 'id': '135'}, {'name': 'test', 'img': '/images/Python.png', 'id': '154'}, {'name': 'tkinter', 'img': '/images/Python.png', 'id': '159'}, {'name': 'turtledemo', 'img': '/images/Python.png', 'id': '167'}, {'name': 'unittest', 'img': '/images/Python.png', 'id': '170'}, {'name': 'urllib', 'img': '/images/Python.png', 'id': '171'}, {'name': 'venv', 'img': '/images/Python.png', 'id': '174'}, {'name': 'wsgiref', 'img': '/images/Python.png', 'id': '179'}, {'name': 'xml', 'img': '/images/Python.png', 'id': '181'}, {'name': 'xmlrpc', 'img': '/images/Python.png', 'id': '182'}],//package所有
    module:[],
    lastUse:[],
    page:1,
  },


  onLoad: function (options) {
    this.getMore(0)
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
      this.getMore(this.data.page)
      this.setData({
        page:this.data.page+1
      })
      var that=this
      setTimeout(function(){that.data.couldGet=1;},2000)
    }
   
  },
  getMore(page){
    var that=this;
    wx.request({
      url: 'https://linjingfly.top/wechat/heatDoc/'+page,
      success(res){
        if (res.data.twenty["length"]==0){
          this.showTouch()
        }
        else{
          that.setData({
            module:that.data.module.concat(res.data.twenty)
          })
        }
      },
      fail(error){
        console.log(error)
      }

    })
  },
  showTouch(){
    wx.showToast({
      title: '无更多内容',
      duration:500,
      mask:true,
    })
  },
  //进入具体的详情界面
  docDetail(e){
    let detailUrl=""
    if (e.currentTarget.dataset["type"]=="package"){
       detailUrl ="/pages/allTools/docDetail/docDetail?type=package&id="+e.currentTarget.dataset["id"]
    }
    else{//module下没有相关的module处理
    detailUrl="/pages/allTools/docDetail/docDetail?type=module&id="+e.currentTarget.dataset["id"]
    }
    console.log(detailUrl)
    wx.redirectTo({
      url: detailUrl
    })
  },

})