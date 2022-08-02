import axios from '@/config/http'
// 用户列表
export function userList (params) {
  return axios.get('v1/users', params)
}
// 用户详情
export function userDetails (id) {
  return axios.get(`v1/users/${id}`)
}
