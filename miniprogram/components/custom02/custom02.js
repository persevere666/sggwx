import { ComponentWithComputed } from 'miniprogram-computed'

ComponentWithComputed({

  computed:{
    //计算属性方法内部必须有返回值
    //在计算属性内部，不能使用this来获取data中的数据
    //如果想要获取data中的数据，需要使用形参
    //计算属性具有缓存特性
    //计算属性只执行一次，后续在使用的时候，返回的是第一次执行
    //只要依赖的数据没有发生变化，返回的始终是第一次执行的结果
    total(data){
      return data.a + data.b
    }
  },
  //watch数据监听器，用来监听数据是否发生变化，发生变化之后执行相应的逻辑
  watch:{
    //key：需要监听的数据
    //value：是回调函数，回调函数有一个形参，这个形参是最新的、改变以后的数据
    a: function(a){
      console.log(a)
    },
    b: function(b){
      console.log(b)
    },
    'a, b': function(a, b){
      this.setData({
        c: a + b
      })
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    a: 1,
    b: 2,
    c: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateData(){
      this.setData({
        a : this.data.a+1,
        b: this.data.b+1
      })
    }
  }
})