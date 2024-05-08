//observable用于创建一个被监测的对象，对象的属性是应用对的状态，状态会被自动转换为响应式数据
//action 是用来修改、更新状态
import {observable, action} from 'mobx-miniprogram'

export const numStore = observable({
  numA: 1,
  numB: 2,
  //定义action方法，用来修改状态
  update: action(function(){
    this.numA += 1
    this.numB += 1
  }),
  //计算属性 computed
  //根据已有的状态产生新的状态
  //计算属性前面需要使用get修饰符进行修饰
  get sum(){
    return this.numA + this.numB
  }
})

