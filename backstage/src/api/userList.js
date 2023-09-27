import axios from '@/config/http'
// 用户列表
export function getUserList (params) {
  return axios.get('/userList', params)
}

// 用户详情
export function detailsUser (params) {
  return axios.get('/detailsUser', params)
}

// 用户修改
export function anemdUser (params) {
  return axios.post('/anemdUser', params)
}

// 删除列表
export function delUser (params) {
  return axios.delete('/delUser', params)
}
