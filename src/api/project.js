import axios from '@/config/http'

// 命题列表
export function projectList (params) {
  return axios.get('/labelList', params)
}
// 设置命题状态
export function setProjectStatus (params) {
  return axios.post('labelOline', params)
}
// 删除命题
export function delProject (params) {
  return axios.delete('/labelDel', params)
}
// 命题上传
export function projectCreate (params) {
  return axios.post('/addLabel', params)
}
// 命题编辑
export function projectUpdate (params) {
  return axios.post('/labelAnemd', params)
}
// 命题详情
export function projectDetail (params) {
  return axios.get('labelDetails', params)
}
