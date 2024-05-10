// pages/location/location.js
import '../../utils/extendApi'
import { modal, toast } from '../../utils/extendApi'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  async getLocation(){
    const { authSetting } = await wx.getSetting()
    console.log(authSetting['scope.userLocation'])
  },
  async onLocation(){
    const { authSetting } = await wx.getSetting()
    if(authSetting['scope.userLocation'] === false){
      const modalRes = await modal({
        title: '授权提示',
        content: '需要获取地理位置信息，请授权'
      })

      console.log(modalRes)

      if(!modalRes){
        return wx.showToast({
          title: '您拒绝了授权',
        })
      }
      const { authSetting2 } = await wx.openSetting()
      if(!authSetting2['scope.userLocation']){
        return toast({title: '授权失败'})
      }
      
      try {
        const locationRes = await wx.getLocation()
        console.log(locationRes)
      } catch (error) {
        wx.showToast({
          title: '您拒绝了位置信息',
        })
      }

    }else{
      try {
        const locationRes = await wx.getLocation()
        console.log(locationRes)
      } catch (error) {
        wx.showToast({
          title: '您拒绝了位置信息',
        })
      }
    }
  }
})