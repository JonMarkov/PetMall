Page({
  data: {
    curNav: 48,
    curIndex: 0
  },
  onLoad: function (options) { },
  bindList: function (e) {
    var category_id = e.currentTarget.dataset['listid']
    wx.navigateTo({
      url: '/pages/goodsList/goodsList?category_id=' + category_id
    })
  },
  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  },

  onReady: function () {
    //获取公共接口
    var phoneUrl = getApp().globalData.wx_url_1
    //执行初始化事件函数
    this.classHttp(phoneUrl, this.classHttpCallback)

  },
  // 初始化页面请求 遍历数据函数
  classHttp: function (url, callback) {
    wx.request({
      url: url,
      method: "POST",
      data: {
        service: "goodsCategory",
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        callback(res.data)
      }
    })
  },
  classHttpCallback: function (res) {
    console.log(res)
    // 全部数据列表
    var firstList = res.firstList;
    // 定义一级分类的内容
    var titleName = [];
    // 循环一级分类的数据
    for (var index in firstList) {
      // 一级分类的name
      var oneName = firstList[index].category_name;
      // 一级分类的ID
      var cate_id = firstList[index].category_id;
      // 二级分类下的全部数据
      var secondList = firstList[index].secondList;
      var secCon = []
      for (var i in secondList) {
        // 二级分类下的name
        var category_name = secondList[i].category_name;
        // 二级分类下的id
        var category_id = secondList[i].category_id;
        // 三级类的下的全部数据
        var thirdList = secondList[i].thirdList;
        var thList = []
        for (var j in thirdList) {
          var category_name = thirdList[j].category_name
          var category_pic = thirdList[j].category_pic
          var category_id = thirdList[j].category_id
          //三级类目下的数据
          var temp = {
            category_name: category_name,
            category_pic: category_pic,
            category_id: category_id
          }
          thList.push(temp)
        };
        var temp = {
          category_name: category_name,
          category_id: category_id,
          thList: thList
        }
        secCon.push(temp)
      }
      var temp = {
        oneName: oneName,
        cate_id: cate_id,
        secCon: secCon
      }
      titleName.push(temp)
    }
    this.setData({
      titleName: titleName
    })
    console.log(this.data)
  },
})