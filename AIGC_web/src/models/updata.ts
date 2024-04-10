import { http } from "../utils/http";

// 上传作品
export function postArticle(params: any) {
  return http({
    url: "/api/addWork",
    method: "post",
    data: params,
  });
}

// 上传图片
export function signature(params: any) {
  return http({
    url: "/api/signature",
    method: "post",
    data: params,
  });
}