/**
* Created by zhanghao on 2018/1/12.
* 竖向经典3等分布局
*/
<template>
  <div class="verticalLayout">
    <header :style="'height: '+ (hIsCollapse ? hHeightOpen : hHeightColse)">
      <slot name="header"></slot>
    </header>
    <div class="verticalLayout-main" :style="'height:calc(100% - '+ (hIsCollapse ? hHeightOpen : hHeightColse) + ' - ' + (fIsCollapse ? fHeightOpen : fHeightColse) + ')'">
      <slot></slot>
    </div>
    <footer :style="'height: '+ (fIsCollapse ? fHeightOpen : fHeightColse)">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'verticalLayout',
  props: {
    hIsCollapse: {
      type: Boolean, default: true
    },
    hHeightColse: {
      type: String, default: '0px'
    },
    hHeightOpen: {
      type: String, default: '0px'
    },
    fIsCollapse: {
      type: Boolean, default: true
    },
    fHeightColse: {
      type: String, default: '0px'
    },
    fHeightOpen: {
      type: String, default: '0px'
    }
  },
  components: {},
  data () {
    return {}
  },
  methods: {},
  mounted () {
  }
}
</script>
<style lang="scss">
  .verticalLayout{
    position: absolute;
    width: 100%;
    height: 100%;
    header{
      position: relative;
      width: 100%;
    }
    .verticalLayout-main{
      position: relative;
      width: 100%;
    }
    footer{
      position: relative;
      width: 100%;
    }
  }
</style>
