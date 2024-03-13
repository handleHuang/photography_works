import axios from '@/config/http'

// 分类列表
export function projectList (params) {
  return axios.get('/labelList', params)
}
// 设置分类状态
export function setProjectStatus (params) {
  return axios.post('labelOline', params)
}
// 删除分类
export function delProject (params) {
  return axios.delete('/labelDel', params)
}
// 分类上传
export function projectCreate (params) {
  return axios.post('/addLabel', params)
}
// 分类编辑
export function projectUpdate (params) {
  return axios.post('/labelAnemd', params)
}
// 分类详情
export function projectDetail (params) {
  return axios.get('labelDetails', params)
}

// 分类数据大屏
export function classifyData (params) {
  return axios.get('classifyData', params)
}

export function classifyDatayuan (params) {
  return axios.get('classifyDatayuan', params)
}

export function rankList (params) {
  return axios.get('rankList', params)
}
