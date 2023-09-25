import { http } from "../utils/http";

// 调用测试
export function getTest(pages: any) {
  return http({
    url:
      "/api/server?" +
      `page=${pages.value.page}` +
      `&pageSize=${pages.value.pageSize}` +
      `${pages.value.keyword !== "" ? `&keyword=${pages.value.keyword}` : ""}`, //此处为自己请求地址
    method: "get",
  });
}

// 调用测试
export function pushdata(params: any) {
  return http({
    url: "/api/pushdata", //此处为自己请求地址
    method: "post",
    data: params,
  });
}

// 上传图片
export function postText(params: any) {
  return http({
    url: "/api/upload", //此处为自己请求地址
    method: "post",
    data: params,
  });
}

export function login(params: any) {
  return http({
    url: "/api/login", //此处为自己请求地址
    method: "post",
    data: params,
  });
}

export function register(params: any) {
  return http({
    url: "/user/register", //此处为自己请求地址
    method: "post",
    data: params,
  });
}

export function postSearch(params: any) {
  return http({
    url: "/api/search", //此处为自己请求地址
    method: "post",
    data: params,
  });
}

//删除
export function delUser(params: any) {
  return http({
    url: "/api/delUser", //此处为自己请求地址
    method: "delete",
    data: params,
  });
}

// 修改
export function anemdUser(params: any) {
  return http({
    url: "/api/anemdUser", //此处为自己请求地址
    method: "post",
    data: params,
  });
}

// 上传
export function uploadimg(params: any) {
  return http({
    url: "/api/uploadimg", //此处为自己请求地址
    method: "post",
    data: params,
  });
}
