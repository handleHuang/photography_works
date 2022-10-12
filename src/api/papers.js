/* eslint-disable camelcase */
import axios from '@/config/http'

// 论文列表
export function papersList (params) {
  return axios.get('/papers', params)
}
// 新增论文
export function addPapers (params) {
  return axios.post('/papers', params)
}
// 删除论文
export function delPpapers (papers_id) {
  return axios.delete(`/papers/${papers_id}
  `)
}
