import { BehaviorWithStore } from 'mobx-miniprogram-bindings'
import { numStore } from '../../stores/numstore'
import { cloneStore } from '../../stores/clonestore'
//BehaviorWithStore的作用，让页面和Store对象建立关联
export const behavior = BehaviorWithStore({
  // storeBindings: {
  //   store: numStore,
  //   fields: ['numA', 'numB', 'sum'],
  //   actions: ['update']
  // }
  //如果要绑定多个Store对象，需要将storeBindings配置项改造成一个数组
  //数组每一项是一个个要绑定的Store对象
  storeBindings:[
    {
      store: numStore,
      fields: ['numA', 'numB', 'sum'],
      actions: ['update']
    },
    {
      store: cloneStore,
      //第二种方法：添加命名空间(如果仅是数据存在冲突)
      //但是如果方法冲突（存在相同的数据或者方法），依然需要使用对象的方法来改造
      //在添加命名空间后，如果需要访问数据，需要加上命名空间的名字，
      //如：cloneStore.numA
      namespace: 'cloneStore',
      fields: ['numA', 'numB', 'sum'],
      actions: {
        updateData: 'update'
      }
    }
  ]
})