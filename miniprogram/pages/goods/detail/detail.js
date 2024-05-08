// pages/goods/detail/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: false, // 加入购物车和立即购买时显示的弹框
    count: 1, // 商品购买数量，默认是 1
    blessing: '', // 祝福语
    allCount: ''
  },

  // 加入购物车
  handleAddcart() {
    this.setData({
      show: true
    })
  },

  // 立即购买
  handeGotoBuy() {
    this.setData({
      show: true
    })
  },

  // 点击关闭弹框时触发的回调
  onClose() {
    this.setData({ show: false })
  },

  // 监听是否更改了购买数量
  onChangeGoodsCount(event) {
    console.log(event.detail)
  },

  // 弹框的确定按钮
  handleSubmit() {}
})
