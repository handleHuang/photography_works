import axios from '@/config/http'

// 分类列表
export function tagList (params) {
  return axios.get('/v1/categories', params)
}
// 标签详情
export function tagsDetails (id) {
  return axios.get(`/tags/${id}`)
}
