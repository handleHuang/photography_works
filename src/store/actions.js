// 模块
import { projectList, setProjectStatus, delProject, projectCreate, projectUpdate, projectDetail } from '@/api/project'

export default {
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
  }
}
