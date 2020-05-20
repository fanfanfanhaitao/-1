import api from "../../http/api"
const util = require('../../common/util.js');
//Page Object
var app = getApp()
Page({
    data: {
        active: 0,
        banner: [],
        result: [],
        albums: [],
        data: [],
        Song: [],
        program: [],
        more: [],
        realkeyword: '',
        allMatch: [],
        hot: [],
        tab: [
            { title: '综合', type: 1018 },
            { title: '单曲', type: 1 },
            { title: '歌单', type: 1000 },
            { title: '歌手', type: 100 },
            { title: '专辑', type: 10 },
            { title: '视频', type: 1014 },
            { title: '电台', type: 1009 },
            { title: '用户', type: 1002 }
        ],
        mv: [],
        artist: [],
        album: [],
        search: [],
        history: [],
        value: '',
        msg: '',
        keyword: '',
        type: 1018,
        active1: 0,
        number: 0,
        screenWidth: 0,
        screenHeight: 0,
        imgwidth: 0,
        imgheight: 0,
    },
    onLoad() {
        var _this = this;
        wx.getSystemInfo({
            success: function(res) {
                _this.setData({
                    screenHeight: res.windowHeight,
                    screenWidth: res.windowWidth,

                });
            }
        });
    },
    imageLoad(e) {
        var _this = this;
        var $width = e.detail.width, //获取图片真实宽度
            $height = e.detail.height,
            ratio = $width / $height; //图片的真实宽高比例
        var viewWidth = 690, //设置图片显示宽度，
            viewHeight = 700 / ratio; //计算的高度值   
        this.setData({
            imgwidth: viewWidth,
            imgheight: viewHeight
        })
    },
    //获取轮播图
    getBanner() {
        api.banner().then(res => {
            this.setData({
                banner: res.banners

            })
        }).catch(err => {
            console.log(err);
        })
    },
    //获取推荐歌单
    getPersonalized() {
        api.personalized().then(res => {

            let arr = res.result
                //把播放量转换
            arr.map(item => {
                item.playCount = Math.round(item.playCount / 10000)
            })
            this.setData({
                result: arr
            })

        }).catch(err => {
            console.log(err);
        })
    },
    //搜索框获取焦点
    clickItem() {
        this.setData({
            active: 1
        })
    },
    clickItem1(e) {
        let index = e.currentTarget.dataset.index
        let type = e.currentTarget.dataset.type
        this.setData({
            active1: index,
            type: type
        })
        this.onSearch()
    },
    //新歌
    newSong() {
        api.newSong().then(res => {
            let arr = res.data
            this.setData({
                data: arr.splice(0, 6)
            })

        }).catch(err => {
            console.log(err);
        })
    },
    //新碟
    newDish() {
        api.newDish().then(res => {
            this.setData({
                albums: res.albums
            })

        }).catch(err => {
            console.log(err);
        })
    },
    //音乐新势力
    getNew() {
        api.personalizedSong().then(res => {
            this.setData({
                Song: res.result
            })

        }).catch(err => {
            console.log(err);
        })
    },
    //推荐电台
    djprogram() {
        api.djprogram().then(res => {

            this.setData({
                program: res.result
            })
        }).catch(err => {
            console.log(err);
        })
    },
    //推荐节目
    recommend() {
        api.recommend().then(res => {
            this.setData({
                more: res.programs
            })

        }).catch(err => {
            console.log(err);
        })
    },
    //搜索默认热词
    searchDefault() {
        api.default().then(res => {
            this.setData({
                realkeyword: res.data.realkeyword
            })
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    },
    //取消搜索搜索时触发
    onCancel() {
        // let num = e.detail
        this.setData({
            active: 0
        })
    },
    //搜索框change事件
    onChange(e) {
        let msg = e.detail
        if (msg !== "") {
            api.suggest(msg).then(res => {
                this.setData({
                    allMatch: res.result.allMatch,
                    msg: msg
                })

            }).catch(err => {
                console.log(err);
            })
        } else {
            this.setData({
                allMatch: [],
                number: 0

            })
        }
    },
    //热搜列表(详细)
    getHot() {
        api.searchHot().then(res => {
            this.setData({
                hot: res.data
            })

        }).catch(err => {
            console.log(err);
        })
    },
    //热词搜索
    sendWord(e) {

        this.setData({
            keyword: e.detail
        })
        this.onSearch()
    },
    //建议搜索
    searchKeyword(e) {
        let word = e.currentTarget.dataset.keyword
        this.setData({
            keyword: word
        })
        this.onSearch()
    },
    //搜索
    onSearch(e) {
        this.setData({
            number: 1,
            allMatch: []
        })
        if (this.data.keyword === '') {
            let keyword = e.detail
            this.setData({
                keyword: keyword,
            })
        }
        //多重匹配
        if (this.data.type === 1018) {
            api.searchMultimatch(this.data.keyword).then(res => {
                if (res.result.mv) {
                    this.setData({
                        mv: res.result.mv,
                        artist: [],
                        album: []
                    })
                } else if (res.result.artist) {
                    let arr = res.result.artist
                    arr.map(item => {
                        item.fansSize = Math.round(item.fansSize / 10000)
                    })
                    this.setData({
                        artist: arr,
                        mv: [],
                        album: []
                    })
                } else if (res.result.album) {
                    this.setData({
                        album: res.result.album,
                        artist: [],
                        mv: []
                    })
                }
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
        }
        //搜索历史
        let history = []
        if (wx.getStorageSync('history')) {
            history = wx.getStorageSync('history')
        }
        history.push(this.data.keyword)
        wx.setStorageSync('history', history)
            //搜索
        api.search(this.data.keyword, this.data.type).then(res => {
            if (this.data.type === 1018) {
                let arr = res.result
                arr.playList.playLists.map(item => {

                })
                arr.video.videos.map(item => {
                    item.playTime = Math.round(item.playTime / 10000)
                })
            }
            if (res.result.albums) {
                res.result.albums.map(item => {
                    item.publishTime = util.formatDate((item.publishTime))
                })

            }
            if (res.result.playlists) {
                res.result.playlists.map(item => {
                    if (item.playCount > 100000) {
                        item.playCount = Math.round(item.playCount / 10000) + '万'
                    }
                })
            }
            if (res.result.videos) {
                res.result.videos.map(item => {
                    if (item.playTime > 100000) {
                        item.playTime = Math.round(item.playTime / 10000) + '万'
                    }
                })
            }
            this.setData({
                search: res.result
            })

        }).catch(err => {
            console.log(err);
        })
    },
    //获取搜索记录
    getHistory() {
        let add = wx.getStorageSync('history')
        if (add.length > 0) {
            let bdd = add.filter(function(item, index, add) {
                return add.indexOf(item) === index;
            });
            this.setData({
                history: bdd,
            })
        }
    },
    onClear() {
        this.setData({
            number: 0
        })
    },
    //options(Object)
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: '网易云音乐',
        })
        this.getBanner()
        this.getPersonalized()
        this.newSong()
        this.newDish()
        this.getNew()
        this.djprogram()
        this.recommend()
        this.searchDefault()
        this.getHot()
        this.getHistory()


    },
    onReady: function() {

    },
    onShow: function() {

    },
    onHide: function() {

    },
    onUnload: function() {

    },
    onPullDownRefresh: function() {

    },
    onReachBottom: function() {

    },
    onShareAppMessage: function() {

    },
    onPageScroll: function() {

    },
    //item(index,pagePath,text)
    onTabItemTap: function(item) {

    }
});