// pages/wineProcess/confirmOrder.js
Page({
  data: {
    goodsList: [],
    allGoodsAndYunPrice: '87',
    curAddressData: ''
  },
  // 未显示收货地址时的点击事件
  addAddress: function() {
    wx.navigateTo({
      url: '/pages/addressList/addressList',
    })
  },
  // 以显示收货地址，需要更换地址
  selectAddress: function() {
    wx.navigateTo({
      url: '/pages/addressList/addressList',
    })
  },
  // 支付
  submitP: function() {
    var phoneUrl = getApp().globalData.wx_url_1;
    if (this.data.curAddressData.length == 0) {
      console.log('123')
      wx.showModal({
        title: '提示',
        content: '请选择收货地址',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    } else {
      console.log(this.data)
      var goodsList = this.data.goodsList;
      var user_id = this.data.user_id
      var receiving_id = this.data.curAddressData.receiving_id
      console.log(goodsList)
      wx.request({
        url: phoneUrl,
        method: "POST",
        data: {
          service: "createCartOrder",
          goods_list: goodsList,
          user_id: user_id,
          receiving_id: receiving_id
        },
        header: {
          "content-type": "application/json"
        },
        success: function(res) {
          console.log(res)
          var phoneUrl = getApp().globalData.wx_url_1;
          var timeStamp_pay = res.data.payment.timeStamp;
          var nonceStr_pay = res.data.payment.nonceStr;
          var package_pay = res.data.payment.package;
          var signType_pay = res.data.payment.signType;
          var paySign_pay = res.data.payment.paySign
          console.log(timeStamp_pay)
          wx.requestPayment({
            'timeStamp': timeStamp_pay,
            'nonceStr': nonceStr_pay,
            'package': package_pay,
            'signType': signType_pay,
            'paySign': paySign_pay,
            'success': function(res) {
              wx.navigateTo({
                url: '/pages/confirmSuc/confirmSuc'
              })
            },
            'fail': function(res) {}
          })
        }
      })
    }
  },
  submitPCallback: function() {

  },
  onLoad: function(options) {
    console.log(options)
    // 重定向this值
    var that = this;
    // 获取本地缓存里选择的收获地址数据
    wx.getStorage({
      key: "addressSelect",
      success: function(res) {
        if(res.data){
          console.log(res.data)
          that.setData({
            curAddressData: res.data
          })
        }

      }
    })
    // 获取本地缓存的商品列表数据
    wx.getStorage({
      key: "checkList",
      success: function(res) {
        that.setData({
          goodsList: res.data
        })
      }
    })
    // 获取本地缓存数据中的总价
    wx.getStorage({
      key: "totalPrice",
      success: function(res) {
        that.setData({
          allGoodsAndYunPrice: res.data
        })
      }
    })
    // 获取本地缓存中的userId
    wx.getStorage({
      key: "uerid",
      success: function(res) {
        that.setData({
          user_id: res.data
        })
      }
    })
    // 设置address值，目的是让下一页面判断上层页面
    wx.setStorage({
      key: "address",
      data: true
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
  },
})