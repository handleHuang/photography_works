import { http } from "../utils/http";

// 参赛详情页
export function getArticlesDetail(params: any) {
  return http({
    url: `/api/workDetails?id=${params.id}&user_id=${params.user_id}`,
    method: "get",
  });
}

// 点赞
export function postlike(params: any) {
  return http({
    url: '/api/collect',
    method: "post",
    data: params
  });
}
