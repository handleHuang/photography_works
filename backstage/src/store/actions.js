// 命题
import { projectList, setProjectStatus, delProject, projectCreate, projectUpdate, projectDetail } from '@/api/project'
// 作品
import { articleList, setArticleStatus, delArticle, articleDetail, exportArticle } from '@/api/articles'
// 用户
import { getUserList, delUser, detailsUser, anemdUser } from '@/api/userList'
export default {
  // 用户列表
  async getUserList (store, params) {
    return await getUserList(params)
  },
  // 用户删除
  async delUser (store, params) {
    return await delUser(params)
  },
  // 用户详情
  async detailsUser (store, params) {
    return await detailsUser(params)
  },
  // 用户修改
  async anemdUser (store, params) {
    return await anemdUser(params)
  },

  // 命题列表
  async projectList (store, params) {
    return await projectList(params)
  },
  // 设置命题上下架状态
  async setProjectStatus (store, params) {
    return await setProjectStatus(params)
  },
  // 删除命题
  async delProject (store, params) {
    return await delProject(params)
  },
  // 命题上传
  async projectCreate (store, params) {
    return await projectCreate(params)
  },
  // 命题编辑
  async projectUpdate (store, params) {
    return await projectUpdate(params)
  },
  // 命题详情
  async projectDetail (store, params) {
    return await projectDetail(params)
  },

  // 作品

  // 作品列表
  async articleList (store, params) {
    return await articleList(params)
  },
  async setArticleStatus (store, params) {
    return await setArticleStatus(params)
  },
  async delArticle (store, params) {
    return await delArticle(params)
  },
  async articleDetail (store, params) {
    return await articleDetail(params)
  },
  async exportArticle (store, params) {
    return await exportArticle(params)
  }
}
