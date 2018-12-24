// 此页面为购买商品时候未绑定手机号
Page({
  /**
   * 页面的初始数据
   */
  data: {
    buttonClicked: false,
    // input默认是1  
    num: 1,
    // 使用data数据对象设置样式名  
    minusStatus: 'normal',
    maxStatus: 'normal',
    currentTabsIndex: 0,
    goods_num: 1,
    relation_id: 1,
    stock: 1
  },
  addIcon:function(){
    wx.switchTab({
      url: '/pages/ShopCart/ShopCart',
    })
  },
  /* 点击减号 */
  bindMinus: function() {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    var maxStatus = num >= 200 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      maxStatus: maxStatus,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function() {
    var num = this.data.num;
    num++;
    if (num > 200) {
      num--
    }
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    var maxStatus = num >= 200 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      maxStatus: maxStatus,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function(e) {
    var num = e.detail.value;
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    var maxStatus = num >= 200 ? 'disabled' : 'normal';
    if (num < 1) {
      num = 1;
    } else if (num > 200) {
      num = 200
    }
    // 将数值与状态写回  
    this.setData({
      num: num,
      maxStatus: maxStatus,
      minusStatus: minusStatus
    });
  },
  // 点击面值选项
  bindToFace: function(e) {
    var num = 1;
    var maxStatus = 'normal';
    var minusStatus = 'normal';
    var faceNum = e.currentTarget.dataset['face'];
    var goods_id = this.data.goods_id
    var salePrice = this.data.comlist[faceNum].salePrice;
    var price = this.data.comlist[faceNum].price;
    var relation_id = this.data.comlist[faceNum].relation_id;
    var stock = this.data.comlist[faceNum].stock;
    var value_name = this.data.tellAttr[faceNum].value_name
    var currentTabsIndex = faceNum
    this.setData({
      salePrice: salePrice,
      price: price,
      currentTabsIndex: currentTabsIndex,
      relation_id: relation_id,
      goods_id: goods_id,
      stock: stock,
      value_name: value_name,
      num: num,
      maxStatus: maxStatus,
      minusStatus: minusStatus


    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 查看是否授权过小程序
  teach: function(route) {
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.setStorage({
            key: "entUrl",
            data: route
          })
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  },
  onLoad: function(options) {
    // 存储this
    var that = this;
    // skuId
    var sku_id = options.sku_id;
    // 商品Id
    var goods_id = options.goods_id;
    // 分享人id
    var sharrUserId = options.sharrUserId ? options.sharrUserId : ''
    // 本页面url
    var route = this.route + "?goods_id=" + goods_id + "&sku_id=" + sku_id
    // 执行查看是否授权过小程序
    this.teach(route)
    // 存储到data中
    this.setData({
      goods_id: goods_id,
      sku_id: sku_id,
      sharrUserId: sharrUserId
    })
    // 获取userid存储user-id到data中
    wx.getStorage({
      key: "uerid",
      success: function(res) {
        that.setData({
          user_id: res.data
        })
      }
    })
    // 进入页面遍历所需要信息传入页面函数执行
    this.dityDet(this.dityDetCallback)
  },
  // 进入页面遍历所需要信息传入页面函数
  dityDet: function(callback) {
    //现存data参数
    var thisData = this.data
    // 公共url
    var phoneUrl = getApp().globalData.wx_url_1;
    // 获取商户Id
    var goods_id = thisData.goods_id;
    // 获取skuId
    var sku_id = thisData.sku_id
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "goodsDetails",
        goods_id: goods_id,
        sku_id: sku_id
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        callback(res.data)
      }
    })
  },
  // 进入页面遍历所需要信息传入页面函数回调函数
  dityDetCallback: function(res) {
    console.log(res)
    // 商品所需信息
    var goods_info = res.goods_info;
    //SkU商品信息
    var skuList = res.skuList;


    //创建卡券所需信息数组
    var info = [];
    // 获取商品展示图片
    var picList = goods_info.picList;

    var picLi = []
    for (var j in picList) {
      var picUrl = picList[j].picUrl;
      var temp = {
        picUrl: picUrl
      }
      picLi.push(temp)
    }
    // var picList = goods_info.picList[0].picUrl;
    // 获取标题下方广告语
    var adWords = goods_info.adWords;
    // 获取商品介绍大图片
    var goodsDesc = goods_info.goodsDesc;
    // 获取标题名称
    var goodsName = goods_info.goodsName;
    // 获取商户ID
    var goodsid = goods_info.goodsId;
    // 卡券所需信息数组--包含头图，标题，广告语，商品介绍
    var infoTemp = {
      picList: picList,
      goodsName: goodsName,
      adWords: adWords,
      goodsDesc: goodsDesc,
    }
    info.push(infoTemp)
    // 默认展示的现价和原价
    // 现价
    var salePrice = goods_info.salePrice
    // 原价
    var price = goods_info.price;
    // 创建面值信息数组
    var tellAttr = []
    // 遍历初始化数据信息star
    var attrList = goods_info.attrList;
    var gsrList = goods_info.gsrList;

    //循环sku初始化列表
    for (var i in gsrList) {
      // 获取第一层默认显示id
      var gsrList_attr_id = gsrList[i].attr_id;
      var gsrList_relation_id = gsrList[i].relation_id;
      // 循环商品列表信息
      for (var idx in attrList) {
        var faceShow = attrList[idx].value_list

        for (var index in faceShow) {
          var value_name = faceShow[index].value_name;
          var tellTemp = {
            value_name: value_name,
          }
          tellAttr.push(tellTemp)
        }
        //获取第一层显示id
        var attrList_attr_id = attrList[idx].attr_id
        var value_list = attrList[idx].value_list
        if (gsrList_attr_id == attrList_attr_id) {
          for (var j in value_list) {
            var value_list_relation_id = value_list[j].relation_id
            if (gsrList_relation_id == value_list_relation_id) {
              this.setData({
                currentTabsIndex: j,
                relation_id: value_list[j].relation_id,
                value_name: value_list[j].value_name
              })
            } else {

            }
          }
        }
      }
    }
    //创建所有商品信息列表
    var comlist = []
    for (var m in skuList) {
      //现价
      var sale_Price = skuList[m].salePrice
      // 原价
      var price_sale = skuList[m].price;
      //商品goods_id
      var goods_id = skuList[m].goodsId;
      //库存数量
      var stock = skuList[m].stock
      // relationId
      var relationIdList = skuList[m].gsrList[0].relationId;
      var tempComlist = {
        salePrice: sale_Price,
        price: price_sale,
        goods_id,
        stock: stock,
        relation_id: relationIdList
      }
      comlist.push(tempComlist)
    }

    var mallid = {
      info: info,
      tellAttr: tellAttr,
      picLi: picLi
    }
    wx.setStorage({
      key: "mallid",
      data: mallid
    })
    this.setData({
      stock: stock,
      picLi: picLi,
      info: info,
      tellAttr: tellAttr,
      salePrice: salePrice,
      price: price,
      comlist: comlist
    })

  },
  // 防止暴力点击
  violent: function(res) {

    res.setData({
      buttonClicked: true
    })
    setTimeout(function() {
      res.setData({
        buttonClicked: false
      })
    }, 10000)
    this.setData({
      baoli: true
    })
  },
  // 购买按钮
  bindToBuy: function() {
    this.violent(this)
    this.Settlement()
  },
  // 购买函数
  buy: function() {
    // 公共接口
    var phoneUrl = getApp().globalData.wx_url_1;
    // userid
    var userId = this.data.user_id;
    // 购买数量
    var goods_num = this.data.num;
    // relationid
    var relation_id = this.data.relation_id;
    // skuid
    var sku_id = this.data.sku_id

    // sharrUserId
    var sharrUserId = this.data.sharrUserId ? this.data.sharrUserId : ''

    //goodsid
    var goodsid = this.data.goods_id
    // 商品原价
    var new_price = this.data.salePrice
    // 商品现价
    var old_price = this.data.price
    var maName = this.data.value_name

    var mall = {
      goods_num: goods_num,
      new_price: new_price,
      old_price: old_price,
      value_name: maName,
      zong: new_price * goods_num
    }
    wx.setStorage({
      key: "mall",
      data: mall
    })
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "createGoodsOrder",
        user_id: userId,
        share_user_id: sharrUserId,
        goods_id: goodsid,
        goods_num: goods_num,
        relation_id: relation_id,
        sku_id: sku_id

      },
      header: {
        "content-type": "application.josn"
      },
      success: function(res) {
        console.log(res)
        var data_res = res.data.payment
        wx.setStorage({
          key: "payid",
          data: {
            nonceStr: data_res.nonceStr,
            paySign: data_res.paySign,
            signType: data_res.signType,
            timeStamp: data_res.timeStamp,
            package: data_res.package
          }
        })
        wx.navigateTo({
          url: "/pages/orderConfirm/orderConfirm"
        })
      }
    })
  },


  // 结算
  Settlement: function() {
    console.log(this.data)
    var checkList = [];
    var temp = {
      goods_id: this.data.goods_id,
      goods_num: this.data.num,
      sku_id: this.data.sku_id,
      sale_price: this.data.salePrice,
      cover: this.data.picLi[0].picUrl,
      goods_name: this.data.info[0].goodsName,
      ad_words: this.data.info[0].adWords
    }
    checkList.push(temp)
    console.log(checkList)
    var phoneUrl = getApp().globalData.wx_url_1;
    // 重定向this
    var that = this;
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "jiesuanCart",
        goods_list: checkList,
        user_id: that.data.user_id
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res)
        wx.setStorage({
          key: "checkList",
          data: checkList
        })
        wx.setStorage({
          key: "addressSelect",
          data: res.data.address_list[0]
        })
        wx.setStorage({
          key: "totalPrice",
          data: that.data.salePrice * that.data.num
        })
        wx.navigateTo({
          url: '/pages/orderConfirm/orderConfirm',
          success: function(res) {},
        })
      }
    })

  },
  // 添加购物车
  toAddCard: function() {
    var phoneUrl = getApp().globalData.wx_url_1;
    var goodsId = this.data.goods_id;
    var goodsNum = this.data.num;
    var skuId = this.data.sku_id;
    var userId = this.data.user_id;
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "addCard",
        goods_id: goodsId,
        goods_num: goodsNum,
        sku_id: skuId,
        user_id: userId
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res)
        if (res.data.result_code == 1) {
          wx.showToast({
            title: '失败',
            icon: 'err',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.dityDet(this.dityDetCallback)
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
    var goods_idSh = this.data.goods_id;
    var user_idSh = this.data.user_id;
    var sku_id = this.data.sku_id
    return {
      title: '瑞琦e宠',
      // path: "/pages/login/detLogin/detLogin?goods_id=" + goods_idSh + "&" + "sharrUserId=" + user_idSh + "&" + "sku_id=" + sku_id
      path: "/pages/commodityDet/commodityDet?goods_id=" + goods_idSh + "&" + "sku_id=" + sku_id
    }
  }
})