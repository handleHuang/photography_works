// 用户模块
import { userList, userDetails } from '@/api/User'

// 文章模块
import { articleList, articleDetails } from '@/api/articles'
// 标签模块
import { tagList, tagsDetails } from '@/api/tags'

// login
import {
  login, // 登录
  verificationCode // 图片验证码
} from '@/api'
export default {
  // login
  async doLogin (store, params) {
    return await login(params)
  },
  // 图片验证码
  async getVerificationCode () {
    return await verificationCode()
  },
  // 文章列表
  async articleList (store, params) {
    return await articleList(params)
  },
  // 文章详情
  async articleDetails (store, params) {
    return await articleDetails(params)
  },
  // 用户列表
  async userList (store, params) {
    return await userList(params)
  },
  // 用户详情
  async userDetails (store, params) {
    return await userDetails(params)
  },
  // 标签列表
  async tagList (store, params) {
    return await tagList(params)
  },
  // 标签详情
  async tagsDetails (store, params) {
    return await tagsDetails(params)
  }
}
