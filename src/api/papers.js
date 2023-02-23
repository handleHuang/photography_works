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
export function delPpapers (params) {
  return axios.delete(`/papers/${params.papers_id}`, params)
}
// 论文详情
export function paperDetail (params) {
  return axios.get(`/papers/${params.id}`, params)
}
// 论文编辑
export function editPaper (params) {
  return axios.put(`/papers/${params.papersDraft_id}`, params)
}
