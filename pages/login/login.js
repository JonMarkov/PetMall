Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function(options) {
    var that = this;
    // 获取本地缓存内的上级进入页面
    wx.getStorage({
      key: "entUrl",
      success: function(res) {
        that.setData({
          entUrl: res.data
        })
      }
    })
    // 查看是否授权

    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              //从数据库获取用户信息, 如果客户已经授权用户已经授权过
              wx.switchTab({
                url: '/pages/home/home'
              })
            }
          });
        }
      }
    })
  },
  //判断是否绑定了手机号函数--定义
  phoneHttp: function(userId, callback) {
    var phoneUrl = getApp().globalData.wx_url_1;
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "checkPhone",
        user_id: userId
      },
      header: {
        "content-type": "application.josn"
      },
      success: function(res) {
        callback(res)
      }
    })
  },
  // 判断是否绑定了手机号函数的回调函数--定义
  phoneHttpCallback: function(res) {
    // 把判断结构设置到本地缓存 -- （结果为已绑定手机号或未绑定手机号）
    wx.setStorage({
      key: "phone",
      data: res.data.is_bind_phone
    })
  },
  // 点击授权登录按钮
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      // 把用户信息设置进本地缓存
      wx.setStorage({
        key: "weChat",
        data: e.detail.userInfo
      })
      // 开始授权
      wx.login({
        success: res => {
          var params = {
            service: 'userVerify',
            code: res.code,
            nickName: e.detail.userInfo.nickName,
          }
          params.service = 'userVerify'
          params.code = res.code
          const newparams = Object.assign(params, getApp().globalData.params);
          // const newparams = util.sign(params1)
          wx.request({
            url: getApp().globalData.wx_url_1,
            data: newparams,
            method: "POST",
            // dataType: JSON,
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: res => {
              wx.setStorage({
                key: "uerid",
                data: res.data.user_id
              })
              //从数据库获取用户信息
              var macid = res.data.user_id
              this.phoneHttp(macid, this.phoneHttpCallback)
            }
          })
        }
      });
      // 授权成功之后跳转
      // 如果是分享页面进人则跳转到进入页面；否则跳转到首页
      if (this.data.entUrl) {
        wx.removeStorage({
          key: 'entUrl',
          success: function(res) {
              console.log('123')
          },
        })
        wx.navigateTo({
          url: "/" + this.data.entUrl
        })
      } else {
        wx.switchTab({
          url: '/pages/home/home'
        })
      }

    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
})