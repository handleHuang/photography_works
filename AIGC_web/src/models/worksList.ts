import { http } from "../utils/http";

// 参赛作品列表
export function getArticles(params: any) {
  return http({
    url: `/api/workList?per_page=${params.per_page}&page=${params.page}&state=${params.state}&top=${params.top}
    ${params.keyword ? "&title=" + params.keyword : ""}
    ${params.topic ? "&topic=" + params.topic : ""}`,
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
export function getUsers() {
  return http({
    url: `/api/rankList`,
    method: "get",
  });
}
