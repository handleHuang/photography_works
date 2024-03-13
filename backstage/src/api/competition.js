import axios from '@/config/http'

// 赛事列表
export function competitionList (params) {
  return axios.get('/competitionList', params)
}
// 设置赛事状态
export function setcompetitionStatus (params) {
  return axios.post('competitionOline', params)
}
// 删除赛事
export function delcompetition (params) {
  return axios.delete('/competitionDel', params)
}
// 删除赛事作品
export function competitionRowDel (params) {
  return axios.delete('/competitionRowDel', params)
}
// 赛事上传
export function competitionCreate (params) {
  return axios.post('/addcompetition', params)
}
// 赛事编辑
export function competitionUpdate (params) {
  return axios.post('/competitionAnemd', params)
}
// 赛事详情
export function competitionDetail (params) {
  return axios.get('competitionDetails', params)
}