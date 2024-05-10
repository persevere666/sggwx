
class WxRequest{
  defaults = {
    baseURL: '',
    url: '',
    data: null,
    method: 'GET',
    header: { //请求头
      "Content-type" : "application/json" //数据的交互格式
    },
    timeout: 60000
  }

  constructor(params={}){
    this.defaults = Object.assign({}, this.defaults, params)
  }

  queue = []

  interceptors = {
    request:(config) => config,
    response: (response) => response
  }

  request(options){
    if(options.method === 'UPLOAD'){
      options.url = this.defaults.baseURL + options.url
      //console.log(options)
      return new Promise((resolve, reject) => {
        wx.uploadFile({
          ...options,
          success: (res) => {
            res.data = JSON.parse(res.data)
            const mergeRes = Object.assign({}, res, {config: options, isSuccess:true})
            resolve(this.interceptors.response(mergeRes))
          },
          fail: (err) => {
            const mergeErr = Object.assign({}, err, {config: options, isSuccess:false})
            reject(this.interceptors.response(mergeErr))
          }
        })
      })
    }else{
      options.url = this.defaults.baseURL + options.url 
      options = {...this.defaults, ...options}

      this.queue.length === 0 && wx.showLoading()
      this.queue.push('request')

      options = this.interceptors.request(options)

      return new Promise((resolve, reject) =>{
        wx.request({
          ...options,
          success: (res) => {
            const mergeRes = Object.assign({}, res, {config: options, isSuccess: true})
            resolve(this.interceptors.response(mergeRes))
          },
          fail: (err) => {
            const mergeErr = Object.assign({}, err, {config: options, isSuccess: false})
            reject(this.interceptors.response(mergeErr))
          },
          complete: () =>{
            this.queue.pop()
            this.queue.length === 0 && wx.hideLoading()
          }
        })
      })
    }
  }

  get(url, data = {}, config = {}){
    const params = Object.assign({url, data, method: 'GET'}, config)
    return this.request(
      Object.assign({url, data, method: 'GET'}, config)
    )
  }

  delete(url, data = {}, config = {}){
    return this.request(
      Object.assign({url, data, method: 'DELETE'}, config)
    )
  }

  put(url, data = {}, config = {}){
    return this.request(
      Object.assign({url, data, method: 'PUT'}, config)
    )
  }

  post(url, data = {}, config = {}){
    return this.request(
      Object.assign({url, data, method: 'POST'}, config)
    )
  }

  //用来处理并发请求
  all(...promise){
    return Promise.all(promise)
  }

  //upload实例方法，用来对wx.uploadFile进行封装
  upload(url, filePath, name='file', config={}){
    return this.request(
      Object.assign({url, filePath, name, method: 'UPLOAD'}, config)
    )
  }
}

export default WxRequest

