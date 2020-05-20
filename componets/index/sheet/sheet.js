// componets/index/sheet/sheet.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        result: {
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
        goToList(e) {
            console.log(e);
            let id = e.currentTarget.dataset.id
            wx.navigateTo({
                url: `/pages/songSheet/songSheet?id=${id}`,

            });
        }
    }
})