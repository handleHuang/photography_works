import axios from '@/config/http'

// 登录
export function login (params) {
  return axios.post('/login', params)
}

// 注册
export function register (params) {
  return axios.post('/register', params)
}
