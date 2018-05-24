/**
* Created by zhanghao on 2018/2/26.
*/
<template>
  <VerticalLayout hHeightOpen="48px">
    <div slot="header" class="layout-div main-header" style="">
      <HorizontalLayout lWidthOpen="200px" rWidthOpen="280px" class="main-header-top" style="">
        <div slot="left" class="layout-div" >
          <div class="logo"><i>LOGO</i>软件开发部</div>
        </div>
        <div></div>
        <div slot="right" class="layout-div">
          <div class="logo">
            <span @click="goto('/home-page')">主页</span>
            <span @click="addTheme">修改主题</span>
            <el-dropdown @command="handleCommand">
              <span style="color: #fff">常用API</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="http://element-cn.eleme.io/2.0/#/zh-CN/component/layout">element-UI</el-dropdown-item>
                <el-dropdown-item command="https://elemefe.github.io/vue-amap/#/zh-cn/base/amap">高德地图</el-dropdown-item>
                <el-dropdown-item command="http://211.101.37.245:9083/dist/index.html">自定义插件</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </HorizontalLayout>
    </div>
    <div class="layout-div">
      <HorizontalLayout lWidthOpen="220px" lWidthColse="40px" :lIsCollapse="isCollapse">
        <div slot="left" class="layout-div menu-div menu-theme" style="">
          <div class="menu-collapse-button" style="">
            <div style="" @click="isCollapse=!isCollapse">
              <span>
              <i :class="isCollapse?'el-icon-d-arrow-left':'el-icon-d-arrow-right'"></i>
              </span>
            </div>
          </div>
          <el-scrollbar  :noresize="false" :native="false" style="height:calc(100% - 36px + 17px);">
            <ul class="menu" v-show="isCollapse">
              <li class="menu-li" :class="getMenuCss(item)" v-for="(item,index) in menu" v-if="item.isMenu" :key="index" >
                <div class="menu-li-lable" @click="item.expand=!item.expand">
                  <i style="font-size: 16px;" :class="item.iconFontClass"></i>
                  <span v-show="isCollapse" style="font-size: 16px;">\{{item.name}}</span>
                  <i v-show="isCollapse" class="arrow" :class="item.expand?'el-icon-arrow-down':'el-icon-arrow-up'"></i>
                </div>
                <ul class="menu-li-cul" v-if="item.children" v-show="item.expand">
                  <li class="menu-li-cli" :class="itemChild.path === $route.path? 'select-menu-li-cli': ''" v-for="(itemChild,index) in item.children" :index="itemChild.path" :key="index" @click="goto(itemChild.path)">
                    <i :class="itemChild.iconFontClass"></i>
                    <span v-show="isCollapse" >\{{itemChild.name}}</span>
                  </li>
                </ul>
              </li>
            </ul>
            <ul class="menu float-menu" v-show="!isCollapse">
              <li class="menu-li" :class="getMenuCss(item)" v-for="(item,closeIndex) in menu" v-if="item.isMenu" :key="closeIndex" @mouseenter="collapseShow($event, item)">
                <div class="menu-li-lable">
                  <i style="font-size: 16px;vertical-align:middle;" :class="item.iconFontClass"></i>
                  <span v-show="isCollapse" style="font-size: 16px;">\{{item.name}}</span>
                  <i v-show="isCollapse" class="arrow" :class="item.expand?'el-icon-arrow-down':'el-icon-arrow-up'"></i>
                </div>
              </li>
            </ul>
          </el-scrollbar>
          <transition name="el-fade-in-linear" mode="out-in">
            <ul v-show="!isCollapse&&isCollapseChildMenuShow" class="menu-li-cul float-child-menu">
              <li  :class="item.path === $route.path? 'select-menu-li-cli': ''" class="menu-li-cli" v-for="(item,index) in isCollapseChildMenu" :index="item.path" :key="index" @click="goto(item.path)">
                <i :class="item.iconFontClass"></i>
                <span >\{{item.name}}</span>
              </li>
            </ul>
          </transition>
        </div>
        <div class="layout-div" :style="isMapTabs()?'':'padding: 15px;height: calc(100% - 30px); width: calc(100% - 30px);'">
          <VerticalLayout hHeightOpen="40px" :hIsCollapse="!isMapTabs()">
            <div slot="header" class="layout-div" v-show="!isMapTabs()">
              <el-tabs v-model="selectTab" type="card" @tab-remove="tabsItemRemove" @tab-click="tabClick">
                <el-tab-pane :key="index" v-for="(item, index) in tabsItem" :closable="item.closable" :label="item.name"
                             :name="item.path">
                </el-tab-pane>
              </el-tabs>
            </div>
            <div class="layout-div" :style="isMapTabs()?'':'padding: 10px 0 0 0;'">
              <keep-alive>
                <router-view/>
              </keep-alive>
            </div>
          </VerticalLayout>
        </div>
      </HorizontalLayout>
    </div>
  </VerticalLayout>
</template>

<script>
import HorizontalLayout from '../components/HorizontalLayout.vue'
import VerticalLayout from '../components/VerticalLayout.vue'
export default {
  components: {HorizontalLayout, VerticalLayout},
  data () {
    return {
      theme: false,
      menu: [],
      isCollapse: true,
      isCollapseChildMenu: [],
      childMenuTop: 0,
      isCollapseChildMenuShow: false,
      selectTab: '/home-page',
      tabsItem: [
        {name: '看板', path: '/home-page', closable: false}
      ]
    }
  },
  methods: {
    addTheme () {
      if (this.theme) {
        $('#app').removeClass('themeA')
      } else {
        $('#app').addClass('themeA')
      }
      this.theme = !this.theme
    },
    openApi (command) {
      window.open(command)
    },
    goto (url) {
      let hasTabs = false
      this.tabsItem.map(item => {
        if (item.path === url) {
          hasTabs = true
        }
      })
      this.$router.push({path: url})
      setTimeout(() => {
        if (!hasTabs) {
          if (url !== '/home-page') {
            if (!this.isMapTabs()) {
              this.tabsItem.push({name: this.$route.name, path: url, closable: true})
              sessionStorage.setItem('mainPageTabs', JSON.stringify(this.tabsItem))
            }
          }
        }
        this.selectTab = url
      }, 50)
    },
    collapseShow (event, item) {
      $('.float-child-menu').css('top', ($(event.target)[0].offsetTop + 40 - this.childMenuTop) + 'px')
      $('.float-child-menu').css('bottom', '')
      this.isCollapseChildMenuShow = true
      this.isCollapseChildMenu = item.children
      setTimeout(() => {
        console.log(($(window).height() - $('.float-child-menu').offset().top - $('.float-child-menu').height()) < 0)
        console.log($(window).height())
        if (($(window).height() - $('.float-child-menu').offset().top - $('.float-child-menu').height()) < 0) {
          $('.float-child-menu').css('top', '')
          $('.float-child-menu').css('bottom', '0px')
        }
      }, 100)
    },
    collapseHide () {
      this.isCollapseChildMenuShow = false
      this.isCollapseChildMenu = []
    },
    getMenuCss (item) {
      // path命名规范父子之间 - 分割
      if (this.$route.path.split('-')[0] === item.path) {
        return 'select-menu-li'
      }
    },
    tabClick (tab) {
      this.goto(tab.name)
    },
    tabsItemRemove (targetName) {
      this.tabsItem.map((item, index) => {
        if (item.path === targetName) {
          if (this.selectTab === targetName) {
            this.goto(this.tabsItem[index - 1].path)
          }
          this.tabsItem.splice(index, 1)
        }
      })
      sessionStorage.setItem('mainPageTabs', JSON.stringify(this.tabsItem))
    },
    // 判断是否为地图插件
    isMapTabs () {
      if (this.$route.path.indexOf('map') > -1) {
        return true
      } else {
        return false
      }
    },
    handleCommand (command) {}
  },
  mounted () {
    let tabs = JSON.parse(sessionStorage.getItem('mainPageTabs'))
    if (tabs) {
      this.tabsItem = tabs
    }
    if (this.$route.path === '/mainpage') {
      this.goto('/home-page')
    } else {
      this.goto(this.$route.path)
    }
    $('.float-menu').parent().parent().scroll(() => {
      this.childMenuTop = $('.float-menu').parent().parent().scrollTop()
    })
    window.setTimeout(() => {
      document.addEventListener('click', (event) => {
        var e = event || window.event // 浏览器兼容性
        var elem = e.target || e.srcElement
        let ischick = false
        while (elem) { // 循环判断至跟节点，防止点击的是div子元素
          if (elem.className && elem.className === 'el-scrollbar') {
            ischick = true
            return
          }
          if ((elem.className && elem.className === 'menu-li-cul float-child-menu')) {
            ischick = true
            return
          }
          elem = elem.parentNode
        }
        if (!ischick) {
          this.collapseHide()
        }
        document.removeEventListener('click', () => {
        }, false)
      }, false)
    }, 100)
    this.menu = JSON.parse(localStorage.getItem('menu'))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.logo{
  height: 48px;
  line-height: 48px;
  font-size: 24px;
  color: #fff;
  text-align: center;
}
.logo span{
  font-size: 20px;
  cursor: pointer;
}
.logo span:hover{
  color: #f1f1f1;
}
</style>
