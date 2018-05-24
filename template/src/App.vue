<template>
  <div id="app" class="">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import "./assets/index.scss";
  *{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    -moz-box-sizing:border-box; /* Firefox */
    -webkit-box-sizing:border-box; /* Safari */
  }
  body {
    height: 100%;
    margin: 0px;
    padding: 0px;
    font-family: 宋体;
    font-size: 12px;
    color: #19233c;
    -webkit-font-smoothing: antialiased;
  }
  #app {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    overflow: hidden;
    background: #fff;
    min-height: 500px;
    min-width: 1200px;
  }
  ::-webkit-input-placeholder{
    font-size: 12px;
    font-family: 宋体;
  }
</style>
