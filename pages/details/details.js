// pages/orderGoods/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonClicked: false,
    kefuShow: false,
    // 弹窗开始是关闭的
    showModal: false,
    showCode: false,
    err: false,
    date: '请选择日期',
    fun_id: 2,
    time: '获取验证码', //倒计时 
    currentTime: 61
  },
  submit: function() {
    this.setData({
      kefuShow: true
    })
  },
  go: function() {
    this.setData({
      kefuShow: false
    })
  },
  // makePhoneCall1: function () {
  //   wx.makePhoneCall({
  //     phoneNumber: '15340158751',
  //     success: function () {
  //       console.log("成功拨打电话")
  //     }
  //   })
  // },
  // makePhoneCall2: function () {
  //   wx.makePhoneCall({
  //     phoneNumber: '15340162692',
  //     success: function () {
  //       console.log("成功拨打电话")
  //     }
  //   })
  // },
  cancellation: function() {
    console.log(this.data)
    var flowNo = this.data.flow_no;
    console.log(flowNo)
    var phoneUrl = getApp().globalData.wx_url_1;
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "calcelOrder",
        flow_no: this.data.flow_no
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        // 执行回调
        console.log(res)
        wx.navigateTo({
          url: '/pages/orderGoods/orderGoods'
        })
      }
    })
  },
// 查看物流
  showDialogBtn:function(){
    var flow_no = this.data.flow_no
    console.log(flow_no)
    wx.navigateTo({
      url: '/pages/logistics/logistics?flow_on=' + flow_no,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 保留this指向
    var that = this;
    // 获取userID
    wx.getStorage({
      key: "uerid",
      success: function(res) {
        // 把userId设置到data中
        that.setData({
          user_id: res.data
        })
      }
    })
    // 从上一页面的参数中获取到的订单号设置到data中
    this.setData({
      flow_no: options.flow_no
    })
  },
  // 防止暴力点击
  violent: function(res) {
    console.log(res)
    res.setData({
      buttonClicked: true
    })
    setTimeout(function() {
      res.setData({
        buttonClicked: false
      })
    }, 1000)
  },
  // 点击去支付按钮函数
  bindToBuy: function() {
    this.violent(this)
    this.buyCallback()
  },
  // 点击去支付按钮之后执行函数
  buyCallback: function(res) {
    // 公共接口
    var phoneUrl = getApp().globalData.wx_url_1;
    // 订单编号
    var flow_no = this.data.flow_no
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "orderToPay",
        flow_no: flow_no

      },
      header: {
        "content-type": "application.josn"
      },
      success: function(res) {
        console.log(res)
        // 获取到支付得参数
        var data_res = res.data.payment
        wx.requestPayment({
          'timeStamp': data_res.timeStamp,
          'nonceStr': data_res.nonceStr,
          'package': data_res.package,
          'signType': data_res.signType,
          'paySign': data_res.paySign,
          'success': function(res) {
            wx.navigateTo({
              url: '/pages/home/commodityDet/confirmSuc/confirmSuc'
            })
          },
          'fail': function(res) {}
        })
      }
    })
  },
  // 联系客服函数，点击拨打电话
  makePhoneCall: function() {
    wx.makePhoneCall({
      phoneNumber: '15340158751',
      success: function() {
        console.log("成功拨打电话")
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // 公共url
    var phoneUrl = getApp().globalData.wx_url_1
    // 执行页面遍历函数
    this.detaHttp(phoneUrl, this.detaHttpCallback)
  },
  // 进入页面遍历
  detaHttp: function(url, callback) {
    // 获取订单编号
    var flow_no = this.data.flow_no
    // 进入页面遍历获取所需信息
    wx.request({
      url: url,
      method: "POST",
      data: {
        service: "orderDetails",
        flow_no: flow_no
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res.data.cardmine_list)
        // 遍历之后回调函数执行
        callback(res.data)
      }
    })
  },
  // 遍历之后的回调函数
  detaHttpCallback: function(res) {
    console.log(res.order_info)
    // 判断订单状态
    var oStatus = res.order_info.status;
    // 订单编号
    var flow_no = res.order_info.flow_no;
    // 商品图片地址
    var pic_url = res.order_info.pic_url;
    // 购买数量
    var goods_num = res.order_info.goods_num;
    // 订单金额
    var total = res.order_info.total;
    // 购买商品name
    var goods_name = res.order_info.goods_name;
    // 商品广告语
    var ad_words = res.order_info.ad_words;
    // 价钱
    var sale_price = res.order_info.sale_price
    // 订单状态文字显示
    var orderState = oStatus == 0 ? "待支付" : oStatus == 1 ? "待提取" : "已完成"
    // 获取下单时间
    var create_date = this.timestampToTime(res.order_info.create_date)
    // 获取支付时间
    var pay_time = this.timestampToTime(res.order_info.pay_time)

    var cardmine_list = res.cardmine_list
    var cardmineList = []
    for (var index in cardmine_list) {
      var card_num = cardmine_list[index].card_num;
      var cardmine = cardmine_list[index].cardmine;
      var temp = {
        card_num: card_num,
        cardmine: cardmine
      }
      cardmineList.push(temp)
    }
    this.setData({
      oStatus: oStatus,
      status: orderState,
      flow_no: flow_no,
      pic_url: pic_url,
      goods_num: goods_num,
      total: total,
      goods_name: goods_name,
      ad_words: ad_words,
      sale_price: sale_price,
      create_date: create_date,
      pay_time: pay_time,
      cardmineList: cardmineList
    })
    console.log(this.data)
  },
  // 时间戳转换为时间
  timestampToTime: function(timestamp) {
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
  }
})