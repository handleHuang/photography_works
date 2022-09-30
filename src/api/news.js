import axios from '@/config/http'

// 新闻列表
export function newsList (params) {
  return axios.get('/news', params)
}
