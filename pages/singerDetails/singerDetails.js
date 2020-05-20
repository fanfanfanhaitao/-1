import api from "../../http/api";
import create from "../../utils/store/create"
import store from '../../store/index'
const util = require('../../common/util.js');
const backgroundAudioManager = wx.getBackgroundAudioManager()
    // pages/singerDetails/singerDetails.js
create.Page(store, {
    use: ['list', 'index'],
    computed: {

    },
    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        songs: [],
        list: [
            { title: '主页' },
            { title: '歌曲' },
            { title: '专辑' },
            { title: '视频' },
        ],
        active: 0,
        album: [],
        mvs: [],
        avaut: '',
        url: ''
    },
    //标签栏切换
    clickItem(e) {
        let index = e.currentTarget.dataset.index
        this.setData({
            active: index,
        })
    },
    //获取歌手描述
    descArtist() {
        api.descArtist(this.data.id).then(res => {

        }).catch(err => {
            console.log(err);
        })
    },
    //获取歌曲
    songArtist() {
        api.songArtist(this.data.id).then(res => {
            let arr = res
            arr.hotSongs.map(item => {
                api.getUrl(item.id).then(res => {
                    if (res.data[0].url) {
                        item.src = res.data[0].url
                    }
                }).catch(err => {
                    console.log(err);
                })
            })
            this.setData({
                songs: arr
            })
            this.store.data.list = arr.hotSongs
                // console.log(res);
            console.log(this.store.data.list);
        }).catch(err => {
            console.log(err);
        })
    },
    //获取专辑
    albumArtist() {
        api.albumArtist(this.data.id).then(res => {
            let arr = res.hotAlbums
            arr.map(item => {
                item.publishTime = util.formatDate((item.publishTime))
            })
            this.setData({
                album: res.hotAlbums
            })
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    },
    //获取mv
    mvArtist() {
        api.mvArtist(this.data.id).then(res => {
            let arr = res.mvs
            arr.map(item => {
                if (item.playCount > 10000) {
                    item.playCount = Math.round(item.playCount / 10000) + '万'
                }
            })
            this.setData({
                mvs: res.mvs
            })

        }).catch(err => {
            console.log(err);
        })
    },

    //更多歌曲
    moreSong(e) {
        this.setData({
            active: e.detail
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options);
        this.setData({
            id: options.id,
            img: options.img,
            avaut: options.name
        })
        this.store.data.name = options.name
        wx.setNavigationBarTitle({
            title: options.name,
        })
        this.descArtist()
        this.songArtist()
        this.mvArtist()
        this.albumArtist()


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