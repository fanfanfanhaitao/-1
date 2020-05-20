import api from "../../../http/api"
import create from "../../../utils/store/create"
import store from "../../../store/index"
create.Component(store, {
    use: ['index'],
    /**
     * 组件的属性列表
     */
    properties: {
        songs: {
            type: Object,
            value: {},

        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        number: 0,
        img: '',
        name: '',
        avaut: ''
    },
    options: { addGlobalClass: true },
    /**
     * 组件的方法列表
     */
    methods: {
        playSong(e) {
            this.store.data.index = e.currentTarget.dataset.index
            this.setData({
                number: 1,
                img: this.store.data.list[this.store.data.index].al.picUrl,
                name: this.store.data.list[this.store.data.index].name,
                avaut: this.store.data.name
            })
            console.log(this.store.data.index);
            const backgroundAudioManager = wx.getBackgroundAudioManager()
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
    }

})