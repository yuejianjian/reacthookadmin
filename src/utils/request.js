import axios from "axios";


const service = axios.create(
    {
        baseURL:process.env.REACT_APP_API,  // http://192.168.0.106:8080/devApi/  == http://www.web-jshtml.cn/productapi/productapi
        timeout: 15000,   // 超时
    }
);

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    console.log(config);
    // 在发送请求之前做些什么
    // config.headers['Tokey'] = getToken()
    // config.headers['UserName'] = getUserName()
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  
    // 对响应数据做点什么
    //return response;
    let data = response.data;
    if(data.resCode !== 0) {
        // Message.error(data.message);
        return Promise.reject(data);
    }else{
        return response;
        // return Promise.resolve(data);
    }
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  export default service;