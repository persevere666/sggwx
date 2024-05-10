// pages/profile/profile.js
import { userBehavior } from './behavior'
import { getStorage,setStorage } from '../../../../utils/storage'
import { reqUploadFile, reqUpdateUserInfo } from '../../../../api/user'
import { toast } from '../../../../utils/extendApi'
Page({
  //注册behavior，数据会导入到data
  behaviors:[
    userBehavior
  ],
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '/assets/images/avatar.png',
    isShowPopup: false // 控制更新用户昵称的弹框显示与否
  },
  //
  async chooseAvatar(event){
    //console.log(event)
    //获取图像的临时路径，临时路径具有失效时间
    //需要将临时路径上传到公司的服务器，获取永久路径
    //获取永久路径之后，需要使用使用永久路径，并更新headimgurl
    //用户点击了保存按钮，才算真正更新了头像和昵称
    const { avatarUrl } = event.detail

    //console.log(avatarUrl)
    //第二种实现本地资源上传的方式
    const res = await reqUploadFile(avatarUrl, 'file')
    //console.log(res)
    this.setData({
      'userInfo.headimgurl' : res.data
    })
    // 
    // wx.uploadFile({
    //   filePath: avatarUrl, //要上传的文件资源路径
    //   name: 'file', //文件对应的key
    //   url: 'https://gmall-prod.atguigu.cn/mall-api/fileUpload', //开发者服务器地址
    //   header: {
    //     token: getStorage('token')
    //   },
    //   success: (res) =>{
    //     const uploadRes = JSON.parse(res.data)
    //     this.setData({
    //       'userInfo.headimgurl' : uploadRes.data
    //     })
    //   }
    // })
  },
  async updateUserInfo(){
    const res = await reqUpdateUserInfo(this.data.userInfo)
    if(res.code === 200){
      setStorage("userInfo", this.data.userInfo)
      this.setUserInfo(this.data.userInfo)
      //console.log("用户信息更新成功")
      toast({title: '用户信息更新成功'})
    }
  },
  // 获取用户头像信息
  getAvatar(e) {},

  // 显示修改昵称弹框
  onUpdateNickName() {
    this.setData({
      isShowPopup: true,
      'userInfo.nickname' : this.data.userInfo.nickname
    })
  },
  getNickName(event){
    //console.log(event)
    const { nickname } = event.detail.value
    //console.log(nickname)
    this.setData({
      'userInfo.nickname' : nickname,
      isShowPopup: false
    })
  },
  cancelForm() {
		this.setData({
			isShowPopup: false
		})
	}
})
