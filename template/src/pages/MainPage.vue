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
        <div class="layout-div">
          <el-menu :default-active="selectTab" class="header-el-menu" mode="horizontal"
                   background-color="#2a303e"
                   text-color="#fff"
                   active-text-color="#ffd04b"
                   @select="handleSelect">
            <template v-for="(item,index) in menu">
              <template v-if="item.children && item.children.length > 1">
                <el-submenu :key="index" :index="item.url">
                  <template slot="title">\{{item.name}}</template>
                  <template v-for="(citem,cindex) in item.children">
                    <el-menu-item :key="index +'-'+ cindex" :index="citem.url">\{{citem.name}}</el-menu-item>
                  </template>
                </el-submenu>
              </template>
              <template v-else-if="item.children && item.children.length === 1"> <!-- 此情况下注意child的名字和item显示那个问题 -->
                <el-menu-item :key="index +'-1'" :index="item.children[0].url">\{{item.children[0].name}}</el-menu-item>
              </template>
              <template v-else>
                <el-menu-item :key="index +'-0'"  :index="item.url">\{{item.name}}</el-menu-item>
              </template>
            </template>
          </el-menu>
        </div>
        <div slot="right" class="layout-div">
          <div class="logo">
            <span @click="goto('/home')">主页</span>
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
    <div class="layout-div" style="padding: 12px;width: calc(100% - 24px);height: calc(100% - 24px);">
      <keep-alive>
        <router-view/>
      </keep-alive>
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
        childMenuTop: 0,
        selectTab: '/home'
      }
    },
    methods: {
      handleCommand (command) {
      },
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
        this.goto(key)
      },
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
        this.$router.push({path: url})
        this.selectTab = url
      }
    },
    mounted () {
      if (this.$route.path === '/mainpage') {
        this.goto('/home')
      } else {
        this.goto(this.$route.path)
      }
      this.menu = JSON.parse(localStorage.getItem('menu'))
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss">
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
