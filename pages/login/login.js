import api from "../../http/api"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [
            { title: '手机号登录' },
            { title: "邮箱登录" }
        ],
        active: 0,
        mobile: '',
        password: '',
        num: 0,
        msg: '',
        number: 0,
        message: '',
        disabled: false
    },
    //标签栏切换
    clickItem(e) {
        let index = e.currentTarget.dataset.index
        this.setData({
            active: index,
        })
    },
    //密码框内容
    passwordInput(e) {
        this.setData({
            password: e.detail.value
        })
    },
    //手机号
    mobileInput(e) {
        this.setData({
            mobile: e.detail.value
        })
    },
    //手机框获取焦点
    focus() {
        this.setData({
            num: 0,
            number: 0
        })
    },
    //密码框获取焦点
    passFocus() {
        this.setData({
            number: 0,
        })
    },
    //手机框失去焦点  手机号验证
    phone() {
        var mobile = this.data.mobile;
        if (mobile == '') {
            this.setData({
                num: 1,
                msg: '手机号不能为空',
                disabled: true
            })

            return false
        } else if (mobile.length != 11) {
            this.setData({
                num: 1,
                msg: '手机号长度有误！',
                disabled: true
            })
            return false;
        } else {}
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if (!myreg.test(mobile)) {
            this.setData({
                num: 1,
                msg: '手机号有误！',
                disabled: true
            })
            return false;
        } else {
            this.setData({
                disabled: false
            })
        }
        return true
    },
    //密码框失去焦点
    password() {
        var password = this.data.password
        if (password == '') {
            this.setData({
                number: 1,
                message: '请输入密码',
            })
            return false
        } else if (password.length < 6) {
            this.setData({
                number: 1,
                message: '密码不能少于6位！',
            })
            return false;
        }
        return true
    },
    //登录验证
    btnclick() {
        var mobile = this.data.mobile;
        var password = this.data.password
        console.log(this.phone());
        if (this.phone() & this.password()) {
            api.login(mobile, password).then(res => {
                if (res.code !== 200) {
                    wx.showToast({
                        title: res.msg,
                        icon: 'succes',
                        duration: 1000,
                        mask: true
                    })
                } else if (res.code === 200) {
                    let id = res.account.id
                    wx.setStorageSync("uid", id),
                        wx.showToast({
                            title: "登陆成功",
                            icon: 'succes',
                            duration: 1000,
                            mask: true
                        })
                    console.log(id);
                    wx.switchTab({
                        url: "../../pages/my/my"
                    })
                }
            }).catch(err => {
                wx.showToast({
                    title: err.response.data.msg,
                    icon: 'succes',
                    duration: 1000,
                    mask: true
                })
            })
        }
    },
    goRegister() {
        wx.navigateTo({
            url: "../../pages/register/register"
        })
    },



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: '登录',
        })

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