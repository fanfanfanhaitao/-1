// componets/singerDetails/hotAlbums/hotAlbums.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        album: {
            type: Array,
            value: []
        }
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
        goAlbum(e) {
            let id = e.currentTarget.dataset.id
            wx.navigateTo({
                url: `/pages/album/album?id=${id}`,

            });
        }
    }
})