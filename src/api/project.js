import axios from '@/config/http'

// 命题列表
export function projectList (params) {
  return axios.get('/projects', params)
}
// 设置命题状态
export function setProjectStatus (params) {
  return axios.post(`set/${params.project_id}/status`, params)
}
// 删除命题
export function delProject (params) {
  return axios.delete('project/delete/ids', params)
}
// 命题上传
export function projectCreate (params) {
  return axios.post('/project', params)
}
// 命题编辑
export function projectUpdate (params) {
  return axios.post(`update/${params.project_id}`, params)
}
// 命题详情
export function projectDetail (params) {
  return axios.get(`projects/${params.project_id}`, params)
}
