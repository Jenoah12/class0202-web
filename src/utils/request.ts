import axios from "axios";
import { ElMessage } from "element-plus";

// 配置新建一个 axios 实例
const request = axios.create({
  // 请求前缀
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 50000,
});

// 添加请求拦截器
request.interceptors.request.use((config) => {
  // 将来添加token参数

  return config;
});

// 添加响应拦截器
request.interceptors.response.use(
  /* 约束一下response */
  async (response) => {
    // 对响应数据做点什么
    const res = response.data;
    if (res.code !== 20000 && res.code !== 200) {
      /* 成功数据的code值为20000/200 */
      // 统一的错误提示
      const message = res.message || "未知错误";
      ElMessage.error(message);
      return Promise.reject(message);
    } else {
      return res.data; /* 返回成功响应数据中的data属性数据 */
    }
  },
  (error) => {
    // 对响应错误做点什么
    if (error.message.indexOf("timeout") !== -1) {
      ElMessage.error("网络超时");
    } else if (error.message === "Network Error") {
      ElMessage.error("网络连接错误");
    } else {
      if (error.response.data) ElMessage.error(error.response.statusText);
      else ElMessage.error("接口路径找不到");
    }
    return Promise.reject(error);
  }
);

export default request;
