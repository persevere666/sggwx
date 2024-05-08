import {reqCategoryData} from '../../api/category'

Page({
  data: {
    categoryList:[],
    activeIndex: 0
  },
  updateActive(event){
    const {index} = event.currentTarget.dataset
    this.setData({
      activeIndex: index
    })
  },
  async getCategoryData(){
    const res = await reqCategoryData();
    if(res.code === 200){
      this.setData({
        categoryList: res.data
      })
    }
  },
  onLoad(){
    this.getCategoryData()
  }
})
