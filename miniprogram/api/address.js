import http from '../utils/http'

/**
 * 
 * @param {*} data 
 * @returns Promise
 */
export const reqAddAddress = (data) => {
  return http.post('/userAddress/save', data)
}
/**
 * @description 获取收货地址列表
 * @returns Promise
 */
export const reqAddressList = () => {
  return http.get('/userAddress/findUserAddress')
}
/**
 * 
 * @param {*} id 
 * @returns Promise
 */
export const reqAddressInfo = (id) => {
  return http.get(`/userAddress/${id}`)
}
/**
 * 更新收获地址
 * @param {*} data 
 */
export const reqUpdateAddress = ( data ) => {
  return http.post('/userAddress/update', data)
}

export const reqDelAddress = (id) => {
  return http.get(`/userAddress/delete/${id}`)
}