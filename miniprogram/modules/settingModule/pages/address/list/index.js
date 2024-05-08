// pages/address/list/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    addressList: [1, 2, 3]
  },

  // 去编辑页面
  toEdit() {
    wx.redirectTo({
      url: '/pages/address/add/index'
    })
  }
})
