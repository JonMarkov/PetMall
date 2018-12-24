Page({
  /**
   * 页面的初始数据
   */

  data: {
    isDefault: 1,
    provinceIndex: 0, //省份
    cityIndex: 0, //城市
    countyIndex: 0, //区县
    address: '',
    addPhone: '',
    addName: '',
    provinceNames: [""],
    provinceNum: [],
    cityNum: ["11"],
    cityNames: ["请选择"],
    countyNum: ["12"],
    countyNames: ["请选择"]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var receiving_id = options.province ? options.province : ''
    //重定向this
    var that = this
    // 获取缓存内user_id
    wx.getStorage({
      key: "uerid",
      success: function(res) {
        that.setData({
          user_id: res.data
        })
      }
    })
    this.setData({
      // 省份
      proValQh: '',
      // 城市
      cityValQh: '',
      // 区县
      countyValQh: '',
    })
    if (receiving_id) {
      this.entryTr(receiving_id)
    } else {
      this.getProvinceData()
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(e) {

  },
  // 进入页面遍历
  entryTr: function(receiving_id) {
    // 重定向this
    var that = this
    // URL
    var phoneUrl = getApp().globalData.wx_url_1;
    // 请求携带参数
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "selectAddressDetail",
        receiving_id: receiving_id
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        var valQh_1 = res.data.userReceiving.province
        var valQh_2 = res.data.userReceiving.city
        var valQh_3 = res.data.userReceiving.district
        that.setData({
          address: res.data.userReceiving.address,
          addPhone: res.data.userReceiving.contacts,
          addName: res.data.userReceiving.consignee,
          isDefault: res.data.userReceiving.isDefault,
          receivingId: res.data.userReceiving.receivingId
        })
        that.entryTrProCallback(valQh_1, valQh_2, valQh_3)
      }
    })
  },

  //请求当前携带来的省市参数
  entryTrProCallback: function(valQh_1, valQh_2, valQh_3) {
    var that = this
    var phoneUrl = getApp().globalData.wx_url_1;
    // 请求省市数据
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "selectArea",
        rank: '1'
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        // 获取返回值List
        var provin = res.data.areaList;
        // 初始化省份名称
        var provinceNames = [];
        // 初始化省份区号
        var provinceNum = [];
        // 遍历返回值List存进省份区号和名称列表
        for (var i in provin) {
          provinceNum.push(provin[i].area_no)
          provinceNames.push(provin[i].area_name)
        }
        for (var j in provinceNum) {
          if (provinceNum[j] == valQh_1) {
            that.setData({
              provinceIndex: j
            })
            that.entryTrCityCallback(valQh_1, valQh_2, valQh_3)
          }
        }
        // 存进data
        that.setData({
          provinceNames: provinceNames,
          provinceNum: provinceNum,
          proValQh: valQh_1

        })
        console.log(that.data)
      }
    })
  },
  // 请求携带来的城市参数
  entryTrCityCallback: function(valQh_1, valQh_2, valQh_3) {
    var phoneUrl = getApp().globalData.wx_url_1;
    var that = this
    // 请求城市数据
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "selectArea",
        rank: '2',
        area_no: valQh_1
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res.data.areaList)
        // 获取返回值List
        var city = res.data.areaList;
        // 初始化省份名称
        var cityNames = [];
        // 初始化省份区号
        var cityNum = [];
        // 遍历返回值List存进省份区号和名称列表
        for (var i in city) {
          cityNum.push(city[i].area_no)
          cityNames.push(city[i].area_name)

        }
        for (var j in cityNum) {
          if (cityNum[j] == valQh_2) {
            that.setData({
              cityIndex: j
            })
            that.entryTrCounCallback(valQh_1, valQh_2, valQh_3)
          }
        }
        // 存进data
        that.setData({
          cityNames: cityNames,
          cityNum: cityNum,
          cityValQh: valQh_2
        })
      }
    })
  },
  // 请求携带来的区县参数
  entryTrCounCallback: function(valQh_1, valQh_2, valQh_3) {

    var phoneUrl = getApp().globalData.wx_url_1;
    var that = this
    // 请求城市数据
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "selectArea",
        rank: '3',
        area_no: valQh_2
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res.data.areaList)
        // 获取返回值List
        var county = res.data.areaList;
        // 初始化省份名称
        var countyNames = [];
        // 初始化省份区号
        var countyNum = [];
        // 遍历返回值List存进省份区号和名称列表
        for (var i in county) {
          countyNum.push(county[i].area_no)
          countyNames.push(county[i].area_name)

        }
        for (var j in countyNum) {
          if (countyNum[j] == valQh_3) {
            that.setData({
              countyIndex: j
            })
          }
        }
        // 存进data
        that.setData({
          countyNames: countyNames,
          countyNum: countyNum,
          countyValQh: valQh_3
        })
      }
    })
  },

  // 获取省份数据
  getProvinceData: function(options) {
    // 重定向this
    var that = this
    // URL
    var phoneUrl = getApp().globalData.wx_url_1;
    // 请求省份数据
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "selectArea",
        rank: '1'
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        // 获取返回值List
        var provin = res.data.areaList;
        // 初始化省份名称
        var provinceNames = [];
        // 初始化省份区号
        var provinceNum = [];
        // 遍历返回值List存进省份区号和名称列表
        for (var i in provin) {
          provinceNum.push(provin[i].area_no)
          provinceNames.push(provin[i].area_name)
        }
        // 存进data
        that.setData({
          provinceNames: provinceNames,
          provinceNum: provinceNum
        })
      }
    })
  },
  // 点击省份列表执行函数
  bindProvinceNameChange: function(e) {
    // 获取区号
    var valQh = this.data.provinceNum[e.detail.value]
    var that = this;
    console.log('picker province 发生选择改变，携带值为', e.detail.value);
    var val = e.detail.value
    that.getCityArr(valQh); //获取地级市数据
    that.getCountyInfo(valQh); //获取区县数据
    this.setData({
      // 城市
      cityValQh: '',
      // 区县
      countyValQh: '',
      provinceIndex: e.detail.value,
      cityIndex: 0,
      countyIndex: 0,
      proValQh: valQh
    })
  },
  // 获取城市数据
  getCityArr: function(valQh) {
    // 重定向this
    var that = this
    // URL
    var phoneUrl = getApp().globalData.wx_url_1;
    // 请求省份数据
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "selectArea",
        rank: '2',
        area_no: valQh
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res.data.areaList)
        // 获取返回值List
        var city = res.data.areaList;
        // 初始化省份名称
        var cityNames = [];
        // 初始化省份区号
        var cityNum = [];
        // 遍历返回值List存进省份区号和名称列表
        for (var i in city) {
          cityNum.push(city[i].area_no)
          cityNames.push(city[i].area_name)
        }
        // 存进data
        that.setData({
          cityNames: cityNames,
          cityNum: cityNum
        })
      }
    })
  },
  // 点击城市列表执行函数
  bindCityNameChange: function(e) {
    // 获取区号
    var valQh = this.data.cityNum[e.detail.value]
    var that = this;
    console.log('picker province 发生选择改变，携带值为', e.detail.value);
    var val = e.detail.value
    that.getCountyInfo(valQh); //获取区县数据
    this.setData({
      cityIndex: e.detail.value,
      countyIndex: 0,
      cityValQh: valQh
    })
  },
  // 获取区县数据
  getCountyInfo: function(valQh) {
    console.log(valQh)
    // 重定向this
    var that = this
    // URL
    var phoneUrl = getApp().globalData.wx_url_1;
    // 请求省份数据
    wx.request({
      url: phoneUrl,
      method: "POST",
      data: {
        service: "selectArea",
        rank: '3',
        area_no: valQh
      },
      header: {
        "content-type": "application/json"
      },
      success: function(res) {
        console.log(res.data.areaList)
        // 获取返回值List
        var county = res.data.areaList;
        // 初始化省份名称
        var countyNames = [];
        // 初始化省份区号
        var countyNum = [];
        // 遍历返回值List存进省份区号和名称列表
        for (var i in county) {
          countyNum.push(county[i].area_no)
          countyNames.push(county[i].area_name)
        }
        // 存进data
        that.setData({
          countyNum: countyNum,
          countyNames: countyNames
        })
      }
    })
  },
  // 点击区县列表执行函数
  bindCountyNameChange: function(e) {
    // 获取区号
    var valQh = this.data.countyNum[e.detail.value]
    var that = this;
    console.log('picker province 发生选择改变，携带值为', e.detail.value);
    var val = e.detail.value
    this.setData({
      countyIndex: e.detail.value,
      countyValQh: valQh
    })
  },
  // 保存
  saveAddress: function(e) {
    console.log(this.data)
    // receivingId 可以为空
    var receiving_id = this.data.receivingId
    // 是否默认 可以为空
    var isDefault = this.data.isDefault;
    // 名字
    var consignee = e.detail.value.consignee;
    // 手机号
    var mobile = e.detail.value.mobile;
    // 省份
    var proValQh = this.data.proValQh;
    // 城市
    var cityValQh = this.data.cityValQh;
    // 区县
    var countyValQh = this.data.countyValQh;
    console.log(countyValQh)
    // 地址
    var address = e.detail.value.address;
    if (consignee == '') {
      wx.showModal({
        title: '提示',
        content: '请输入姓名',
        showCancel: false,
      })
    } else if (mobile == '' || mobile.length < 11) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号',
        showCancel: false,
      })
    } else if (proValQh == '') {
      wx.showModal({
        title: '提示',
        content: '请选择省份',
        showCancel: false,
      })
    } else if (cityValQh == '') {
      wx.showModal({
        title: '提示',
        content: '请选择市区',
        showCancel: false,
      })
    } else if (countyValQh == '') {
      wx.showModal({
        title: '提示',
        content: '请选择区县',
        showCancel: false,
      })
    } else if (address == '') {
      wx.showModal({
        title: '提示',
        content: '请输入详细地址',
        showCancel: false,
      })
    } else {
      var phoneUrl = getApp().globalData.wx_url_1;
      wx.request({
        url: phoneUrl,
        method: "POST",
        data: {
          service: "addAddress",
          receiving_id: receiving_id,
          user_id: this.data.user_id,
          name: consignee,
          province: proValQh,
          city: cityValQh,
          district: countyValQh,
          address: address,
          phone: mobile,
          is_default: isDefault,
        },
        header: {
          "content-type": "application/json"
        },
        success: function(res) {
          console.log(res)
          if (res.data.result_code == 0) {
            wx.navigateBack({})
          }
        }
      })
    }

  }
})