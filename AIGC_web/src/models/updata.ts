import { http } from "../utils/http";

// 上传作品
export function postArticle(params: any) {
  console.log(http)
  return http({
    url: "/api/article",
    method: "post",
    data: params,
  });
}