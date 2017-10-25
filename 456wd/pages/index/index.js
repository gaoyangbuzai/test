//index.js
//获取应用实例
var app = getApp()
Page({
    data: {

    },
    onLoad: function (options) {
        wx.request({
            url: 'http://s1.456wd.com/app/ewei_shopv2_api.php?i=12&r=goods.get_list',
            success: function (res) {
                console.log(res)
            }
        })
    }
})
