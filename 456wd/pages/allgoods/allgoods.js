// pages/allgoods/allgoods.js
var app=getApp();
Page({

    data: {
        cateItems:{},//加载的商品列表
        empty:false,//是否查询到商品
        curpage: 1,//当前页
        pageNum: 0,//总页数
        mask:false,//遮罩层
        chosen: {
            'pagesize':0,
            'page':0,
            'isnew':'',
            'ishot':'',
            'isrecommand':'',
            'isdiscount':'',
            'istime':'',
            'keywords':'',
            'cate':0,
            'order':'',
            'by':''
        },//商品条件选择
        by:''
    },

    onLoad: function (options) {
        let that=this;
        wx.request({
            url: app.url('goods.get_list'),
            success: function (res) {
                console.log(res.data.list)
                that.setData({
                    cateItems:res.data.list,
                    pageNum: Math.ceil(res.data.total/10)
                })
            }
        })
    },
    // 关键词输入
    keywordInput:function(e){
        let that=this;
        let chosen=that.data.chosen;
        var value=e.detail.value;
        chosen['keywords'] = value;
        that.setData({
            chosen:chosen
        })
        
    },
    // 关键词搜索
    toSearch:function(){
        let that=this;
        let chosen=that.data.chosen
        wx.request({
            url: app.url('goods.get_list'),
            data:chosen,
            success: function (res) {
                that.setData({
                    cateItems: res.data.list,
                    pageNum: Math.ceil(res.data.total / 10)
                })
            }
        })
    },
    // 选择筛选条件
    chooseItem:function(e){
        let that=this;
        let chosen=that.data.chosen;
        let value=e.currentTarget.dataset.type;
        if(chosen[value]){
            chosen[value]='';
        }else{
            chosen[value]=value;
        }
        that.setData({
            chosen:chosen
        })
    },
    // 取消筛选
    cancleScreen:function(){
        this.setData({
            chosen: {
                'pagesize': 0,
                'page': 0,
                'isnew': '',
                'ishot': '',
                'isrecommand': '',
                'isdiscount': '',
                'istime': '',
                'keywords': '',
                'cate': 0,
                'order': 'filter',
                'by': ''
            },
            mask:false
        })
    },
    // 确认筛选
    confirmScreen:function(){
        let that=this;
        let chosen=that.data.chosen;
        let cateItems = that.data.cateItems;
        let empty=that.data.empty;
        if(chosen['order']=='filter'){
            chosen['order']=''
        }
        wx.request({
            url: app.url('goods.get_list'),
            data: chosen,
            success:function(res){
                if(!res.data.list){
                    cateItems=[];
                    empty=true;
                }else{
                    cateItems=res.data.list
                    empty=false;
                }
                that.setData({
                    cateItems: cateItems,
                    mask:false,
                    empty:empty,
                    chosen:chosen
                })
            }
        })
    },
    // 选择综合条件
    screening:function(e){
        let that = this;
        let order = e.currentTarget.dataset.order;
        let chosen = that.data.chosen;
        let mask=that.data.mask;
        let by=that.data.by;
        if(order=='minprice'){
            if ((!chosen['by']) || chosen['by']=='desc'){
                chosen['by']='asc';
            } else if (chosen['by'] == 'asc'){
                chosen['by'] = 'desc'
            }
            by=chosen['by'];
        }else{
            by='';
            if (order == 'filter') {
                mask = true;
            }else if(!order) {
                order = ''
            }
        }
        chosen['order']=order;
        that.setData({
            chosen: chosen,
            mask: mask,
            by:by
        })
        wx.request({
            url: app.url('goods.get_list'),
            data:chosen,
            success:function(res){
                that.setData({
                    cateItems: res.data.list,
                    pageNum: Math.ceil(res.data.total / 10)
                })
            }
        })
    },
    // 上拉加载更多 
    onReachBottom: function () {
        let that = this;
        let curpage=that.data.curpage;//当前页
        let pageNum=that.data.pageNum;//总页数
        let cateItems = that.data.cateItems;//已加载的商品
    
        if (JSON.stringify(cateItems) !="[]"){
            if (curpage >= pageNum) {
                that.setData({
                    curpage: pageNum
                })
                wx.showToast({
                    title: '已经没有更多商品了',
                })
                return false;
            }
            wx.showLoading({
                title: '正在加载...',
            })
            wx.request({
                url: 'https://s1.456wd.com/app/ewei_shopv2_api.php?i=12&r=goods.get_list',
                data: { 'page': curpage++ },
                success: function (res) {
                    wx.hideLoading();
                    that.setData({
                        cateItems: cateItems.concat(res.data.list),
                        curpage: curpage
                    })
                }
            })
        }
    },
    
})