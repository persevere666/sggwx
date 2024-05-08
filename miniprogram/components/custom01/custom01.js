//step1 引入ComponentWithStore
import { ComponentWithStore } from 'mobx-miniprogram-bindings'
import { numStore } from '../../stores/numstore'
//step2 将Component替换为ComponentWithStore
ComponentWithStore({
  //用来配置当前组件需要与那些Store进行关联
  //注意：在从Store对象中引入数据和方法后，
  //如果是数据，会被注入到data对象中
  //如果是方法，会被注入到methods对象中
  storeBindings: {
    store: numStore,
    //数组写法
    // fields: ['numA', 'numB', 'sum'],
    // actions: ['update']
    
    //对象写法
    fields: {
      //对象写法也有两种写法
      //一种是映射形式
      // numA: 'numA',
      // numB: 'numB',
      // sum : 'sum'
      //一种是函数形式
      numA: () => numStore.numA,
      numB: () => numStore.numB,
      sum : () => numStore.sum
    },
    actions: {
      //只有映射写法
      update: 'update'
    }
  }
})