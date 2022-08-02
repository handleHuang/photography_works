import axios from 'axios'

import baseURL from './apiUrl.js'
import { Message } from 'tdesign-vue-next'
const http = {}
const instance = axios.create({
  baseURL: baseURL + '/admin',
  timeout: 1000 * 120
})

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    // 请求头添加token
    const userInfo = JSON.parse(localStorage.getItem('user_info'))
    const newConfig = config
    if (userInfo) {
      newConfig.headers.authorization = `Bearer ${userInfo.token}`
    }
    if (
      newConfig.method === 'post' ||
      newConfig.method === 'put' ||
      newConfig.method === 'delete'
    ) {
      if (
        Object.prototype.toString.call(newConfig.data) !== '[object FormData]'
      ) {
        newConfig.data = {
          ...newConfig.data
        }
      }
    } else if (newConfig.method === 'get' || newConfig.method === 'delete') {
      newConfig.params = {
        ...newConfig.params
      }
    }
    return newConfig
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  response => {
    const res = response.data
    if (response.status === 204) {
      Message.success({ message: '操作成功！', offset: 150 })
    }
    return Promise.resolve(res)
  },
  error => {
    if (typeof error.response === 'undefined') {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ message: '服务器错误' })
    }
    switch (error.response.status) {
      case 403:
      case 401:
        localStorage.clear()
        window.location.reload()
        break
      default:
        Message.error({ message: error.response.data.message, offset: 150 })
        break
    }
    return Promise.reject(error)
  }
)
http.get = function (url, params) {
  return instance.get(url, { params })
}

http.post = function (url, data) {
  return instance.post(url, data)
}

http.patch = function (url, data) {
  return instance.patch(url, data)
}

http.delete = function (url, params) {
  return instance.delete(url, { params })
}

http.put = function (url, data) {
  return instance.put(url, data)
}

export default http
