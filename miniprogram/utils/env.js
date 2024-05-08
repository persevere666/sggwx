//配置当前小程序的环境变量
const {miniProgram} = wx.getAccountInfoSync()

const {envVersion} = miniProgram

let env = {
  baseURL: 'https://gmall-prod.atguigu.cn/mall-api'
}
switch (envVersion) {
  case 'develop':
    env.baseURL = 'https://gmall-prod.atguigu.cn/mall-api'
    break;
  case 'trial':
    env.baseURL = 'https://gmall-prod.atguigu.cn/mall-api'
    break;
  case 'release':
    env.baseURL = 'https://gmall-prod.atguigu.cn/mall-api'
    break;
  default:
    break;
}

export { env }