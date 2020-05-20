import api from "../../../http/api"
// componets/login/emailLogin/emailLogin.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        num: 0,
        number: 0,
        msg: '',
        message: '',
        email: '',
        password: ''
    },
    options: { addGlobalClass: true },
    /**
     * 组件的方法列表
     */
    methods: {
        //邮箱
        mobileInput(e) {
            this.setData({
                email: e.detail.value
            })
        },
        //密码框内容
        passwordInput(e) {
            this.setData({
                password: e.detail.value
            })
        },

        //邮箱获取焦点
        focus() {
            this.setData({
                num: 0,

            })
        },
        //邮箱失去焦点  
        phone() {
            var email = this.data.mobile;
            if (email == '') {
                this.setData({
                    num: 1,
                    msg: '邮箱不能为空',

                })
                return false
            }
            return true
        },

        //密码框获取焦点
        passFocus() {
            this.setData({
                number: 0,
            })
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
        btnclick() {
            var email = this.data.email;
            var password = this.data.password
            if (this.phone() & this.password()) {
                api.emaillogin(email, password).then(res => {
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

                        wx.switchTab({
                            url: "../../pages/my/my"
                        })
                    }
                    console.log(res);
                }).catch(err => {
                    wx.showToast({
                        title: err.response.data.msg,
                        icon: 'succes',
                        duration: 1000,
                        mask: true
                    })
                    console.log(err);
                })
            }

        },
        goRegister() {
            wx.navigateTo({
                url: "../../pages/register/register"
            })
        },
    }
})