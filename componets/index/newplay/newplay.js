// componets/index/newplay/newplay.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        albums: {
            type: Array,
            value: []
        },
        data: {
            type: Array,
            value: []
        },
        data1: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        active: 0
    },

    options: { addGlobalClass: true },
    /**
     * 组件的方法列表
     */
    methods: {
        click() {
            if (this.data.active === 0) {
                this.setData({
                    active: 1
                })
            } else {
                this.setData({
                    active: 0
                })
            }
        },
        goAlbum(e) {
            let id = e.currentTarget.dataset.id
            wx.navigateTo({
                url: `/pages/album/album?id=${id}`

            });
        },
    }
})