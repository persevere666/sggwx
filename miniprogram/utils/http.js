import WxRequest from './request'
import {getStorage, removeStorage} from './storage'
import {modal, toast} from './extendApi'
import {env} from './env'

const instance = new WxRequest({
  baseURL: env.baseURL,
  timeout: 15000
})

instance.interceptors.request = (config) => {
  const token = getStorage('token')
  if(token){
    config.header['token'] = token
  }
  return config
}

instance.interceptors.response = async (response) => {
  const {isSuccess, data} = response
  if(!isSuccess){
    wx.showToast({
      title: '网络异常，请重试',
      icon: 'error'
    })
    return Promise.reject(response)
  }
  switch (data.code) {
    case 200:
      return data
    //没有token，或者token失效
    case 208:
      const res = await modal({
        content: '鉴权失败，请重新登陆',
        showCancel: false
      })
      if(res){
        removeStorage('token')
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
      return Promise.reject(response)
    default:
      toast({
        title: '程序出现异常，请联系客服'
      })
      return Promise.reject(response)
  }
  return data
}

export default instance