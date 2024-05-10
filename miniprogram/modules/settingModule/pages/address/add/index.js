import QQMapWx from '../../../../../libs/qqmap-wx-jssdk'
import Schema from 'async-validator'
import { reqAddAddress, reqAddressInfo, reqUpdateAddress } from '../../../../../api/address'
import '../../../../../utils/extendApi'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: '', // 被选中的标签索引
    name: '', //收货人
    phone: '', //手机号码
    provinceName: '',//省
    provinceCode: '',//省编码
    cityName: '', //市'
    cityCode: '', //市编码
    districtName: '',//区
    districtCode: '', //区编码
    address: '', //详细地址
    fullAddress: '', //完整地址
    isDefault: 0 //是否设置为默认地址，0 不设置为默认地址，1 设置为默认地址
  },

  // 保存收货地址
  async saveAddrssForm(event) {
    //
    const {address, isDefault, name, phone} = event.detail.value
    this.setData({
      address: address,
      name: name,
      phone: phone,
      isDefault: isDefault?1:0
    })
    //console.log(this.data)
    const params = {
      ...this.data,
      fullAddress: this.data.provinceName + this.data.cityName + this.data.districtName + address
    }
    //
    const { valid } = await this.validateAddress(params)
    if(!valid){
      return
    }
    const res = this.addressId ? await reqUpdateAddress(params) : await reqAddAddress(params)
    //
    if(res.code === 200){
      // wx.toast({title:this.addressId? '更新收获地址成功!!!':'新增收获地址成功!!!'})
      // wx.navigateBack()
      wx.navigateBack({
        success: () => {
          wx.toast({title:this.addressId? '更新收获地址成功!!!':'新增收获地址成功!!!'})
        }
      })
    }
  },
  validateAddress(params){
    // 验证收货人，是否只包含大小写字母、数字和中文字符
    const nameRegExp = '^[a-zA-Z\\d\\u4e00-\\u9fa5]+$'
    // 验证手机号
    const phoneReg = '^1(?:3\\d|4[4-9]|5[0-35-9]|6[67]|7[0-8]|8\\d|9\\d)\\d{8}$'
    const rules = {
      name: [
        { required: true, message: '请输入收货人姓名~' },
        { pattern: nameRegExp, message: '收货人姓名不合法~' }
      ],
      phone: [
        { required: true, message: '请输入收货人手机号' },
        { pattern: phoneReg, message: '手机号不合法' }
      ],
      provinceName: { required: true, message: '请选择收货人所在地区' },
      address: { required: true, message: '请输入详细地址' }
    }
    const validator = new Schema(rules)
    // 调用实例方法对数据进行验证
    // 注意：我们希望将验证结果通过 Promsie 的形式返回给函数的调用者
    return new Promise((resolve) => {
      validator.validate(params, (errors, fields) => {
        if (errors) {
          // 如果验证失败，需要给用户进行提示
          wx.toast({
            title: errors[0].message,
            mask: false
          })
          resolve({ valid: false })
        } else {
          resolve({ valid: true })
        }
      })
    })
  },
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
  },
  //获取用户定位信息
  async onLocation(){
    //获取当前的地理位置（经度、纬度、高度）
    // const res = await wx.getLocation()
    // console.log(res)
    // name:搜索的地名
    try {
      // latitude：纬度，longitude：经度，name：选择的时候的地点名字
      const {latitude, longitude, name} = await wx.chooseLocation()
      this.qqmapwx.reverseGeocoder({
        location:{
          latitude,
          longitude
        },
        success:(res) =>{
          //
          const {adcode, province, city, district} = res.result.ad_info
          //获取街道、门牌
          const { street, street_number } = res.result.address_component
          //获取标准地址
          const { standard_address } = res.result.formatted_addresses
          this.setData({
            provinceCode: adcode.replace(adcode.substring(2,6), '0000'),
            provinceName: province,
            cityCode: adcode.replace(adcode.substring(4,6), '00'),
            cityName: city,
            districtName: district,
            districtCode: district && adcode,
            address: street + street_number + name,
            fullAddress: standard_address + name,
            regionValue: [province, city, district].join(' ')
          })
        }
      })
    } catch (error) {
      wx.showToast({
        title: '请求地址出错'
      })
    }
  },
  async showAddressInfo(id){
    if(!id) return
    this.addressId = id
    wx.setNavigationBarTitle({
      title: '更新收货地址'
    })
    //
    const { data } = await reqAddressInfo(id)
    //
    //console.log(data)
    this.setData(data)
    this.setData({
      regionValue: [data.provinceName, data.cityName, data.districtName].join(' ')
    })
  },
  onLoad(options){
    //
    this.qqmapwx = new QQMapWx({
      key: 'I5UBZ-L46E3-2B23I-OZ2G2-WKIZF-O4F4D'
    })
    //
    this.showAddressInfo(options.id)
  }
})
