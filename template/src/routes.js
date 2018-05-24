import Login from './Login.vue'
import MainPage from './pages/MainPage.vue'

let routes = [
  {
    path: '/login',
    component: Login,
    name: '登录'
  },
  {
    path: '/mainpage',
    component: MainPage,
    name: '主页'
  }
]
export default routes
