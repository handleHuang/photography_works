import axios from '@/config/http'

// 论文列表
export function papersList (params) {
  return axios.get('/papers', params)
}
