import axios from '@/config/http'
// login
export function login (params) {
  return axios.post('/v1/auth/login/using-password', params)
}
// 图片验证码
export function verificationCode () {
  return axios.post('v1/auth/verify-codes/captcha')
}
