// componets/index/search/search.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        realkeyword: {
            type: String,
            value: ''
        },
        allMatch: {
            type: Array,
            value: []
        },
        hot: {
            type: Array,
            value: []
        },
        banner: {
            type: Array,
            value: []
        },
        history: {
            type: Array,
            value: []
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        active: 0,
        value: '',

        images: {},

    },
    options: { addGlobalClass: true },

    /**
     * 组件的方法列表
     */
    methods: {
        imageLoad(e) {
            let $width = e.detail.width, //获取图片真实宽度
                $height = e.detail.height,
                ratio = $width / $height; //图片的真实宽高比例

            if ($width < 40) {
                let viewWidth = 30, //设置图片显示宽度，左右留有16rpx边距
                    viewHeight = 30 / ratio; //计算的高度值
                let image = this.data.images;

                //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
                image[e.target.dataset.index] = {
                    width: viewWidth,
                    height: viewHeight
                }
                this.setData({
                    images: image
                })
            } else {
                let viewWidth = 60, //设置图片显示宽度，左右留有16rpx边距
                    viewHeight = 60 / ratio; //计算的高度值
                let image = this.data.images;

                //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
                image[e.target.dataset.index] = {
                    width: viewWidth,
                    height: viewHeight
                }
                this.setData({
                    images: image
                })
            }
        },
        sendWord(e) {
            this.triggerEvent('sendWord', e.currentTarget.dataset.searchword)
        },
        //删除搜索历史
        clickTo() {
            wx.showModal({
                content: '您确定删除搜索记录吗?',
                success: (result) => {
                    if (result.confirm) {
                        wx.removeStorageSync('history')
                        this.setData({
                            history: [],
                        })
                    } else {

                    }
                }
            })

        },
    }
})