// pages/shopcart/shopcart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodList: [],
    checkAll: false,
    totalCount: 0,
    totalPrice: 0,
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    // 获取当前点击的商品id
    var indexNum = e.currentTarget.dataset.index;
    var goodList = this.data.goodList;
    var goods_list = [];
    for (var i in goodList) {
      if (goodList[i].goods_id == indexNum) {
        goods_list.push(goodList[i])

      }
    }

    // 访问的接口
    var phoneUrl = getApp().globalData.wx_url_1;
    // 重定向this
    var that = this;
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "deleteCartGoods",
        goods_list: goods_list,
        user_id: that.data.user_id
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res)
        that.selectCart(that.selectCartCallback)
        that.calculateTotal()
      }
    })
  },

  /**
   * 计算商品总数
   */
  calculateTotal: function() {
    var goodList = this.data.goodList;
    // 初始化商品总数
    var totalCount = 0;
    // 初始化总金额
    var totalPrice = 0;
    // 计算商品总数和商品总价
    for (var i = 0; i < goodList.length; i++) {
      var good = goodList[i];
      if (good.checked) {
        totalCount += good.count;
        totalPrice += good.count * good.sale_price;
      }
    }
    // 商品总价保留两位小数点
    totalPrice = totalPrice.toFixed(2);
    // 把商品总价和总数设置到data中
    this.setData({
      'totalCount': totalCount,
      'totalPrice': totalPrice
    })
  },

  /**
   * 用户点击商品减1
   */
  subtracttap: function(e) {
    // 获取当前点击的商品id
    var indexNum = e.currentTarget.dataset.index;
    // 当前操作索引
    var index = e.currentTarget.dataset.len
    // 全部商品列表
    var goodList = this.data.goodList;
    // 当前索引商品的数量
    var count = goodList[index].count;
    // 当执行减一时执行的事件；如果小于等于1则不改变，否则原基础减1
    if (count <= 1) {
      return;
    } else {
      // 当前商品数量减1
      goodList[index].count--;
      // 把当前列表的所有数据设置到data中
      this.setData({
        'goodList': goodList
      });
    }
    // 获取减一之后的全部商品商品列表
    var newGoodList = this.data.goodList
    // 存储需要的数据
    var addList = [];
    // 遍历当前点击的商品获取传参的数值
    for (var i in newGoodList) {
      if (newGoodList[i].goods_id == indexNum) {
        var temp = {
          goodsId: newGoodList[i].goods_id,
          count: newGoodList[i].count,
          skuId: newGoodList[i].sku_id,
          cover: newGoodList[i].cover,
          sale_price: newGoodList[i].sale_price,
          goods_name: newGoodList[i].goods_name,
          ad_words: newGoodList[i].ad_words,
        }
        addList.push(temp)
      }
    }
    // 把需要传参的值放进data中
    this.setData({
      addList: addList
    })
    // 获取当前需要操作的集合
    var add_list = this.data.addList[0]
    // 访问的接口
    var phoneUrl = getApp().globalData.wx_url_1;
    // 重定向this
    var that = this;
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "updateGoodsNum",
        goods_id: add_list.goodsId,
        goods_num: add_list.count,
        sku_id: add_list.skuId,
        user_id: that.data.user_id,
        goods_name: add_list.goods_name,
        ad_words: add_list.ad_words,
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        that.selectCart(that.selectCartCallback)
        that.calculateTotal()
      }
    })
  },

  /**
   * 用户点击商品加1
   */
  addtap: function(e) {
    // 获取当前点击的商品id
    var indexNum = e.currentTarget.dataset.index;
    // 当前操作索引
    var index = e.currentTarget.dataset.len
    // 全部商品列表
    var goodList = this.data.goodList;
    // 当前索引商品的数量
    var count = goodList[index].count;
    // 点击当前数量项数量加1
    goodList[index].count++;
    // 把全部商品数据设置到data中
    this.setData({
      'goodList': goodList
    });
    // 获取减一之后的全部商品商品列表
    var newGoodList = this.data.goodList
    // 存储需要的数据
    var addList = [];
    // 遍历当前点击的商品获取传参的数值
    for (var i in newGoodList) {
      if (newGoodList[i].goods_id == indexNum) {
        var temp = {
          goodsId: newGoodList[i].goods_id,
          count: newGoodList[i].count,
          skuId: newGoodList[i].sku_id,
          goods_name: newGoodList[i].goods_name,
          ad_words: newGoodList[i].ad_words,
          sale_price: newGoodList[i].sale_price,
        }
        addList.push(temp)
      }
    }
    // 把需要传参的值放进data中
    this.setData({
      addList: addList
    })
    // 获取当前需要操作的集合
    var add_list = this.data.addList[0]
    // 访问的接口
    var phoneUrl = getApp().globalData.wx_url_1;
    // 重定向this
    var that = this;
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "updateGoodsNum",
        goods_id: add_list.goodsId,
        goods_num: add_list.count,
        sku_id: add_list.skuId,
        user_id: that.data.user_id
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        that.selectCart(that.selectCartCallback)
        that.calculateTotal()
      }
    })
  },
  /**
   * 用户选择购物车商品
   */
  checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    // 全部商品数据
    var checkboxItems = this.data.goodList;
    // 类似与订单号
    var values = e.detail.value;
    // 判断购物车中商品是否被选中
    var checkList = []
    for (var i = 0; i < checkboxItems.length; ++i) {
      checkboxItems[i].checked = false;
      for (var j = 0; j < values.length; ++j) {

        if (checkboxItems[i].goods_id == values[j]) {
          console.log(checkboxItems[i])
          var temp = {
            goods_id: checkboxItems[i].goods_id,
            goods_num: checkboxItems[i].count,
            sku_id: checkboxItems[i].sku_id,
            goods_name: checkboxItems[i].goods_name,
            ad_words: checkboxItems[i].ad_words,
            sale_price: checkboxItems[i].sale_price
          }
          checkList.push(temp)
          checkboxItems[i].checked = true;
          break;
        }
      }
      console.log(checkList)
    }
    var checkAll = false;
    if (checkboxItems.length == values.length) {
      checkAll = true;
    }
    this.setData({
      'goodList': checkboxItems,
      'checkAll': checkAll,
      values,
      checkList: checkList
    });
    this.calculateTotal();
  },

  /**
   * 用户点击全选
   */
  selectalltap: function(e) {
    // console.log('用户点击全选，携带value值为：', e.detail.value);
    var value = e.detail.value;
    var checkAll = false;
    if (value && value[0]) {
      checkAll = true;
    }

    var goodList = this.data.goodList;
    var checkList = []
    for (var i = 0; i < goodList.length; i++) {
      console.log(goodList)
      var temp = {
        goods_id: goodList[i].goods_id,
        goods_num: goodList[i].count,
        sku_id: goodList[i].sku_id,
        cover: goodList[i].cover,
        sale_price: goodList[i].sale_price,
        goods_name: goodList[i].goods_name,
        ad_words: goodList[i].ad_words,
        sale_price: goodList[i].sale_price,

      }
      checkList.push(temp)
      var good = goodList[i];
      good['checked'] = checkAll;
    }

    this.setData({
      'checkAll': checkAll,
      'goodList': goodList,
      checkList: checkList
    });
    this.calculateTotal();
  },
  // 结算
  Settlement: function() {
    console.log(this.data)
    var phoneUrl = getApp().globalData.wx_url_1;
    // 重定向this
    var that = this;
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "jiesuanCart",
        goods_list: this.data.checkList,
        user_id: that.data.user_id
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        wx.setStorage({
          key: "checkList",
          data: that.data.checkList
        })
        wx.setStorage({
          key: "addressSelect",
          data: res.data.address_list[0]
        })
        wx.setStorage({
          key: "totalPrice",
          data: that.data.totalPrice
        })
        wx.navigateTo({
          url: '/pages/orderConfirm/orderConfirm',
          success: function(res) {

          },
        })
      }
    })

  },
  // 进入页面遍历数据函数定义
  selectCart: function(callback) {
    // this重定向
    var that = this;
    // 获取本地缓存内数据userId
    wx.getStorage({
      key: "uerid",
      success: function(res) {
        that.setData({
          user_id: res.data
        })
        // 执行遍历
        callback()
      }
    })

  },
  // 进入页面遍历数据函数的回调函数定义
  selectCartCallback: function() {
    var userId = this.data.user_id;
    var phoneUrl = getApp().globalData.wx_url_1;
    var that = this;
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "selectCartGoods",
        user_id: userId
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res)
        var goodsList = res.data.goods_list;
        var goodList = [];
        for (var index in goodsList) {
          // 商品图片
          var cover = goodsList[index].img_url;
          // 商品名称
          var goods_name = goodsList[index].goods_name;
          // 商品价钱
          var sale_price = goodsList[index].sale_price
          // 商品数量
          var count = goodsList[index].count;
          // 商品Id
          var goods_id = goodsList[index].goods_id;
          // 商品广告语
          var ad_words = goodsList[index].ad_words;
          // 商品属性SKUID
          var sku_id = goodsList[index].sku_id;
          // 默认为未选中
          var checked = false;
          var temp = {
            cover: cover,
            goods_name: goods_name,
            sale_price: sale_price,
            count: count,
            goods_id: goods_id,
            ad_words: ad_words,
            sku_id: sku_id,
            checked: checked
          }
          goodList.push(temp)

        }
        if (goodList) {
          that.setData({
            goodList: goodList,
            iscart: false
          })
        } else {
          that.setData({
            goodList: goodList,
            iscart: true
          })
        }

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 遍历数据函数执行
    this.selectCart(this.selectCartCallback)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // 渲染完成之后计算全部数量函数执行
    this.calculateTotal();
    // 遍历数据函数执行
    this.selectCart(this.selectCartCallback)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 渲染完成之后计算全部数量函数执行
    this.calculateTotal();
    // 遍历数据函数执行
    this.selectCart(this.selectCartCallback)
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

  },


})