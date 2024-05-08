
const toast = ({title='数据加载中', icon='none', duration=2000, mask=true} = {}) => {
  wx.showToast({
    title,
    icon,
    duration,
    mask
  })  
}

const modal = (option={}) => {
  return new Promise((resolve)=>{
    const defaultOpt = {
      title: "提示",
      content: "你确定要退出吗？",
      confirmColor: "#f3514f"
    }
    
    const opts = Object.assign({}, defaultOpt, option)
  
    wx.showModal({
      ...opts,
      complete: ({confirm, cancel}) => {
        confirm && resolve(true)
        cancel && resolve(false)
      }
    })
  })
}

//将toast方法挂载到wx全局对象身上
wx.toast = toast
wx.modal = modal
export { toast, modal }