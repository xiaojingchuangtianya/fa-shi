// pages/allTools/OCR.js
//上传，返回，下载的处理都在这个页面进行处理好了，单页面的异步请求就可以了
Page({
    data: {
        //看情况，是否需要将数据保留存储，还是说用完就丢，不过感觉服务器内存太小了，还是别存了，记录一下日志就好，方便查问题
        getReturn:"false",//是否获得返回数据了
        takeOrget:"false",//拍照上传或者本地选择上传
        uploadImg:"",
        recieveImg:""
    },
    onLoad: function (options) {

    },

    // 将图片发送给服务器进行识别，修改展示字段
    sendImg(){
        
    },
//对内容进行标记处理，以及展示的眼睛隐藏/显示
    markTarget(){
        //
    },

    //切换 图片上传 /拍照
    exchange(){
        this.setData({
            takeOrget : !this.data.takeOrget
        })
    } ,
    //上传图片,上面两个方式都需要执行到这个函数
    uploadImg(){

    },
    //调用摄像机
    takePhoto(){
        console.log("现在是拍照上传")
        this.uploadImg();
    },
    //选择图片
    chooseImg(){
        console.log("现在是本地选择上传")
        this.uploadImg();
    },


})