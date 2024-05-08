Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: '' // 被选中的标签索引
  },

  // 保存收货地址
  saveAddrssForm(event) {},

  // 省市区选择
  onAddressChange(event) {
    const [provinceCode, cityCode, districtCode] = event.detail.code
    const [provinceName, cityName, districtName] = event.detail.value

    // 存储省市区对应的编码
    this.setData({
      provinceCode,
      provinceName,
      cityCode,
      cityName,
      districtName,
      districtCode,
      regionValue: [provinceName, cityName, districtName].join(' ')
    })
  }
})
