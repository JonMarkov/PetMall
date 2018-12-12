// pages/userhome/address/address.js
Page({
  data: {
    // 列表数据
    list: [{
        // 状态
        id: 0,
        // title
        name: "客户签收人:徐剑 已签收 感谢使用圆通快递",
        // 时间
        dates: "2016-08-30"
      }, {
        id: 1,
        name: "北京市通州区梨园公司北京市通州区梨园公司北京市通州区梨园公司北京市通州区梨园公司",
        dates: "2016-08-30"
      }, {
        id: 2,
        name: "【北京市通州区梨园公司】已收入【北京市通州区梨园公司】已收入",
        dates: "2016-08-30"
      }

      , {
        id: 3,
        name: "北京朝阳区十里堡公司】取件人：小四 已收件",
        dates: "2016-08-30"
      }


    ]


  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var flow_on = options.flow_on
    this.setData({
      flow_on: flow_on
    })
    this.logistics()
  },
  // 遍历物流数据
  logistics:function(){
    var phoneUrl = getApp().globalData.wx_url_1;
    var flow_on = this.data.flow_on
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "selectInvoice",
        flow_no: flow_on
      },
      header: {
        "content-type": "application.josn"
      },
      success: function (res) {
        console.log(res)
      }
    })
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  }
})