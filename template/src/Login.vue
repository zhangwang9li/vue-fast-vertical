<template>
  <div class="login">
    <header>
      <div class="header">
        <div style="display:inline-block;left: calc(50% - 60px)">
          <div style="float: left;padding-top: 16px;">
            <img src="../static/img/logo.png" alt="" width="48px" height="48px">
          </div>
          <div style="float: left;padding-left: 20px;padding-top: 18px;">
            <p>xxxx系统</p>
            <!--<span >Road transport industry safety support system</span>-->
          </div>
        </div>

      </div>
    </header>
    <div class="login-main">
      <div class="login-main-left">
        <img src="../static/img/login.png">
      </div>
      <div class="login-main-right">
        <el-form :model="form" :rules="formRules" ref="form" label-position="left"
                 label-width="0px"
                 class="demo-ruleForm login-container">
          <h3 class="title">欢迎登录</h3>
          <el-form-item prop="name">
            <el-input type="text" size="small" v-model="form.name" auto-complete="off"
                      prefix-icon="iconfont icon-yonghu"
                      placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input type="password" size="small" v-model="form.pwd" auto-complete="off"
                      prefix-icon="iconfont icon-mima"
                      placeholder="密码"></el-input>
          </el-form-item>
          <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
          <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click="onLogin"
                       :loading="loginLoading" @keyup.enter.native="onLogin">登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <footer class="login-footer">
      <span>版权所有：xxxxxxxx公司</span>
    </footer>
  </div>
</template>

<script>
import {mkTree} from './mk'

export default {
  name: 'hello',
  data () {
    return {
      loginLoading: false,
      checked: false,
      form: {
        name: '',
        pwd: ''
      },
      formRules: {
        name: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        pwd: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    checkJs (mks) {
      let menu = mkTree(mks)
      localStorage.setItem('mks', JSON.stringify(mks))
      localStorage.setItem('menu', JSON.stringify(menu))
      let addRoutes = [{
        path: '/mainpage',
        component: () => import('./pages/Mainpage.vue'),
        name: '',
        isMenu: true,
        children: menu
      }]
      console.log(addRoutes)
      sessionStorage.setItem('Routers', JSON.stringify(addRoutes))
      this.$router.addRoutes(addRoutes)
      this.$router.push({path: '/mainpage'})
    },
    onLogin () {
      var loginParams = {username: this.form.name, password: this.form.pwd}
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loginLoading = true
          this.$api.login(loginParams).then(resp => {
            console.log(resp)
            this.loginLoading = false
            if (resp.status !== 200) {
              this.$message({
                message: '出错了',
                type: 'error'
              })
            } else {
              console.log('resp.data', resp.data.result)
              if (resp.data.code === 500) {
                this.$message({
                  message: resp.data.message,
                  type: 'error'
                })
              } else {
                if (this.checked) {
                  localStorage.setItem('user', JSON.stringify(loginParams))
                } else {
                  localStorage.removeItem('user')
                }
                sessionStorage.setItem('user', JSON.stringify(resp.data.user))
                this.checkJs(resp.data.user.mks) // 数据库数据或者自己测试数据组装页面构成
                // Object.assign(axios.defaults.headers, {'Authorization': resp.data.token})
                // sessionStorage.setItem('token', resp.data.token)
              }
            }
          }).catch(e => {
            this.loginLoading = false
            // this.$message({message: '出错了', type: 'error'})
            console.log(e)
          })
        }
      })
    },
    getDict () {
    }
  },
  computed: {},
  mounted () {
    var loginuser = localStorage.getItem('user')
    loginuser = JSON.parse(loginuser)
    if (loginuser !== null) {
      this.checked = true
      this.form.name = loginuser.username
      this.form.pwd = loginuser.password
    }
    document.onkeydown = (e) => {
      if (e.keyCode === 13) {
        this.onLogin()
      }
    }
  }
}
</script>
<!-- scss语法引用是 注:lang="scss" -->
<style lang="scss">
  .login {
    min-height: 600px;
    max-width: 1200px;
    overflow: auto;
  }

  .header {
    position: absolute;
    width: 100%;
    height: 88px;
    text-align: center;
  }
  .header p{
    margin: 0 auto;
    color: #1fa1df;
    letter-spacing: 1px;
    font-family: Microsoft YaHei;
    vertical-align: top;
    font-size: 32px;
  }
  .header span{
    margin: 0 auto;
    color: #1fa1df;
    font-family: Arial;
    font-size: 15px;
  }

  .login-footer {
    letter-spacing: 2px;
    position: absolute;
    bottom: 0;
    font-size: 14px;
    font-family: "Microsoft YaHei";
    color: #2d3344;
    width: 100%;
    line-height: 54px;
    height: 54px;
    text-align: center;
    margin: 0 auto;
    color: #333;
  }

  .login-main {
    width: 100%;
    position: absolute;
    top: 80px;
    bottom: 54px;
    overflow: hidden;
    background: #316ddb;
  }

  .login-main-left {
    position: relative;
    height: 100%;
    float: left;
    width: 50%;

  img {
    animation: shake;
    animation-iteration-count: infinite;
    animation-duration: 5s;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 10%;
    margin: auto;
  }

  }
  .login-main-right {
    position: relative;
    min-width: 360px;
    min-height: 320px;
    height: 100%;
    float: left;
    width: 50%;
  }
  .login-main-right .el-form .title{
    font-size: 16px;
    text-align: center;
    font-family: "Microsoft YaHei";
    font-weight: normal;
    color: #404040;
    margin-bottom: 24px;
  }
  .login-container {
    position: absolute;
    width: 360px;
    height: 320px;
    top: calc(50% - 135px);
    margin: auto;
    left: 10%;
    bottom: calc(50% - 135px);
    -webkit-border-radius: 3px;
    border-radius: 3px;
    -moz-border-radius: 3px;
    background-clip: padding-box;
    padding: 18px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    .el-form-item{
      .el-form-item__content{
        width: 100%!important;
      }
    }
  }
  .remember {
    margin: 15px 0px 15px 0px;
  }
  .remember .el-checkbox__label{
    font-size: 12px!important;
  }
  .remember .el-checkbox__inner{
    width: 12px;
    height: 12px;
  }
  .remember .el-checkbox__inner::after{
    height: 6px!important;
    left: 3px!important;
  }
  .login-container .el-input--small{
    height: 34px!important;
  }
  .login-container .el-input--small .el-input__inner{
    font-size: 12px!important;
    font-family: "宋体"!important;
  }
  .login-container .el-input--prefix .el-input__inner{
    padding-left: 15px!important;
  }
  .login-container .el-input__icon{
    font-size: 14px!important;
  }
  .login-container .el-input__prefix{
    left: 8px!important;
  }
  .el-button.el-button--primary{
    color: #fff;
    background-color: #316ddb!important;
    border-color: #316ddb!important;
  }
  .el-button.el-button--primary:focus, .el-button.el-button--primary:hover{
    background: #63baff!important;
    border-color: #63baff!important;
    color: #fff!important;
  }
</style>
