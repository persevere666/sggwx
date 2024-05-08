// app.js
// import { toast } from './utils/extendApi'
import {setStorage, getStorage, removeStorage, clearStorage} from './utils/storage'
import {asyncSetStorage, asyncGetStorage, asyncRemoveStorage, asyncClearStorage} from './utils/storage'
import './utils/extendApi'
App({
  async onShow(){
    //wx.toast({title:'数据加载完毕', icon: 'success' })
    // const res = await wx.modal({
    //   title: "新提示",
    //   showCancel: false
    // })
    // console.log(res)

    //setStorage("yyw", "haha")
    // const name = getStorage("yyw")
    // console.log(name)
    // removeStorage("yyw")

    //
    // asyncSetStorage("shabi", "bisha").then( (res) =>{
    //   console.log(res)
    // })
    // asyncSetStorage("yyw", "sb")
    // asyncGetStorage("shabi").then((res) => {
    //   console.log(res.data)
    // })
    // asyncRemoveStorage("shabi").then((res) =>{
    //   console.log(res)
    // })
    // asyncClearStorage().then((res) =>{
    //   console.log(res)
    // })

  }
})
