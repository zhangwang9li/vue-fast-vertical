// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import routes from './routes'
import api from './api/index'
import VueAMap from 'vue-amap'
import promise from 'es6-promise'
import Mock from './mock/mock'
import {mkTree} from './mk'

Mock.bootstrap()

promise.polyfill()
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '1d454d32947a8f76d4cb19def2b3124d',
  plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.Geolocation', 'AMap.CircleEditor', 'AMap.MouseTool', 'AMap.PolyEditor', 'AMap.MarkerClusterer'],
  uiVersion: '1.0'
})

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.prototype.$api = api

const router = new VueRouter({
  routes
})
let permission = sessionStorage.getItem('user')
if (permission) {
  let addRoutes = [{
    path: '/mainpage',
    component: require('./pages/MainPage.vue'),
    name: '',
    isMenu: true,
    children: mkTree(JSON.parse(localStorage.getItem('mks')))
  }]
  router.addRoutes(addRoutes)
}
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('Routers')
    sessionStorage.removeItem('userryb')
    sessionStorage.removeItem('token')
    localStorage.removeItem('menu')
    localStorage.removeItem('mks')
  }
  let title = to.name === '' ? '系统' : to.name
  document.title = title
  if (to.path === '/' || to.path === '') {
    next({ path: '/login' })
    sessionStorage.removeItem('user')
    localStorage.removeItem('menu')
  } else {
    let user = JSON.parse(sessionStorage.getItem('user'))
    if (!user && to.path !== '/login') {
      next({ path: '/login' })
    } else {
      next()
    }
  }
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
