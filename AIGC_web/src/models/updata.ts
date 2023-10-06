import { http } from "../utils/http";

// 上传作品
export function postArticle(params: any) {
  return http({
    url: "/api/addWork",
    method: "post",
    data: params,
  });
}