// components/navbar/comment/comment.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        isShow:{
            type: Number,
            value:2
          },
        comments:{
            type:Array,
            value:[],
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        comments:[
          ],
    },  

    /**
     * 组件的方法列表
     */
    methods: {
        showComment(){
            console.log(this.data.isShow)
            if(this.data.isShow!=1){
                this.setData({
                    isShow:1
                })
            }
            else{
                this.setData({isShow:0})
            }
        },
    }
})
