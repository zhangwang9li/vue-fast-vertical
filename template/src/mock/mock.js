import axios from 'axios'
import Mock from 'mockjs'
import MockAdapter from 'axios-mock-adapter'
import { LoginUsers, Users } from './data/user'
import { jurisds, UserJurisds } from './data/Jurisd'

let _Users = Users

export default {
  /**
   * mock bootstrap
   */
  bootstrap () {
    let mock = new MockAdapter(axios)
    // 登录
    mock.onPost('/login').reply(config => {
      let {username, password} = JSON.parse(config.data)
      return new Promise((resolve, reject) => {
        let user = null
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u))
              user.password = undefined
              return true
            }
          })

          if (hasUser) {
            resolve([200, { code: 200, message: '请求成功', user }])
          } else {
            resolve([200, { code: 500, message: '账号或密码错误' }])
          }
        }, 500)
      })
    })

    // 获取用户列表（分页）
    mock.onPost('/user/listpage').reply(config => {
      let {name, age, currentPage, pageSize} = JSON.parse(config.data)
      console.log(age)
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) === -1) return false
        return true
      })
      let total = mockUsers.length
      mockUsers = mockUsers.filter((u, index) => index < pageSize * currentPage && index >= pageSize * (currentPage - 1))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }])
        }, 1000)
      })
    })
    // 获取用户详情
    mock.onPost('/user/details').reply(config => {
      let {id} = JSON.parse(config.data)
      let mockUsers = _Users.filter(user => {
        if (id && user.id.indexOf(id) === -1) return false
        return true
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            user: mockUsers[0]
          }])
        }, 1000)
      })
    })

    // 删除用户
    mock.onPost('/user/remove').reply(config => {
      let { id } = JSON.parse(config.data)
      _Users = _Users.filter(u => u.id !== id)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }])
        }, 500)
      })
    })

    // 批量删除用户
    mock.onGet('/user/batchremove').reply(config => {
      let { ids } = config.data
      ids = ids.split(',')
      _Users = _Users.filter(u => !ids.includes(u.id))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }])
        }, 500)
      })
    })

    // 编辑用户
    mock.onPost('/user/edit').reply(config => {
      let { id, name, addr, age, birth, sex } = JSON.parse(config.data)
      _Users.some(u => {
        if (u.id === id) {
          u.name = name
          u.addr = addr
          u.age = age
          u.birth = birth
          u.sex = sex
          return true
        }
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }])
        }, 500)
      })
    })
    // 检测用户名重复
    mock.onPost('/user/checkusername').reply(config => {
      let { username } = JSON.parse(config.data)
      let checkUser = _Users.filter(user => {
        if (username && user.username === username) return true
        return false
      })
      let data = (checkUser.length !== 0)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, data])
        }, 1000)
      })
    })
    // 新增用户
    mock.onPost('/user/add').reply(config => {
      let { username, pw, name, sex, phone, bmcode, selectedcascader, jsid, state, remarks } = JSON.parse(config.data)
      console.log(config.data, selectedcascader)
      _Users.push({
        id: Mock.Random.guid(),
        name: name,
        sex: sex,
        username: username,
        pw: pw,
        phone: phone,
        bmcode: bmcode,
        jsid: jsid,
        state: state,
        remarks: remarks
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }])
        }, 500)
      })
    })
    // 获取tree
    mock.onPost('/treedata').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            message: '请求成功',
            treedata: [{'id': 1, 'pId': 0, 'name': '父节点1 - 展开', 'open': true}, {'id': 11, 'pId': 1, 'name': '父节点11 - 折叠'}, {'id': 123, 'pId': 12, 'name': '叶子节点123'}, {'id': 124, 'pId': 12, 'name': '叶子节点124'}]
          }])
        }, 1000)
      })
    })
    // 获取全部用户权限
    mock.onPost('/getAllJurisds').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, { code: 200, message: '请求成功', jurisds }])
        }, 500)
      })
    })
    // 获取全部权限组
    mock.onPost('/getJurisdsGroup').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, { code: 200, message: '请求成功', UserJurisds }])
        }, 500)
      })
    })
  }
}
