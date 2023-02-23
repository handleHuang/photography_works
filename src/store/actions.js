// 模块
import { newsList, resolveTweet, addNews, delNews, newsDetail, editNews } from '@/api/news'
import { papersList, addPapers, delPpapers, paperDetail, editPaper } from '@/api/papers'

export default {
  // 新闻列表
  async newsList (store, params) {
    return await newsList(params)
  },
  // 解析推文
  async resolveTweet (store, params) {
    return await resolveTweet(params)
  },
  // 上传新闻
  async addNews (store, params) {
    return await addNews(params)
  },
  // 删除新闻
  async delNews (store, params) {
    return await delNews(params)
  },
  // 新闻详情
  async newsDetail (store, params) {
    return await newsDetail(params)
  },
  // 新闻编辑
  async editNews (store, params) {
    return await editNews(params)
  },
  // 论文列表
  async papersList (store, params) {
    return await papersList(params)
  },
  // 上传论文
  async addPapers (store, params) {
    return await addPapers(params)
  },
  // 删除论文
  async delPpapers (store, params) {
    return await delPpapers(params)
  },
  // 论文详情
  async paperDetail (store, params) {
    return await paperDetail(params)
  },
  // 编辑论文
  async editPaper (store, params) {
    return await editPaper(params)
  }
}
