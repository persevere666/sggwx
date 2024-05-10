// pages/validator/validator.js
import Schema from 'async-validator'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:''
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
  onValidator(){
    // 定义验证规则
    const rules = {
      name: [
        // required：代表是否为必填项，
        // message：如果验证失败，提示的错误内容
        { required: true, message: 'name 不能为空' },
        { type: 'string', message: 'name 不是字符串'},
        { min: 2, max: 3, message: '名字最少是2个字，最多是3个字'}
        //使用正则对数据进行验证
        //{ pattern: '', message: ''},
        //validator：自定义验证规则
        //{ validator: () => {} }
      ]
    }
    //
    const validator = new Schema(rules)
    //validate方法：第一个参数是需要验证的数据，要求数据是一个对象，validate只会验证和验证规则同名的字段
    //             第二段参数是一个回调函数
    validator.validate(this.data, (errors, fields) => {
      //如果验证成功，errors是一个null
      //如果验证失败，errors是一个数组，数组每一项是一个错误信息
      //fields是需要验证的属性，属性值是一个数组，数组中也包含着错误信息
      if(errors){
        console.log('验证失败')
        console.log(errors)
        console.log(fields)
      }else{
        console.log('验证成功')
      }
      //
    })
  }
})