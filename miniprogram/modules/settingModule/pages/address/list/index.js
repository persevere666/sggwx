// pages/address/list/index.js
import { reqAddressList,reqDelAddress } from '../../../../../api/address'
import '../../../../../utils/extendApi'
//
Page({
  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],
    swipeCellQueue: []
  },
  swipeCellOpen(event){
    const instance = this.selectComponent(`#${event.target.id}`)
    console.log(instance)
  },
  // 去编辑页面
  toEdit(event) {
    //获取要更新的收获地址id
    //console.log(event)
    const { id } = event.currentTarget.dataset
    //console.log(id)

    wx.redirectTo({
      url: `/modules/settingModule/pages/address/add/index?id=${id}`
    })
  },
  //获取收获地址列表数据
  async getAddressList(){
    //
    const {data: addressList} = await reqAddressList()
    //
    this.setData({
      addressList
    })
  },
  onShow(){
    this.getAddressList();
  },
  async delAddress(event){
    const { id } = event.currentTarget.dataset
    const  modalRes = await wx.modal({content:'您确认删除该按钮吗？'})
    if(modalRes){
      //
      await reqDelAddress(id)
      wx.toast({title:'收货地址删除成功'})
      this.getAddressList();
    }
  }
})
