import api from "../../http/api";
const util = require('../../common/util.js');
// pages/album/album.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        list: []
    },
    albumDetail() {
        api.albumDetail(this.data.id).then(res => {
            res.album.publishTime = util.formatDate((res.album.publishTime))
            this.setData({
                list: res
            })
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    },
    backTo() {
        var pages = getCurrentPages(); //当前页面
        var beforePage = pages[pages.length - 2]; //前一页
        wx.navigateBack({
            success: function() {
                beforePage.onLoad(); // 执行前一个页面的onLoad方法
            }
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        this.setData({
            id: options.id,
        })

        this.albumDetail()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})