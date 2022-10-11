// 模块
import { newsList, resolveTweet, addNews, delNews } from '@/api/news'
import { papersList } from '@/api/papers'

export default {
  // 新闻列表
  async newsList (store, params) {
    return await newsList(params)
  },
  // 解析推文
  async resolveTweet (store, params) {
    return await resolveTweet(params)
  },
  // 新增新闻
  async addNews (store, params) {
    return await addNews(params)
  },
  // 删除新闻
  async delNews (store, params) {
    return await delNews(params)
  },
  // 论文列表
  async papersList (store, params) {
    return await papersList(params)
  }
}
