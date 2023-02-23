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
export function delNews (params) {
  return axios.delete(`/news/${params.news_id}`, params)
}
// 新闻详情
export function newsDetail (params) {
  return axios.get(`/news/${params.id}`, params)
}
// 新闻编辑
export function editNews (params) {
  return axios.put(`/news/${params.newsDraft_id}`, params)
}
