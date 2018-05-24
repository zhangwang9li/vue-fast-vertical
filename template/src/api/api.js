import axios from 'axios'

let base = config.ip // 打包地址http://192.168.0.200:9001
const defaults = {
  baseURL: base + '',
  headers: {
    'Authorization': '',
    'No-Cache': '',
    'X-Requested-With': '',
    'If-Modified-Since': '',
    'Pragma': '',
    'Last-Modified': '',
    'Cache-Control': '',
    'Expires': '',
    'Content-Type': 'application/json',
    'X-E4M-With': '',
    post: {
      'Content-Type': 'application/json'
    },
    get: {
      'Content-Type': 'application/json'
    }
  }
}
Object.assign(axios.defaults, defaults)
axios.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('token')) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = sessionStorage.getItem('token')
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401: case 403:
          // 返回 401 清除token信息并跳转到登录页面
          // sessionStorage.clear()
          // window.location.href = '/'
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  })

// 调试修修改
export const login = (urlpart) => { return axios.post(`/login`, urlpart).then(res => res) }// 登录
export const userPageList = (urlpart) => { return axios.post(`/user/listpage`, urlpart).then(res => res) }// 用户分页
export const userDetails = (id) => { return axios.post(`/user/details`, {id: id}).then(res => res) }// 用户详情
export const userDelect = (id) => { return axios.post(`/user/remove`, {id: id}).then(res => res) }// 用户删除
export const userAdd = (urlpart) => { return axios.post(`/user/add`, urlpart).then(res => res) }// 用户添加
export const userUpdate = (urlpart) => { return axios.post(`/user/edit`, urlpart).then(res => res) }// 用户修改
export const getJurisdsGroup = () => { return axios.post(`/getJurisdsGroup`).then(res => res) }// 系统权限组
export const getAllJurisds = () => { return axios.post(`/getAllJurisds`).then(res => res) }// 系统所有权限
export const treedata = () => { return axios.post(`/treedata`).then(res => res) }// 系统所有权限
