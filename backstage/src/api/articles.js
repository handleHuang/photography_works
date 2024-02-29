import axios from "@/config/http";

// 作品列表
export function articleList(params) {
  return axios.get("/workList", params);
}
// 设置作品状态
export function setArticleStatus(params) {
  return axios.post("/workOline", params);
}
// 删除作品
export function delArticle(params) {
  return axios.delete("/workDel", params);
}
// 作品详情
export function articleDetail(params) {
  return axios.get("/workDetails", params);
}
// 导出作品
export function exportArticle(params) {
  return axios.post("/articles/export", params);
}

// 收藏
export function postCollect(params) {
  return axios.post("/collect", params);
}

// 数据大屏
export function workOlineState(params) {
  return axios.get("/workOlineState", params);
}
