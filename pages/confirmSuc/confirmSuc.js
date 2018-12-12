// pages/home/chargeSuc/chargeSuc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // homeImg: [{
    //   goods_id: 'goods_id',
    //   pic_list: '/images/assets/bg1.png',
    //   goods_name: "腾讯视频黄金VIP会员卡",
    //   ad_words: "这里是广告语",
    //   sale_price: '￥15:00'
    // }, {
    //   goods_id: 'goods_id',
    //   pic_list: '/images/tab1.png',
    //   goods_name: "腾讯视频黄金VIP会员卡",
    //   ad_words: "这里是广告语",
    //   sale_price: '￥15:00'
    // }, {
    //   goods_id: 'goods_id',
    //   pic_list: '/images/tab1.png',
    //   goods_name: "腾讯视频黄金VIP会员卡",
    //   ad_words: "这里是广告语",
    //   sale_price: '￥15:00'
    // }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  JumpOrd: function () {
    wx.navigateTo({
      url: '/pages/orderGoods/orderGoods',
    })
  },
  JumpHome: function () {
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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