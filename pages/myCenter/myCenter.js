// pages/personalCentre/personalCentre.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nullHouse: true, //先设置隐藏
    showModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */

  // 显示弹窗
  ruleBullet: function() {
    var that = this;
    this.setData({
      nullHouse: false, //弹窗显示
    })
    setTimeout(function() {
      that.data.nullHouse = true
    }, 1000)
  },
  // 关闭弹窗
  ruleHide: function() {
    this.setData({
      nullHouse: true, //弹窗关闭
    })
  },
  // 关闭客服弹窗
  go: function() {
    this.setData({
      showModal: false
    })
  },
  // 拨打电话-1
  makePhoneCall1: function() {
    wx.makePhoneCall({
      phoneNumber: '15340158751',
      success: function() {
        console.log("成功拨打电话")
      }
    })
  },
  // 拨打电话-2
  makePhoneCall2: function() {
    wx.makePhoneCall({
      phoneNumber: '15340162692',
      success: function() {
        console.log("成功拨打电话")
      }
    })
  },
  // 我的订单
  toOrde: function() {
    wx.navigateTo({
      url: '/pages/orderGoods/orderGoods'
    })
  },
  // 安全设置
  security: function() {
    wx.navigateTo({
      url: 'security/security'
    })
  },
  // 联系客服
  submit: function() {
    this.setData({
      showModal: true
    })
  },
  // 地址管理
  toAddress: function() {
    wx.removeStorage({
      key: 'address',
      success: function(res) {
        console.log('清除本地缓存address成功')
      },
    })
    wx.navigateTo({
      url: '/pages/addressList/addressList'
    })
  },
  onLoad: function(options) {
    var that = this;
    wx.getStorage({
      key: "uerid",
      success: function(res) {
        that.setData({
          user_id: res.data
        })
      }
    })
    wx.getStorage({
      key: "weChat",
      success: function(res) {
        that.setData({
          weChat: res.data
        })
      }
    })

  },
  cenHttp: function(url, callback) {
    console.log(this.data)
    var user_id = this.data.user_id;
    wx.request({
      url: url,
      method: "POST",
      data: {
        service: "accountInfoDetails",
        user_id: user_id
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        callback(res.data)
      }
    })
  },
  cenCallback: function(res) {
    console.log(res)
    var balance = res.balance;
    var bonus_amount = res.bonus_amount
    var user_phone = res.user_phone
    this.setData({
      balance: balance,
      user_phone: user_phone,
      bonus_amount: bonus_amount
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    wx.getStorage({
      key: "uerid",
      success: function(res) {
        that.setData({
          user_id: res.data
        })
      }
    })
    wx.getStorage({
      key: "weChat",
      success: function(res) {
        that.setData({
          weChat: res.data
        })
      }
    })
    var phoneUrl = getApp().globalData.wx_url_1
    //执行初始化事件函数-遍历插入面值信息
    this.cenHttp(phoneUrl, this.cenCallback)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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