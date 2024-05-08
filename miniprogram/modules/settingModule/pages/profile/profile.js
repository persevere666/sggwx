// pages/profile/profile.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '/assets/images/avatar.png',
    isShowPopup: false // 控制更新用户昵称的弹框显示与否
  },

  // 获取用户头像信息
  getAvatar(e) {},

  // 显示修改昵称弹框
  onUpdateNickName() {
    this.setData({
      isShowPopup: true
    })
  }
})
