// 分类
import {
  projectList,
  setProjectStatus,
  delProject,
  projectCreate,
  projectUpdate,
  projectDetail,
  classifyData,
  classifyDatayuan,
  rankList,
} from "@/api/project";
// 赛事
import {
  competitionList,
  setcompetitionStatus,
  delcompetition,
  competitionRowDel,
  competitionCreate,
  competitionUpdate,
  competitionDetail,
} from "@/api/competition";
// 作品
import {
  articleList,
  setArticleStatus,
  delArticle,
  articleDetail,
  exportArticle,
  postCollect,
  workOlineState,
} from "@/api/articles";
// 用户
import { getUserList, delUser, detailsUser, anemdUser } from "@/api/userList";
export default {
  // 用户列表
  async getUserList(store, params) {
    return await getUserList(params);
  },
  // 用户删除
  async delUser(store, params) {
    return await delUser(params);
  },
  // 用户详情
  async detailsUser(store, params) {
    return await detailsUser(params);
  },
  // 用户修改
  async anemdUser(store, params) {
    return await anemdUser(params);
  },

  // 收藏
  async postCollect(store, params) {
    return await postCollect(params);
  },

  // 数据大屏
  async workOlineState(store, params) {
    return await workOlineState(params);
  },

  // 分类列表
  async projectList(store, params) {
    return await projectList(params);
  },
  // 设置分类上下架状态
  async setProjectStatus(store, params) {
    return await setProjectStatus(params);
  },
  // 删除分类
  async delProject(store, params) {
    return await delProject(params);
  },
  // 分类上传
  async projectCreate(store, params) {
    return await projectCreate(params);
  },
  // 分类编辑
  async projectUpdate(store, params) {
    return await projectUpdate(params);
  },
  // 分类详情
  async projectDetail(store, params) {
    return await projectDetail(params);
  },

  // 赛事列表
  async competitionList(store, params) {
    return await competitionList(params);
  },
  // 设置赛事上下架状态
  async setcompetitionStatus(store, params) {
    return await setcompetitionStatus(params);
  },
  // 删除赛事
  async delcompetition(store, params) {
    return await delcompetition(params);
  },
  // 删除赛事作品
  async competitionRowDel(store, params) {
    return await competitionRowDel(params);
  },
  // 赛事上传
  async competitionCreate(store, params) {
    return await competitionCreate(params);
  },
  // 赛事编辑
  async competitionUpdate(store, params) {
    return await competitionUpdate(params);
  },
  // 赛事详情
  async competitionDetail(store, params) {
    return await competitionDetail(params);
  },

  // 数据大屏
  async classifyData(store, params) {
    return await classifyData(params);
  },
  async classifyDatayuan(store, params) {
    return await classifyDatayuan(params);
  },
  async rankList(store, params) {
    return await rankList(params);
  },

  // 作品

  // 作品列表
  async articleList(store, params) {
    return await articleList(params);
  },
  async setArticleStatus(store, params) {
    return await setArticleStatus(params);
  },
  async delArticle(store, params) {
    return await delArticle(params);
  },
  async articleDetail(store, params) {
    return await articleDetail(params);
  },
  async exportArticle(store, params) {
    return await exportArticle(params);
  },
};
