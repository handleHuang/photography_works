import axios from "axios";
import { Message } from "tdesign-vue-next";

export const http = (options: any) => {
  return new Promise((resolve, reject) => {
    // create an axios instance
    const service = axios.create({
      baseURL: "http://127.0.0.1:12134", // 固定api
      timeout: 80000, // request timeout
    });

    // request interceptor
    service.interceptors.request.use(
      (config: any) => {
        // let token: string = ""; //此处换成自己获取回来的token，通常存在在cookie或者store里面
        let token: any = localStorage.getItem("token")
          ? localStorage.getItem("token")
          : ""; //此处换成自己获取回来的token，通常            存在在cookie或者store里面
        if (token) {
          // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
          config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
      },
      (error) => {
        // Do something with request error
        console.log("出错啦", error); // for debug
        Promise.reject(error);
      }
    );

    // response interceptor
    service.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        console.log("err" + error); // for debug
        if (error.response.status == 403) {
          Message.error("错了");
        } else {
          Message.error("服务器请求错误，请稍后再试");
        }
        return Promise.reject(error);
      }
    );
    // 请求处理
    service(options)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default http;
