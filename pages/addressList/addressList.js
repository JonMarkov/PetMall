Page({
  /**

   * 页面的初始数据

   */

  data: {
    addressList: []
  },
  //  长按事件 执行删除
  longTap: function(e) {
    var that = this
    var phoneUrl = getApp().globalData.wx_url_1;
    var index = e.target.dataset.index;
    var receivingId = that.data.addressList[index].receiving_id;
    var userId = that.data.user_id;
    wx.showModal({
      title: '提示',
      content: '确定删除',
      success: function(res) {
        console.log(res.confirm)
        if (res.confirm) {
          wx.request({
            url: phoneUrl,
            method: "POST",
            data: {
              service: "deleteAdress",
              receiving_id: receivingId,
            },
            header: {
              "content-type": "application/json"
            },
            success: function(res) {
              // 更新数据，存放到data中  
              console.log(res)
              that.selectAdress(userId)
            }
          })
        }

      }
    })
  },
  // 单击事件
  singleTap: function(e) {
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    if (this.data.address) {
      console.log('订单页面进入')
      console.log(this.data)
      wx.setStorage({
        key: "addressSelect",
        data: this.data.addressList[index]
      })
      wx.navigateTo({
        url: '/pages/orderConfirm/orderConfirm',
      })
    } else {
      console.log('个人中心页面进入')
    }
  },
  /**

   * 生命周期函数--监听页面加载

   */
  onLoad: function(options) {
    // 重定向this值
    var that = this;
    // 获取本地缓存中的address值，如果有则是从订单页面页面跳过啦，如果无则是从个人中心跳过来的
    wx.getStorage({
      key: "address",
      success: function(res) {
        that.setData({
          address: res.data
        })
      }
    })
    // 获取user_id
    wx.getStorage({
      key: "uerid",
      success: function(res) {
        that.setData({
          user_id: res.data
        })
        var userId = that.data.user_id;
        // 查询列表函数执行，在获取user_id之后
        that.selectAdress(userId)
      }
    })
  },
  // 查询地址列表函数
  selectAdress: function(userId) {
    var that = this
    var phoneUrl = getApp().globalData.wx_url_1;
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "selectAdress",
        user_id: userId,
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res)
        // 更新数据，存放到data中  
        that.setData({
          addressList: res.data.address_list
        });
      }
    })
  },

  /**

   * 生命周期函数--监听页面显示

   */
  onShow: function() {
    this.onLoad();
  },
  // 点击进入添加页面
  addAddress: function() {
    wx.navigateTo({
      url: '../address/address'
    });
  },
  /* 删除item */
  modAddress: function(e) {
    var index = e.target.dataset.index;
    var receiving_id = this.data.addressList[index].receiving_id;
    wx.navigateTo({
      url: '../address/address?province=' + receiving_id,
    })
  }

})