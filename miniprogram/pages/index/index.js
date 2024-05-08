import {reqIndexData} from '../../api/index'

Page({
  data:{
    bannerList: [], //轮播图数据
    categoryList:[], //商品导航数据
    activeList:[], //活动渲染区域
    hotList:[],  //人气推荐
    guessList:[], //猜你喜欢
    loading: true //是否显示骨架屏，默认显示
  },
  async getIndexData(){
    const res = await reqIndexData()
    this.setData({
      bannerList: res[0].data, 
      categoryList: res[1].data,
      activeList: res[2].data, 
      guessList: res[3].data, 
      hotList: res[4].data,
      loading: false
    })
  },
  onLoad(){
    this.getIndexData()
  }
})
