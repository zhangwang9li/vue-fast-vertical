import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 应用初始状态
export const state = {
  menu: []
}
// 定义所需的 mutations
const mutations = {
  setMenu (state, menus) {
    if (state.menu.length === 0 && menus) {
      state.menu = menus
    }
  }
}
const actions = {
  saveMenu ({commit}, menus) {
    console.log(menus)
    commit('setMenu', menus)// 提交到mutations中处理
  }
}
const getters = {
  getMenu (state) {
    return state.menu
  }
}
// 创建 store 实例
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
