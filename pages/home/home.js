// pages/home/home.js
Page({
  data: {
    tools:[
      {name:"PDF转换",icon:"blog"},
      {name:"精美壁纸",icon:"blog"},
      {name:"博客交流",icon:"blog"},
      {name:"JSON解析",icon:"blog"},
      {name:"python文档",icon:"blog"},
      {name:"常见加密方式",icon:"blog"},
      {name:"未完待续...",icon:"blog"},
    ]
  },

 
  onLoad: function (options) {

  },
  goTool(e){
    console.log(e.currentTarget.dataset.page)
  }
})