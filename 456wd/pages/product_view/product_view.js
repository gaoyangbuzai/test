// pages/product_view/product_view.js
var app=getApp();
Page({

    data: {
        id:'',
        mask:false,
        cityappear:false,
        activeappear:false,
        spec:false,
        default_number:1,
        curTab:'0',
        total:0,//选择规格显示库存
        realPrice:0,//选择规格显示规格价格
        goods:{}
    },

    onLoad: function (options) {
        let that=this;
        let id=627;
        that.setData({
            id:id
        })
        wx.request({
            url: app.url('goods.get_detail'),
            data:{'id':id},
            success:function(res){
                console.log(res.data.goods)
                that.setData({
                    goods: res.data.goods,
                    total:res.data.goods.total
                })
            }
        })
        wx.showShareMenu({
            withShareTicket: true,
            success: function (res) {
                // console.log('index showShareMenu success')
            },
            fail: function (res) {
                // console.log('index showShareMenu fail')
            }
        })
    },
    // 返回箭头
    goAllgoods:function(){
        wx.switchTab({
            url: '/pages/allgoods/allgoods',
        })
    },
    // 点击遮罩层
    maskDisppear:function(){
        this.setData({mask:false,cityappear:false,activeappear:false,spec:false})
    },
    // 不配送区域
    cityappear:function(){
        this.setData({ mask: true, cityappear:true})
    },
    // 全部活动
    activeappear:function(){
        this.setData({mask:true,activeappear:true})
    },
    // 点击切换标题
    switchNav:function(e){
        let curTab=e.currentTarget.dataset.index;
        this.setData({curTab:curTab})
    },
    // 切换内容
    switchTab:function(e){
        let curTab=e.detail.current;
        if(curTab==this.setData.curTab){
            return false;
        }else{
            this.setData({curTab:curTab})
        }
    },
    // 点击打开规格弹窗
    specAppear:function(){
        let that=this;
        that.setData({
            spec:true,
            mask:true,
        });
    },
    // 关闭规格弹窗
    closespec:function(){
        this.setData({mask:false,spec:false})
    },
    onPullDownRefresh: function () {

    },
    onReachBottom: function () {

    },
    // 手动分享
    // onShare:function(option){
    //     console.log()
    //     let that = this;
    //     let share = that.data.goods.share;
    //     return {
    //         title: share.title,
    //         path: share.link,
    //         imageUrl: share.imgUrl,
    //         success: function (res) {
    //             // console.log('onShareAppMessage')
    //             console.log(res)
    //             var shareTickets = res.shareTickets;
    //             if (shareTickets.length == 0) {
    //                 return false;
    //             }
    //             wx.getShareInfo({
    //                 shareTicket: shareTickets[0],
    //                 success: function (res) {
    //                     var encryptedData = res.encryptedData;
    //                     var iv = res.iv;
    //                     // console.log('index onShareAppMessage getShareInfo success')
    //                     // console.log(res)
    //                 },
    //                 fail: function () {
    //                     // console.log('index onShareAppMessage getShareInfo fail')
    //                 }

    //             })
    //         }
    //     }
    // },
    //右上角 转发
    onShareAppMessage: function (opt) {
        if(opt.from=="button"){
            console.log(opt.target)
        }
        let that=this;
        let share=that.data.goods.share;
        return {
            title:share.title ,
            path: share.link,
            imageUrl:share.imgUrl,
            success: function (res) {
                // console.log('onShareAppMessage')
                console.log(res)
                var shareTickets = res.shareTickets;
                if (shareTickets.length == 0) {
                    return false;
                }
                wx.getShareInfo({
                    shareTicket: shareTickets[0],
                    success: function (res) {
                        var encryptedData = res.encryptedData;
                        var iv = res.iv;
                        // console.log('index onShareAppMessage getShareInfo success')
                        console.log(res)
                    },
                    fail: function () {
                        // console.log('index onShareAppMessage getShareInfo fail')
                    }

                })
            }
        }
    }
})