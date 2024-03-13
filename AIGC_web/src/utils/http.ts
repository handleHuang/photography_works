import axios from "axios";
import router from '../router';
import { MessagePlugin } from 'tdesign-vue-next';

export const http = (options: any) => {
  return new Promise((resolve, reject) => {
    // create an axios instance
    const service = axios.create({
      baseURL: import.meta.env.VITE_URL_BASE, // api 的 base_url 注意 vue3 .env文件有强制性的 VITE_ 开头
      //   baseURL: 'https://www.baidu.com/api',  // 固定api
      timeout: 80000, // request timeout
    });

    // request interceptor
    service.interceptors.request.use(
      (config: any) => {
        let token: any = localStorage.getItem("token"); //此处换成自己获取回来的token，通常存在在cookie或者store里面
        console.log(token);
        if (token) {
          // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
          config.headers.Authorization = token;
        }
        // console.log(config)
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
        console.log(error.response.data)
        if (error.response.status === 401) {
          router.push('/login'); // 跳转到登录页面
          MessagePlugin.error("登录过期，请重新登录");
          localStorage.clear()
        } else if (error.response.status === 403) {
          MessagePlugin.error("登录失败，用户身份不符合要求");
        }else if (error.response.status === 405) {
          MessagePlugin.error("登录失败，用户名或密码错误");
        } else {
          MessagePlugin.error("服务器请求错误，请稍后再试");
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
