import axios from '@/config/http'

// 作品列表
export function articleList (params) {
  return axios.get('/articles', params)
}
// 设置作品状态
export function setArticleStatus (params) {
  return axios.post(`articles/set/${params.article_id}/status`, params)
}
// 删除作品
export function delArticle (params) {
  return axios.delete('articles/delete/ids', params)
}
// 作品详情
export function articleDetail (params) {
  return axios.get(`articles/${params.article_id}`, params)
}
