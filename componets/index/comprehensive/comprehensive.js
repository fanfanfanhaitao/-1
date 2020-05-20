// componets/index/comprehensive/comprehensive.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        artist: {
            type: Array,
            value: []
        },
        mv: {
            type: Array,
            value: []
        },
        album: {
            type: Array,
            value: []
        },
        search: {
            type: Object,
            value: {}
        },
    },

    /**
     * 组件的初始数据
     */
    data: {

    },
    options: { addGlobalClass: true },
    /**
     * 组件的方法列表
     */
    methods: {
        //跳转专辑
        goAlbum(e) {
            let id = e.currentTarget.dataset.id
            wx.navigateTo({
                url: `/pages/album/album?id=${id}`,

            });
        },
        //跳转歌手
        goSinger(e) {
            console.log(e);
            let id = e.currentTarget.dataset.id
            wx.navigateTo({
                url: `/pages/singerDetails/singerDetails?id=${id}`,

            });
        },
        //跳转歌单
        goToList(e) {
            console.log(e);
            let id = e.currentTarget.dataset.id
            wx.navigateTo({
                url: `/pages/songSheet/songSheet?id=${id}`,

            });
        }
    }
})