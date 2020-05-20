import api from "../../http/api"

// pages/my/my.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        uid: '',
        active: 0,
        arr: []
    },
    getLogin() {
        api.loginStatus().then(res => {
            console.log(res);

        }).catch(err => {
            console.log(err);
        })
    },
    goLogin() {
        wx.navigateTo({
            url: "../../pages/login/login"
        })
    },
    getId() {
        if (wx.getStorageSync("uid")) {
            let uid = wx.getStorageSync("uid")
            this.setData({
                uid: uid,
                active: 1
            })
        } else {
            this.setData({
                active: 0
            })
        }
    },
    userDetail() {
        api.userDetail(this.data.uid).then(res => {
            this.setData({
                arr: res
            })
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    },

    esc() {
        wx.removeStorageSync("uid")
        this.setData({
            active: 0
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: '我的',
        })

        this.getId()
        this.getLogin()
        this.userDetail()
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
        this.getId()
        this.userDetail()
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