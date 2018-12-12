App({
  /**     * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）     */
  onLaunch: function() {
    var that = this;
  },
  /**     * 设置全局变量     */
  globalData: {
    openid: 0,
    // wx_url_1: 'https://self.antke.cn/interface/dateService.do',
    // wx_url_1: 'https://yitunnel.antke.cn/interface/dateService.do',
    wx_url_1: 'https://rqrj.antke.cn/interface/dateService.do',
    wx_url_2: '&grant_type=authorization_code',
    params: {
      channel: "4",
    }
  }
})