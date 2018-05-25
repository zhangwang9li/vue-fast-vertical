import Mock from 'mockjs'
export const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某',
    mks: [
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
      },
      {
        mkid: '03',
        fmkid: '',
        mkname: '基础地图',
        name: '基础地图',
        url: '/map',
        isMenu: true,
        img: 'el-icon-remove',
        zj: '/map/Main'
      },
      {
        mkid: '0301',
        fmkid: '',
        mkname: '高德地图',
        name: '高德地图',
        url: '/map-amap',
        isMenu: true,
        img: 'el-icon-remove-outline',
        zj: '/map/AmapBase'
      },
      {
        mkid: '0302',
        fmkid: '',
        mkname: '高德地图轨迹回放',
        name: '高德地图轨迹回放',
        url: '/map-amapgjhf',
        isMenu: true,
        img: 'el-icon-remove-outline',
        zj: '/map/AmapGjff'
      }
    ]
  }
]

export const Users = []

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    username: Mock.Random.word(),
    bmcode: Mock.Random.guid(),
    bmname: Mock.Random.word(),
    jsid: Mock.Random.integer(1, 2, 3, 4, 5),
    jsname: Mock.Random.word(),
    phone: Mock.Random.zip(),
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(1, 2),
    state: Mock.Random.integer(0, 1)
  }))
}
