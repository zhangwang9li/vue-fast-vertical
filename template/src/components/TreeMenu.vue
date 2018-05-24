<style scoped>
.left{width: 100%; min-height: 40px;min-width: 162px;padding-left: 6px}
.left span{line-height: 40px;padding: 10px 0;  margin: 0;  text-align: center;  color: #999;  font-size: 12px;display: inline-block;width: 100%;}
</style>
<template>
  <div class="zTreeDemoBackground left">
      <ul v-show="zNodes.length>0" :id="treeid" class="ztree"></ul>
      <span style="" v-show="zNodes.length===0">暂无数据</span>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  props: {
    id: {
      type: String,
      default: 'zTree'
    },
    setting: {},
    zNodes: {
      type: Array,
      default: () => {
        return []
      }
    },
    urlFunc: {
      type: Function
    },
    PrimaryKey: {
      type: String,
      default: 'id'
    },
    PrimaryKeyValue: { // 仅用于select下拉菜单，已选择的可以是String也可是【】数组
    }
  },
  data() {
    return {
      treeid: this.id,
      tree: ''
    }
  },
  methods: {
    checkSelect() {
      if (!this.setting.check) {
        let selectNode = this.tree.getNodeByParam(this.PrimaryKey, this.PrimaryKeyValue, null)
        this.tree.selectNode(selectNode)
        this.tree.expandNode(selectNode, true, false)
        this.$emit('reverseSelection', selectNode)
      } else {
        let selectNodes = []
        if (!this.PrimaryKeyValue) {
          return
        }
        this.PrimaryKeyValue.map(item => {
          let selectNode = this.tree.getNodeByParam(this.PrimaryKey, item[this.PrimaryKey], null)
          this.tree.selectNode(selectNode)
          this.tree.checkNode(selectNode, true, true)
          selectNodes.push(selectNode)
        })
        this.$emit('reverseSelection', selectNodes)
      }
    }
  },
  mounted() {
    this.treeid = this.id
    console.log(this.setting)
    console.log(this.zNodes)
    this.tree = $.fn.zTree.init($('#' + this.treeid), this.setting, this.zNodes)
    setTimeout(() => {
      this.checkSelect()
      this.tree.expandAll(true)
    }, 100)
  },
  ready() {
  },
  watch: {
    PrimaryKeyValue: {
      handler(curVal, oldVal) {
        this.checkSelect()
      },
      deep: true
    },
    zNodes: {
      handler(curVal, oldVal) {
        console.log('treemenu-PrimaryKeyValue')
        if (!this.setting.check) {
//            var selectedNode = this.tree.getSelectedNodes()
          if (curVal && curVal.length > 0) {
            Object.assign(curVal[0], {open: true})
          }
          this.tree = $.fn.zTree.init($('#' + this.treeid), this.setting, curVal)
//            if (selectedNode.length === 0) {
//              var nodes = this.tree.getNodes()
//              this.tree.expandNode(nodes[0], true)
//              this.tree.selectNode(nodes[0])
//              this.$emit('selectNode', curVal[0])
//            } else {
//              this.tree.expandNode(selectedNode[0], true)
//              this.tree.selectNode(selectedNode[0])
//              this.$emit('selectNode', selectedNode[0])
//            }
        } else {
          this.tree = $.fn.zTree.init($('#' + this.treeid), this.setting, curVal)
        }
      },
      deep: true
    }
  }
}
</script>
