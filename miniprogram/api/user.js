import http from '../utils/http'

/**
 * 
 * @param {*} code 临时登陆凭证
 * @returns Promise
 */
export const reqLogin = (code) => {
  return http.get(`/weixin/wxLogin/${code}`)
}

/**
 * 
 * @description 获取用户信息
 * @returns Promise
 */
export const reqUserInfo = () => {
  return http.get('/weixin/getuserInfo')
}