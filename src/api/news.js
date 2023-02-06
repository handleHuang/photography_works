/* eslint-disable camelcase */
import axios from '@/config/http'

// 新闻列表
export function newsList (params) {
  return axios.get('/news', params)
}
// 解析推文
export function resolveTweet (params) {
  return axios.get('/news/tweet-url/resolve', params)
}
// 新增新闻
export function addNews (params) {
  return axios.post('/news', params)
}
// 删除新闻
export function delNews (news_id) {
  return axios.delete(`/news/${news_id}`)
}
// 新闻详情
export function newsDetail (id) {
  return axios.get(`/news/${id}`)
}
