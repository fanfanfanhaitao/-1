import api from "../../http/api"

// pages/player/player.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        "typeList": [{
                id: '5001',
                name: '入驻歌手',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
            {
                id: '1001',
                name: '华语男歌手',
            },
            {
                id: '1002',
                name: '华语女歌手',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
            {
                id: '1003',
                name: '华语组合/乐队',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
            {
                id: '2001',
                name: '欧美男歌手',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
            {
                id: '2002',
                name: '欧美女歌手',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
            {
                id: '2003',
                name: '欧美组合/乐队',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
            {
                id: '6001',
                name: '日本男歌手',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
            {
                id: '6002',
                name: '日本女歌手',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
            {
                id: '6003',
                name: '日本组合/乐队',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
            {
                id: '7001',
                name: '韩国男歌手',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
            {
                id: '7002',
                name: '韩国女歌手',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
            {
                id: '7003',
                name: '韩国组合/乐队',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
            {
                id: '4001',
                name: '其他男歌手',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
            {
                id: '4002',
                name: '其他女歌手',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
            {
                id: '4003',
                name: '其他组合/乐队',
                initial: ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
            },
        ],
        active: 0,
        number: 0,
        cat: 5001,
        initial: '',
        artists: []
    },
    clickItem1(e) {
        let index = e.currentTarget.dataset.index
        let id = e.currentTarget.dataset.cat
        this.setData({
            active: index,
            cat: id
        })
        this.getArtist()
    },
    clickItem(e) {
        let index = e.currentTarget.dataset.index
        this.setData({
            number: index,
        })
        let initial = e.currentTarget.dataset.initial
        if (initial === '热') {
            this.setData({
                initial: ''
            })
        } else {
            this.setData({
                initial: initial
            })
        }
        this.getArtist()
    },
    getArtist() {
        wx.showLoading({
            title: '加载中...'
        });
        api.artist(this.data.cat, this.data.initial).then(res => {
            if (res.code === 200) {
                wx.hideLoading()
                this.setData({
                    artists: res.artists
                })
            } else {
                wx.hideLoading()
            }
        }).catch(err => {
            wx.hideLoading()
            console.log(err);
        })
    },
    goPlayer(e) {
        let id = e.currentTarget.dataset.id
        let name = e.currentTarget.dataset.title
        wx.navigateTo({
            url: `../../pages/singerDetails/singerDetails?id=${id}&name=${name}`,

        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: '歌手',
        })
        this.getArtist()
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