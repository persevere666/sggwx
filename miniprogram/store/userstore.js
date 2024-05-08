import { observable, action } from 'mobx-miniprogram'
import { getStorage } from '../utils/storage'

 export const userStore = observable({
   token: getStorage('token') || '',
   userInfo: getStorage('userInfo') || '',
   //setToken用来修改、更新token
   setToken: action(function(token){
     this.token = token
   }),
   setUserInfo: action(function(userInfo){
     this.userInfo = userInfo
   })
 })