import { http } from "../utils/http";

//登录
export function getLogin() {
  return http({
    url: "/api/login", //此处为自己请求地址
    method: "get",
  });
}

// 命题列表
export function getProjectsList(params: any) {
  return http({
    url: "/api/labelList?online=1", //此处为自己请求地址
    method: "get",
  });
}

export function postText(params: any) {
  return http({
    url: "/chaju", //此处为自己请求地址
    method: "post",
    data: params,
  });
}
