// pages/allTools/docDetail/docDetail.js
Page({
  
  data: {
    moduleName:"python",
    introText:"",
    classes:[],
    functions:[],
    datas:[],
  },
  onLoad: function (options) {
    console.log(options["type"])
    console.log(options["id"])
    var that=this;
    wx.request({
      url: 'https://linjingfly.top/wechat/ModuleAll/'+options["id"],
      success(res){
        // console.log(res)
        that.setData({
          moduleName:res.data.moduleName,
          introText:res.data.moduleDsc,
          classes:res.data.classes,
          functions:res.data.functions,
          datas:res.data.datas
        })
      },
      fail(error){
        console.log(error)
      }
    })

  },

  

  showMoreMethod(e){
    let valName=e.currentTarget.dataset.name
    let getClasses=this.data.classes
    for (var i=0;i<getClasses.length;i++){
      if (getClasses[i].name==valName){//判断到需要更改展开/关闭的一个类时
        if (getClasses[i].isRotate !="imageUp"){
          getClasses[i].isRotate="imageUp"
          for(var j=0;j<getClasses[i].methods.length;j++){
            getClasses[i].methods[j].isShowclass="";
          }
        }
        else{
          getClasses[i].isRotate=""
          for(var j=0;j<getClasses[i].methods.length;j++){
            getClasses[i].methods[j].isShowclass="hideStyle";
          }
        }
      }
    }
    this.setData({
      classes:getClasses
    })
  },
  showMethodDec(e){
    let valName=e.currentTarget.dataset.name
    let methodName=e.currentTarget.dataset.method
    // console.log(e.currentTarget.dataset)
    let getClasses=this.data.classes
    for (var i=0;i<getClasses.length;i++){
      if (getClasses[i].name==valName){//找到已经展开的类
        for (var j=0;j<getClasses[i].methods.length;j++){
          if(getClasses[i].methods[j].methodName==methodName){//找到对应的method
            if(getClasses[i].methods[j].isRotate=="imageUp"){
              getClasses[i].methods[j].isRotate="";
              getClasses[i].methods[j].isShowmethod="hideStyle";
            }
            else{
              getClasses[i].methods[j].isRotate="imageUp";
              getClasses[i].methods[j].isShowmethod="";
            }
          }
        }
      }
    };
    this.setData({
      classes:getClasses
    })
  },
  showMoreFunc(e){
    console.log(this.data.functions)
    let valName=e.currentTarget.dataset.name
    let getFuncs=this.data.functions
    console.log(valName)
    for (var i=0;i<getFuncs.length;i++){
      if (getFuncs[i].methodName==valName){//判断到需要更改展开/关闭的一个类时
        console.log("找到了")
        if (getFuncs[i].isRotate !="imageUp"){
          getFuncs[i].isRotate="imageUp";
          getFuncs[i].isShowclass=""
        }
        else{
          getFuncs[i].isRotate="";
          getFuncs[i].isShowclass="hideStyle"
          }
        }
      }
    this.setData({
      functions:getFuncs
    })
  },
})