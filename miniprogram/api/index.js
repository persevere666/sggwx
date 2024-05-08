import http from '../utils/http'

export const reqSwiperData = () => {
  return http.get('/index/findBanner')
}

export const reqIndexData = () => {
  return Promise.all([
    http.get('/index/findBanner'),
    http.get('/index/findCategory1'),
    http.get('/index/advertisement'),
    http.get('/index/findListGoods'),
    http.get('/index/findRecommendGoods')
  ])
}