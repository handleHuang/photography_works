import axios from '@/config/http'

// 所有文章
export function articleList (params) {
  return axios.post(`/v1/examples/list?page=${params.page}&per_page=${params.per_page}`, params)
}
// 文章详情
export function articleDetails (id) {
  return axios.get(`v1/examples/${id}`)
}
