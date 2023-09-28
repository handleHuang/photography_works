import { http } from "../utils/http";

// 参赛详情页
export function getArticlesDetail(article_id: any) {
  return http({
    url: `/api/articles/${article_id}`,
    method: "get",
  });
}

// 点赞
export function postlike(params: any) {
  return http({
    url: '/api/like',
    method: "post",
    data: params
  });
}
