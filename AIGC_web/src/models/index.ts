import { http } from "../utils/http";

//登录
export function getLogin() {
  return http({
    url: "/api/login", //此处为自己请求地址
    method: "get",
  });
}

// 登录
export function login (params:any) {
  // return axios.post('/login', params)
  return http({
    url: "/api/login", //此处为自己请求地址
    method: "post",
    data: params,
  });
}

// 注册
export function register (params: any) {
  // return axios.post('/register', params)
  return http({
    url: "/api/register", //此处为自己请求地址
    method: "post",
    data: params,
  });
}

// 分类列表
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

// 推荐
export function getRandom() {
  return http({
    url: "/api/randomWorks", //此处为自己请求地址
    method: "get",
  });
}
