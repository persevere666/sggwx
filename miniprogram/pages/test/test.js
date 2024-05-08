import instance from '../../utils/http'
import { reqSwiperData } from '../../api/index'

Page({
  onLoad(){
    const info = wx.getAccountInfoSync();
    console.log(info)
  },
  async handler(){
    const res = await reqSwiperData()
    console.log(res)

    // instance.get("/index/findBanner").then((res) =>{
    //   console.log(res)
    // })

    // const res = await instance.get('/cart/getCartList').catch(err =>{
    //   console.log(err)
    // })


  },
  async allHandler(){
    // await instance.get('/index/findBanner')
    // await instance.get('/index/findCategory1')
    // Promise.all([
    //   instance.get('/index/findBanner'), 
    //   instance.get('/index/findCategory1'),
    //   instance.get('/index/findBanner'), 
    //   instance.get('/index/findCategory1')]
    // )
    const res = await instance.all(
      instance.get('/index/findBanner'), 
      instance.get('/index/findCategory1'),
      instance.get('/index/findBanner'), 
      instance.get('/index/findCategory1')
    )
    console.log(res)
  }
})