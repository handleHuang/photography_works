import { http } from "../utils/http";

// 个人中心
export function getUserData(params: any) {
  return http({
    url: `/api/userWorkList?per_page=${params.per_page}&page=${params.page}&beiyong2=${params.beiyong2}&top=${params.top}${params.topic ? "&topic=" + params.topic : ""}${params.keyword ? "&keyword=" + params.keyword : ""}`,
    method: "get",
  });
}

// 个人中心收藏
export function getUserLikes(params: any) {
  return http({
    url: `/api/userlinkList?per_page=${params.per_page}&page=${params.page}&beiyong2=${params.beiyong2}&top=${params.top}${params.topic ? "&topic=" + params.topic : ""}${params.keyword ? "&keyword=" + params.keyword : ""}`,
    method: "get",
  });
}

// 删除作品
export function articlesDel(params: any) {
  return http({
    url: `/api/workDel?id=${params.id}`,
    method: "delete",
  });
}

// 上下架作品
export function articlesStatus(params: any) {
  return http({
    url: `/api/workOline`,
    method: "post",
    data: params,
  });
}

// 作品编辑
export function updataEdit(params: any) {
  return http({
    url: `/api/edit`,
    method: "post",
    data: params,
  });
}
// 访问他人主页
export function getHeData(params: any) {
  return http({
    url: `/api/users/${params.user_id}?per_page=${params.per_page}&page=${
      params.page
    }${params.project_id ? "&project_id=" + params.project_id : ""}${
      params.year && params.year !== "全部年份" ? "&year=" + params.year : ""
    }${
      params.month && params.month !== "全部月份"
        ? "&month=" + params.month
        : ""
    }${"&column=" + params.column}${
      params.online_status ? "&online_status=" + params.online_status : ""
    }`,
    method: "get",
  });
}
