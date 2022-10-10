import axios from '@/config/http'

// 新闻列表
export function newsList (params) {
  return axios.get('/news', params)
}
// 解析推文
export function resolveTweet (params) {
  return axios.get('/news/tweet-url/resolve', params)
}
