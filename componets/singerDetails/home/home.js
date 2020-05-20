import api from "../../../http/api"
import create from "../../../utils/store/create"
import store from "../../../store/index"
// componets/singerDetails/home/home.js
create.Component(store, {
    use: ['index', 'list', 'bgmusic'],
    computed: {

    },
    /**
     * 组件的属性列表
     */
    properties: {
        songs: {
            type: Object,
            value: {},

        },
        avaut: {
            type: String,
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        active: 1,
        url: '',
        num: 0,
        img: '',
        name: '',
        number: 0
    },
    options: { addGlobalClass: true },
    /**
     * 组件的方法列表
     */
    methods: {
        moreSong() {
            this.triggerEvent('moreSong', this.data.active)
        },
        playSong(e) {
            this.store.data.index = e.currentTarget.dataset.index

            console.log(this.store.data.list);
            let img = e.currentTarget.dataset.img
            let title = e.currentTarget.dataset.title
            this.setData({
                img: img,
                name: title,
                number: 1
            })
            const backgroundAudioManager = wx.getBackgroundAudioManager()
            this.store.data.bgmusic = backgroundAudioManager
            backgroundAudioManager.title = this.store.data.list[this.store.data.index].name
            backgroundAudioManager.epname = this.store.data.list[this.store.data.index].name
            backgroundAudioManager.singer = this.store.data.name
            backgroundAudioManager.coverImgUrl = this.store.data.list[this.store.data.index].al.picUrl
                // 设置了 src 之后会自动播放
            backgroundAudioManager.src = this.store.data.list[this.store.data.index].src
        },
        go() {
            wx.navigateTo({
                url: `/pages/playSong/playSong`,
            });
        },
        player() {
            if (this.data.num === 0) {
                wx.getBackgroundAudioManager().pause()
                this.setData({
                    num: 1
                })
            } else if (this.data.num === 1) {
                wx.getBackgroundAudioManager().play()
                this.setData({
                    num: 0
                })
            }

        },

    }
})