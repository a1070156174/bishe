/*
 * @Author: your name
 * @Date: 2020-02-26 20:37:42
 * @LastEditTime: 2020-05-06 22:51:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\src\http\axios.js
 */
import axios from 'axios';
import Qs from 'qs';
import { Message} from 'element-ui';
import Vue from 'vue'
import store from '../store'

// import { Message, Loading } from 'element-ui'; // 消息提示框组件 这个你们可以不用

// 环境的切换
// if (process.env.NODE_ENV == 'development') { 
//     axios.defaults.baseURL = 'http://sjzh2016.ticp.io:8888/dev';
//    } else if (process.env.NODE_ENV == 'debug') { 
//     axios.defaults.baseURL = 'http://sjzh2016.ticp.io:8888/dev';
//    } else if (process.env.NODE_ENV == 'production') { 
//     axios.defaults.baseURL = 'http://sjzh2016.ticp.io:8888/dev';
// };
// axios.defaults.baseURL= ' https://www.studyinghome.com/mock/5e55186a2cb0d073b813a407'
// 设置请求超时时间
axios.defaults.timeout = 30000;
   

   axios.defaults.baseURL= 'http://127.0.0.1:8080/'
  //  axios.defaults.headers['Content-Type'] = "application/json"
   axios.defaults.withCredentials = true
  //  axios.defaults.headers.common['Authorization'] =store.state.token
   Vue.prototype.$axios = axios;


  //请求拦截器   判断是否有token
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  if(store.state.token){
    config.headers.common['Authorization']="Bearer " + store.state.token  //在请求头加上token
  }
  return config;
},
  error=>{
    // 对请求错误做些什么
    return Promise.reject(error); 
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  response=>{
     // 对响应数据做点什么
     if(response.data.code !== "0"){
      throw new Error(response.data.message)
     }
     return response;  
  
  },
  error=>{
     对响应错误做点什么
    if(error.response){
      switch (error.response.status) {  // 查看状态码 如果是401
        case 401:
          this.$store.commit('del_token');  //执行vuex中delToken方法
          router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}//登录成功后 请求重定向跳入浏览的当前页面
            })
      }
    }
    return Promise.reject(error)
  }
)



// 封装get方法和post方法

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){ 
    return new Promise((resolve, reject) =>{ 
    axios.get(url, {  
     params: params 
    }).then(res => {
     resolve(res.data);
    //  Loading.service(true).close();
    //  Message({message: '请求成功', type: 'success'});
    }).catch(err => {
     reject(err.data) 
    //  Loading.service(true).close();
     Message({message: '加载失败', type: 'error'});
    }) 
   });}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url,params)
      .then(res => {
      resolve(res.data);
      // Loading.service(true).close();
      //  Message({message: '请求成功', type: 'success'});
      })
      .catch(err => {
      reject(err.data)
      // Loading.service(true).close();
      Message({message: '加载失败', type: 'error'});
      })
  });}

  /** 
 * post方法，参数序列化
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function qspost(url, params) {
  return new Promise((resolve, reject) => {
   axios.post(url, Qs.stringify(params))
  .then(res => {
   resolve(res.data);
  //  Loading.service(true).close();
  //  Message({message: '请求成功', type: 'success'});
  })
  .catch(err => {
   reject(err.data)
  // Loading.service(true).close();
   Message({message: '加载失败', type: 'error'});
  })
  });}


  /** 
 * qsput方法，对应put请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function qsput(url, params) {
      return new Promise((resolve, reject) => {
        axios.put(url,Qs.stringify(params))
        .then(res => {
        resolve(res.data);
        // Loading.service(true).close();
        //  Message({message: '请求成功', type: 'success'});
        })
        .catch(err => {
        reject(err.data)
        // Loading.service(true).close();
        Message({message: '加载失败', type: 'error'});
        })
  });}



    /** 
 * put方法，对应put请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function put(url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url,params)
    .then(res => {
    resolve(res.data);
    // Loading.service(true).close();
    //  Message({message: '请求成功', type: 'success'});
    })
    .catch(err => {
    reject(err.data)
    // Loading.service(true).close();
    Message({message: '加载失败', type: 'error'});
    })
});}

    /** 
 * delete
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function deletefn(url, params) {
  console.log(params)
  return new Promise((resolve, reject) => {
    // axios.delete(url,params)
    axios.delete(url+'/'+params.id)
    .then(res => {
    resolve(res.data);
    // Loading.service(true).close();
    //  Message({message: '请求成功', type: 'success'});
    })
    .catch(err => {
    reject(err.data)
    // Loading.service(true).close();
    Message({message: '加载失败', type: 'error'});
    })
});}