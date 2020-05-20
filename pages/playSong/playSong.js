// pages/playSong/playSong.js
import create from "../../utils/store/create"
import store from '../../store/index'
create.Page(store, {
    use: ['list', 'index', 'name'],
    /**
     * 页面的初始数据
     */
    data: {
        detail: [],
        name: '',
        musicTime: '00:00',
        sliderValue: 0

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: '播放歌曲',
        })
        let arr = this.store.data.list[this.store.data.index]
        this.setData({
            detail: arr,
            name: this.store.data.name
        })
        console.log(this.data.detail);
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