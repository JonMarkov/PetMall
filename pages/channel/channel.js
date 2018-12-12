// pages/classification/goodsList/goodsList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //上箭头
    sortStateUp: true,
    // 下箭头
    sortStateDown: false,
    // 隐藏部分
    statusWin: false,
    statusText: '综合排序'
  },
  // 点击出现隐藏部分函数
  compreClick: function () {
    var statusWinStatus = this.data.statusWin == true ? false : true;
    this.setData({
      statusWin: statusWinStatus
    })
  },
  // 点击价格升序
  priceRise: function () {
    var priceRiseType = '2';
    this.sortHttp(priceRiseType, this.sortHttpCallback);
    this.setData({
      sortStateUp: true,
      sortStateDown: false,
      statusWin: false,
      statusText: '价格升序'
    })
  },
  // 点击价格降序
  priceDecline: function () {
    var priceRiseType = '1';
    this.sortHttp(priceRiseType, this.sortHttpCallback);
    this.setData({
      sortStateUp: false,
      sortStateDown: true,
      statusWin: false,
      statusText: '价格降序'
    })
  },
  // 点击销量升序
  salesRise: function () {
    var priceRiseType = '4';
    this.sortHttp(priceRiseType, this.sortHttpCallback);
    this.setData({
      sortStateUp: true,
      sortStateDown: false,
      statusWin: false,
      statusText: '销量升序'
    })
  },
  // 点击销量降序
  salesDecline: function () {
    var priceRiseType = '3';
    this.sortHttp(priceRiseType, this.sortHttpCallback);
    this.setData({
      sortStateUp: false,
      sortStateDown: true,
      statusWin: false,
      statusText: '销量降序'
    })
  },
  // 点击四个排序后执行得函数
  sortHttp: function (type, callback) {
    var frequency_id = this.data.frequency_id;
    var phoneUrl = getApp().globalData.wx_url_1;
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "selectGoodsInFrequency",
        frequency_id: frequency_id,
        channel: '4',
        type: type
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        callback(res.data)
      }
    })
  },
  // 点击四个排序后执行得函数得回调函数
  sortHttpCallback: function (res) {
    console.log(res)
    var goodsList = res.goods_list
    var homeCom = []
    for (var i in goodsList) {
      // 商品广告语
      var ad_words = goodsList[i].ad_words;
      // 商品id
      var goods_id = goodsList[i].goods_id;
      // 商品的name
      var goods_name = goodsList[i].goods_name;
      // 商品图片
      var pic_list = goodsList[i].pic_url;
      // 商品原价
      var price = goodsList[i].price;
      // 商品现价
      var sale_price = goodsList[i].sale_price;
      // 商品skuId
      var sku_id = goodsList[i].sku_id;
      var temp = {
        ad_words: ad_words,
        goods_id: goods_id,
        goods_name: goods_name,
        pic_list: pic_list,
        price: price,
        sale_price: sale_price,
        sku_id: sku_id
      }
      homeCom.push(temp)
    }
    this.setData({
      homeCom: homeCom
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var frequency_id = options.frequency_id
    this.setData({
      frequency_id: frequency_id
    })
  },
  // 初始化页面遍历数据函数
  goodListHttp: function (url, callback) {
    var frequency_id = this.data.frequency_id
    wx.request({
      url: url,
      method: "POST",
      data: {
        service: "selectGoodsInFrequency",
        frequency_id: frequency_id,
        channel: '4'
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        callback(res.data)
      }
    })
  },
  // 初始化页面出是湖数据函数的回调函数
  goodListHttpCallback(res) {
    console.log(res)
    var goodsList = res.goods_list
    var homeCom = []
    for (var i in goodsList) {
      // 商品广告语
      var ad_words = goodsList[i].ad_words;
      // 商品id
      var goods_id = goodsList[i].goods_id;
      // 商品的name
      var goods_name = goodsList[i].goods_name;
      // 商品图片
      var pic_list = goodsList[i].pic_url;
      // 商品原价
      var price = goodsList[i].price;
      // 商品现价
      var sale_price = goodsList[i].sale_price;
      // 商品skuId
      var sku_id = goodsList[i].sku_id;
      var temp = {
        ad_words: ad_words,
        goods_id: goods_id,
        goods_name: goods_name,
        pic_list: pic_list,
        price: price,
        sale_price: sale_price,
        sku_id: sku_id
      }
      homeCom.push(temp)
    }
    this.setData({
      homeCom: homeCom
    })

  },
  // 搜索框输入监听函数
  goodsListInput: function (e) {
    var searchInput = e.detail.value;
    this.setData({
      searchInput: searchInput
    })
  },
  // 点击搜索
  searchFn: function () {
    var phoneUrl = getApp().globalData.wx_url_1;
    this.searchHttp(phoneUrl, this.searchHttpCallback)
  },
  // 点击搜索后查询信息接口函数
  searchHttp: function (url, callback) {
    var searchData = this.data.searchInput;
    var frequency_id = this.data.frequency_id
    wx.request({
      url: url,
      method: "POST",
      data: {
        service: "selectGoodsInFrequency",
        frequency_id: frequency_id,
        channel: '4',
        goods_name: searchData
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        callback(res.data)
      }
    })
  },
  // 点击搜索查询信息接口函数的回调函数
  searchHttpCallback: function (res) {
    console.log(res)
    var goodsList = res.goods_list
    var homeCom = []
    for (var i in goodsList) {
      // 商品广告语
      var ad_words = goodsList[i].ad_words;
      // 商品id
      var goods_id = goodsList[i].goods_id;
      // 商品的name
      var goods_name = goodsList[i].goods_name;
      // 商品图片
      var pic_list = goodsList[i].pic_url;
      // 商品原价
      var price = goodsList[i].price;
      // 商品现价
      var sale_price = goodsList[i].sale_price;
      // 商品skuId
      var sku_id = goodsList[i].sku_id;
      var temp = {
        ad_words: ad_words,
        goods_id: goods_id,
        goods_name: goods_name,
        pic_list: pic_list,
        price: price,
        sale_price: sale_price,
        sku_id: sku_id
      }
      homeCom.push(temp)
    }
    this.setData({
      homeCom: homeCom
    })
  },
  //点击进入详情页面
  bindToModity: function (e) {
    var goods_id = e.currentTarget.dataset['modity'];
    var sku_id = e.currentTarget.dataset['sku']
    wx.navigateTo({
      url: "/pages/home/commodityDet/commodityDet?goods_id=" + goods_id + "&" + "sku_id=" + sku_id
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var phoneUrl = getApp().globalData.wx_url_1
    this.goodListHttp(phoneUrl, this.goodListHttpCallback)
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