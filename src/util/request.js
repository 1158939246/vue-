// 加载进度条
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 导入base url
import { BASE_URL } from '../config/index'
// 封装请求相关的方法
var instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  NProgress.start()
  return config
}, function (error) {
  // 对请求错误做些什么
  NProgress.done()
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  NProgress.done()
  return response
}, function (error) {
  // 对响应错误做点什么
  NProgress.done()
  return Promise.reject(error)
})
// 将token信息保存到请求头
const setToken = function () {
  instance.defaults.headers.common.token = sessionStorage.getItem('token')
}
// get请求方法
const get = async function (url, params) {
  const { data } = await instance.get(url, { params })
  return data
}
// post
const post = async function (url, params) {
  const { data } = await instance.post(url, params)
  return data
}

export {
  get,
  post,
  setToken
}
