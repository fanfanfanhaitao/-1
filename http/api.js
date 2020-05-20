import fly from "./index"

export default {
    //获取轮播图
    banner() {
        return fly.get('banner')
    },
    //获取推荐歌单
    personalized() {
        return fly.get('personalized?limit=6')
    },
    //获取歌单
    playlist(id) { // @param book_id 书籍id
        return fly.get(`/playlist/detail?id=${id}`)
    },
    //新歌
    newSong() {
        return fly.get('/top/song?type=0')
    },
    //新碟
    newDish() {
        return fly.get("/top/album?offset=0&limit=6")
    },
    //音乐新势力
    personalizedSong() {
        return fly.get("/personalized/newsong")
    },
    //推荐电台
    djprogram() {
        return fly.get("/personalized/djprogram")
    },
    //推荐节目
    recommend() {
        return fly.get("/program/recommend")
    },
    //搜索热词
    default () {
        return fly.get("/search/default")
    },
    //搜索建议
    suggest(keywords) {
        return fly.get(`/search/suggest?keywords=${keywords}&type=mobile`)
    },
    //搜索列表
    searchHot() {
        return fly.get("/search/hot/detail")
    },
    //搜索
    search(keywords, type) {
        return fly.get(`/search?keywords=${keywords}&type=${type}`)
    },
    //搜索多重匹配
    searchMultimatch(keywords) {
        return fly.get(`/search/multimatch?keywords=${keywords}`)
    },
    //歌手列表
    artist(cat, initial) {
        if (initial === '') {
            return fly.get(`/artist/list?cat=${cat}`)
        } else {
            return fly.get(`/artist/list?cat=${cat}&initial=${initial}`)
        }
    },
    //歌手描述
    descArtist(id) {
        return fly.get(`/artist/desc?id=${id}`)
    },
    //歌手专辑
    albumArtist(id) {
        return fly.get(`/artist/album?id=${id}`)
    },
    //歌手mv
    mvArtist(id) {
        return fly.get(`/artist/mv?id=${id}`)
    },
    //歌手单曲
    songArtist(id) {
        return fly.get(`/artists?id=${id}`)
    },
    //专辑详情
    albumDetail(id) {
        return fly.get(`/album?id=${id}`)
    },
    //获取歌曲播放url
    getUrl(id) {
        return fly.get(`/song/url?id=${id}`)
    },
    //手机号登录
    login(phone, password) {
        return fly.get(`/login/cellphone?phone=${phone}&password=${password}`)
    },
    //邮箱登录
    emaillogin(email, password) {
        return fly.get(`/login?email=${email}@163.com&password=${password}`)
    },
    // 获取登陆状态
    loginStatus() {
        return fly.get("/login/status")
    },
    //获取用户信息

    userDetail(uid) {
        return fly.get(`/user/detail?uid=${uid}`)
    }






}