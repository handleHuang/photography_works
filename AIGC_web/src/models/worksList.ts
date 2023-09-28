import { http } from "../utils/http";

// 参赛作品列表
export function getArticles(params: any) {
  return http({
    url: `/api/articles?per_page=${params.per_page}&page=${params.page}&column=${params.column}&online_status=${params.online_status}${params.title ? "&title=" + params.title : ""}${
      params.project_id ? "&project_id=" + params.project_id : ""
    }`,
    method: "get",
  });
}

// 获取年份
export function getArticlesYears() {
  return http({
    url: "/api/article/years",
    method: "get",
  });
}

// 获取年份
export function getArticlesTime() {
  return http({
    url: "/api/article/time",
    method: "get",
  });
}

// 用户排行列表
export function getUsers(params: any) {
  return http({
    url: `/api/users?column=${params.column}`,
    method: "get",
  });
}
