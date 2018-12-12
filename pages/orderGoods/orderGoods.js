// pages/orderGoods/orderGoods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['全部', '待支付', "进行中", "已完成"],
    currentTab: 0,
  },
  mac: function (e) {
    var index = e.currentTarget.dataset['flow'];
    console.log(index)
    wx.navigateTo({
      url: "/pages/details/details?flow_no=" + index
    })
  },
  // 切换选项
  navbarTap: function (e) {
    var that = this;
    that.setData({
      currentTab: e.currentTarget.dataset.idx,
      TypeItem: that.data.navbar[that.data.currentTab]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getFun(this.getCallback)
  },
  // 获取缓存数据函数
  getFun: function (callback) {
    var that = this;
    wx.getStorage({
      key: "uerid",
      success: function (res) {
        callback(res)
      }
    })
  },
  // 获取缓存数据回调函数
  getCallback: function (res) {
    this.setData({
      user_id: res.data
    })
    // 在全局获取请求接口Url
    var phoneUrl = getApp().globalData.wx_url_1
    //执行初始化遍历事件函数（在此处执行的意义是保证或获取到缓存数据）
    this.orderHttp(phoneUrl, this.orderHttpCallback)
  },

  // 初始化进入之后遍历页面函数
  orderHttp: function (url, callback) {
    console.log('ddd')
    var userId = this.data.user_id;
    wx.request({
      url: url,
      method: "POST",
      data: {
        service: "orderInfoList",
        user_id: userId,
        status: '-1',
        type: '4'
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log(res)
        callback(res.data.order_list)
      }
    })
  },
  // 初始化遍历成功之后函数成功回调
  orderHttpCallback: function (res) {
    // 待支付
    var payable = [];
    // 待收货
    var pendingReceipt = [];
    // 已完成
    var completed = [];
    var all = [];
    // 循环遍历参数放进对应的data表
    for (var idx in res) {
      //获取页面需要参数
      var oStatus = res[idx].status;
      var flow_no = res[idx].flow_no;
      var pic_url = res[idx].pic_url;
      var goods_num = res[idx].goods_num;
      var total = res[idx].total;
      var goods_name = res[idx].goods_name;
      var ad_words = res[idx].ad_words;
      var orderState = oStatus == 0 ? "待支付" : oStatus == 1 ? "进行中" : "已完成"
      //全部商品参数
      var temp = {
        status: orderState,
        flow_no: flow_no,
        pic_url: pic_url,
        goods_num: goods_num,
        total: total,
        goods_name: goods_name,
        ad_words: ad_words
      };
      all.push(temp)
      // 待支付商品参数
      if (oStatus == 0) {
        var temp = {
          status: orderState,
          flow_no: flow_no,
          pic_url: pic_url,
          goods_num: goods_num,
          total: total,
          goods_name: goods_name,
          ad_words: ad_words
        }

        payable.push(temp)
      }
      // 商品参数
      if (oStatus == 1) {
        var temp = {
          status: orderState,
          flow_no: flow_no,
          pic_url: pic_url,
          goods_num: goods_num,
          total: total,
          goods_name: goods_name,
          ad_words: ad_words
        }
        pendingReceipt.push(temp)
      }
      // 已完成商品参数
      if (oStatus == 2) {
        var temp = {
          status: orderState,
          flow_no: flow_no,
          pic_url: pic_url,
          goods_num: goods_num,
          total: total,
          goods_name: goods_name,
          ad_words: ad_words
        }
        completed.push(temp)
      }
    }
    // 设置参数插入data
    this.setData({
      payable: payable,
      pendingReceipt: pendingReceipt,
      completed: completed,
      all: all
    })
  },
  // 点击进入订单详情
  showDialogBtn: function (e) {
    var index = e.currentTarget.dataset['flow'];

    wx.navigateTo({
      url: "/pages/details/details?flow_no=" + index
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // // 此处不再调用，为防止未知bug，所以保留
    // this.getFun(this.getCallback)
    // // 获取公共url
    // var phoneUrl = getApp().globalData.wx_url_1
    // //执行初始化事件函数
    // this.orderHttp(phoneUrl, this.orderHttpCallback)
    // console.log(this.data)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})