export const jurisds = [
  {
    mkid: '01',
    fmkid: '',
    mkname: '首页',
    name: '首页',
    url: '/home',
    isMenu: false,
    img: 'el-icon-info',
    zj: '/HomePage'
  },
  {
    mkid: '0101',
    fmkid: '',
    mkname: '看板',
    name: '看板',
    url: '/home-page',
    isMenu: false,
    img: 'el-icon-question',
    zj: '/HomePage'
  },
  {
    mkid: '010101',
    fmkid: '',
    mkname: '看板xiugai',
    name: '看板xiugai',
    url: '',
    isMenu: false,
    img: '',
    zj: ''
  },
  {
    mkid: '02',
    fmkid: '',
    mkname: '基础模块',
    name: '基础模块',
    url: '/base',
    isMenu: true,
    img: 'el-icon-remove',
    zj: '/base/BaseMain'
  },
  {
    mkid: '0201',
    fmkid: '',
    mkname: '用户管理',
    name: '用户管理',
    url: '/base-user',
    isMenu: true,
    img: 'el-icon-remove-outline',
    zj: '/base/User'
  },
  {
    mkid: '0202',
    fmkid: '',
    mkname: '权限管理',
    name: '权限管理',
    url: '/base-jurisd',
    isMenu: true,
    img: 'el-icon-tickets',
    zj: '/base/Jurisd'
  },
  {
    mkid: '0203',
    fmkid: '',
    mkname: '部门管理',
    name: '部门管理',
    url: '/base-dep',
    isMenu: true,
    img: 'el-icon-tickets',
    zj: '/base/Department'
  }
]
export const UserJurisds = [
  {
    id: '1',
    name: '超级管理员',
    juridsds: ['01', '0101', '010101', '02', '0201', '0202'],
    state: true
  },
  {
    id: '2',
    name: '管理员',
    juridsds: ['02', '0201', '0202'],
    state: false
  }
]
