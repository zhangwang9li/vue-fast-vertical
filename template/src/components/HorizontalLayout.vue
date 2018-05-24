/**
* Created by zhanghao on 2018/1/12.
* 水平经典3等分布局
*/
<template>
  <div class="horizontalLayout">
    <aside :style="'width: '+ (lIsCollapse ? lWidthOpen : lWidthColse)">
      <slot name="left"></slot>
    </aside>
    <div class="horizontalLayout-main"
         :style="'width:calc(100% - '+ (lIsCollapse ? lWidthOpen : lWidthColse) + ' - ' + (rIsCollapse ? rWidthOpen : rWidthColse) + ')'">
      <slot></slot>
    </div>
    <section :style="'width: '+ (rIsCollapse ? rWidthOpen : rWidthColse)">
      <slot name="right"></slot>
    </section>
  </div>
</template>

<script>
export default {
  name: 'horizontalLayout',
  props: {
    lIsCollapse: {
      type: Boolean, default: true
    },
    lWidthColse: {
      type: String, default: '0px'
    },
    lWidthOpen: {
      type: String, default: '0px'
    },
    rIsCollapse: {
      type: Boolean, default: true
    },
    rWidthColse: {
      type: String, default: '0px'
    },
    rWidthOpen: {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .horizontalLayout {
    height: 100%;
    position: absolute;
    width: 100%;

  aside {
    position: relative;
    float: left;
    height: 100%;
  }

  .horizontalLayout-main {
    position: relative;
    height: 100%;
    float: left;
  }

  section {
    position: relative;
    height: 100%;
    float: right;
  }

  }
</style>
