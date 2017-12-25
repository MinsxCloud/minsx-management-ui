import axios from 'axios'
import Minsx from './minsx.js'
import Config from './config.js'

let instance = axios.create({
  baseURL: Config.API_URI
});

instance.interceptors.request.use(function (config) { // 这里的config包含每次请求的内容
  let token = Minsx.Cookie.get('access_token');
  if (token) config.headers.Authorization = 'bearer ' + token;
  return config;
}, function (err) {
  return Promise.reject(err);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 401 && (error.response.data.error === 'invalid_token' || error.response.data.error === 'unauthorized')) {
    window.location.href = Config.LOGIN_URI;
  } else if (error.response.status.toString().indexOf('50') > -1) {
    alert('错误码:' + error.response.status + ' 错误信息:' + error.response.data.error);
  } else {
    return Promise.reject(error);
  }
});

const Axios = {
  get(url, param) {
    return instance.get(url, {params: param});
  },
  delete(url, param) {
    return instance.delete(url, {params: param});
  },
  post(url, body,param) {
    return instance.post(url, body, {params: param});
  },
  postJson(url, body, param) {
    let option = {
      headers: {'Content-Type': 'application/json'}
    };
    if (param) option.params = param;
    return instance.post(url, body, option);
  },
  put(url, body, param) {
    return instance.put(url, body, {params: param});
  },
  putJson(url, body, param) {
    let option = {
      headers: {'Content-Type': 'application/json'}
    };
    if (param) option.params = param;
    return instance.put(url, body, option);
  }
}
export default Axios;
