/**
 * Created by zhanghao on 2018/3/31.
 * 权限管理
 */
<template>
  <HorizontalLayout lWidthOpen="200px" v-loading="loading">
    <div slot="left" class="layout-div js-layout">
      <VerticalLayout fHeightOpen="40px">
        <div>
          <el-scrollbar  :noresize="false" :native="false" >
            <div class="js-scrollbar">
              <ul>
                <li v-for="(js,index) in jsData" :key="index+''" :class="jsSelect===index?'select':''" @click="clickmenu(index, js)">
                  <span v-show="!(js.add||js.bianji)" :class="js.state?'qiyong':'jinyong'">\{{js.name}}</span>
                  <el-input v-model="js.name" style="" v-show="(js.add||js.bianji)"></el-input>
                  <span class="caozuo" v-show="!js.add">
                    <i class="icon iconfont " :class="js.bianji?'icon-quxiaoxianxing':'icon-bianji1'" @click.stop="handlerOpenBj(js,index)"></i>
                    <i class="icon iconfont icon-shanchu"></i>
                    <i class="icon iconfont" :class="js.state?'icon-danxuanxuanzhong':'icon-danxuanweixuanzhong'"></i>
                  </span>
                  <span class="caozuo" v-show="js.add">
                    <i class="icon el-icon-back" title="撤销" @click.stop="cancelAdd(index)"></i>
                  </span>
                </li>
              </ul>
            </div>
          </el-scrollbar>
        </div>
        <div slot="footer" style="line-height: 40px;text-align: center">
          <el-button :disabled="isUpdate" style="" size="small" class="bao_cun" @click.stop="addUsers()">添加角色</el-button>
        </div>
      </VerticalLayout>
    </div>
    <div class="layout-div js-mk-layout" >
      <VerticalLayout fHeightOpen="50px" :fIsCollapse="isUpdate">
        <div class="layout-div">
          <el-scrollbar  :noresize="false" :native="false" class="mks-scrollbar">
            <div  style="">
              <div v-for="(pages,index) in pagesJs" :key="index" style="padding: 0 20px;max-height: 600px;width: 100%">
                <el-checkbox class="js_check"  :disabled="disabled" style="float: left;width: 100px;color: #00a2fd" v-model="pages.checked"  @change="checkedAll($event, pages)">\{{pages.name}}</el-checkbox>
                <div style="float:left;width: calc(100% - 100px);">
                  <div :key="indexgroup" v-for="(childrenGropy,indexgroup) in pages.childrenGropy">
                    <el-row class="js_check" >
                      <el-col :span="6" class="js_check" :key="group.name" v-for="(group,indexs) in childrenGropy">
                        <el-checkbox :disabled="disabled" class="js_check" :label="group.name" :key="group.name" v-model="group.checked"  @change="changeSelect((index+''+indexgroup), pages, group,indexs)">\{{group.name}} </el-checkbox>
                        <span :class="optionsSelect === (index+''+indexgroup+''+indexs)?'el-icon-arrow-up':'el-icon-arrow-down'" v-if="group.children" @click="showOptions((index+''+indexgroup),group,indexs)"></span>
                      </el-col>
                    </el-row>
                    <div :id="index+''+indexgroup" class="options" style="background-color: #f6f6f6;width: calc(100% - 130px)" v-show="showGroupDiv">
                      <el-checkbox :disabled="disabled" v-for="(option,index) in options" :label="option" :key="index" style="height:44px;line-height: 44px;" v-model="option.checked" @change="changeMenu($event,pages, childrenGropy, option)">\{{option.name}}</el-checkbox>
                    </div>
                    <div style="clear:both"></div>
                  </div>
                  <div style="clear:both"></div>
                </div>
                <div style="clear:both"></div>
              </div>
            </div>
          </el-scrollbar>
        </div>
        <div slot="footer" class="layout-div">
          <div v-show="isUpdate" class="layout-div" style="text-align: center;line-height: 50px">
            <el-button size="small" type="primary" class="dialog-button bao_cun" @click="saveSj">保存</el-button>
          </div>
        </div>
      </VerticalLayout>
    </div>
  </HorizontalLayout>
</template>

<script>
import HorizontalLayout from '../../components/HorizontalLayout.vue'
import VerticalLayout from '../../components/VerticalLayout.vue'
export default {
  components: {VerticalLayout, HorizontalLayout},
  data () {
    return {
      loading: false,
      jsSelect: 0,
      jsData: [],
      pagesJs: [],
      initOagesJs: [],
      options: [],
      optionsSelect: '',
      showGroupDiv: false,
      disabled: true,
      isUpdate: false,
      updateRowId: ''
    }
  },
  methods: {
    handlerOpenBj (row, index) {
      this.updateRowId = row.id
      this.jsSelect = index
      row.bianji = !row.bianji
      this.isUpdate = !this.isUpdate
      this.disabled = !this.disabled
    },
    addUsers () {
      if (this.isUpdate) {
        return
      }
      this.updateRowId = ''
      this.jsData.push({id: '', name: '', juridsds: [], state: true, add: true, bianji: false})
      this.jsData = JSON.parse(JSON.stringify(this.jsData))
      this.jsSelect = this.jsData.length - 1
      this.isUpdate = true
      this.disabled = false
      this.pagesJs = JSON.parse(JSON.stringify(this.initOagesJs))
      // item.qx进行判断选择情况
      this.checkboxIschecked(this.jsData[this.jsSelect].juridsds)
      let option = document.getElementsByClassName('options')
      for (let i = 0; i < option.length; i++) {
        option[i].style.display = 'none'
      }
    },
    cancelAdd (index) {
      this.disabled = true
      this.isUpdate = false
      this.jsData.splice(index, 1)
      this.clickmenu(this.jsData.length - 1, this.jsData[this.jsData.length - 1])
    },
    saveSj () {
      let qxsuarr = JSON.parse(JSON.stringify(this.pagesJs))
      console.log(this.jsData[this.jsSelect].name, qxsuarr)
      if (!this.jsData[this.jsSelect].name.trim()) {
        this.$message({message: '角色名不可为空', type: 'warning'})
        return
      }
      let qxs = []
      qxsuarr.map(js => {
        if (js.checked) {
          qxs.push(js.mkid)
        }
        js.childrenGropy.map(children => {
          children.map(item => {
            if (item.checked) {
              qxs.push(item.mkid)
            }
            if (item.children) {
              item.children.map(citme => {
                if (citme.checked) {
                  qxs.push(citme.mkid)
                }
              })
            }
          })
        })
      })
      if (qxs.length === 0) {
        this.$message({message: '角色权限不可为空', type: 'warning'})
        return
      }
      if (!this.updateRowId) {
        // 添加 qxs为选择的权限  this.jsData[this.jsSelect].name 名称 默认state启用true
        console.log('添加', qxs)
        this.getJs()
      } else {
        // 更新 qxs为选择的权限  this.jsData[this.jsSelect].name 名称 默认state启用true， this.updateRowId为更新的id
        console.log('更新', qxs)
        this.getJs()
      }
    },
    clickmenu (index, item) {
      console.log(index)
      if (this.isUpdate) {
        return
      }
      this.jsSelect = index
      this.pagesJs = JSON.parse(JSON.stringify(this.initOagesJs))
      // item.qx进行判断选择情况
      this.checkboxIschecked(item.juridsds)
      let option = document.getElementsByClassName('options')
      for (let i = 0; i < option.length; i++) {
        option[i].style.display = 'none'
      }
    },
    getAllJurisds () {
      this.loading = true
      this.$api.getAllJurisds().then(resp => {
        if (resp.status !== 200) {
          this.$message({message: '出错了', type: 'error'})
        } else {
          this.pagesJs = this.mkTree(resp.data.jurisds)
          this.pagesJs.map((item) => {
            let childrenGropy = {childrenGropy: this.chunk(item.children, 4), showGroupDiv: false}
            Object.assign(item, childrenGropy)
          })
          this.initOagesJs = JSON.parse(JSON.stringify(this.pagesJs))
          // 获取角色
          this.getJs()
        }
      }).catch(e => {
        this.$message({message: '出错了' + e, type: 'error'})
      })
    },
    getJs () {
      this.loading = true
      this.$api.getJurisdsGroup().then(reps => {
        this.loading = false
        if (reps.status !== 200) {
          this.$message({message: '出错了', type: 'error'})
        } else {
          this.jsData = reps.data.UserJurisds
          if (this.jsData) {
            this.jsData.map(menuitme => {
              Object.assign(menuitme, {add: false, bianji: false})
            })
            this.clickmenu(this.jsSelect, this.jsData[this.jsSelect])
          }
        }
      }).catch(e => {
        console.log(e)
        this.loading = false
        this.$message({message: '系统出错了', type: 'error'})
      })
    },
    // 显示3级菜单
    showOptions (divid, group, indexs) {
      if (this.optionsSelect === divid + '' + indexs) {
        this.optionsSelect = 80
      } else {
        this.optionsSelect = divid + '' + indexs
      }
      this.options = group.children
      if (this.indexNum === 100) {
        document.getElementById(divid).style.display = 'block'
      } else if (document.getElementById(divid).style.display === 'none') {
        let option = document.getElementsByClassName('options')
        for (let i = 0; i < option.length; i++) {
          option[i].style.display = 'none'
        }
        document.getElementById(divid).style.display = 'block'
      } else if (document.getElementById(divid).style.display === 'block' && this.indexNum === indexs) {
        let option = document.getElementsByClassName('options')
        for (let i = 0; i < option.length; i++) {
          option[i].style.display = 'none'
        }
      }
      this.indexNum = indexs
    },
    // 选择一个标签下的所有
    checkedAll (event, pages) {
      pages.childrenGropy.map(child => {
        child.map(childs => {
          childs.checked = event
          if (childs.children) {
            childs.children.map(option => {
              option.checked = event
            })
          }
        })
      })
    },
    // 选择一个标签
    changeSelect (divId, pages, group, indexs) {
      this.optionsSelect = divId + '' + indexs
      if (group.checked) {
        if (group.children) {
          group.children.map(item => {
            item.checked = true
          })
        }
      } else {
        pages.checked = false
        if (group.children) {
          group.children.map(item => {
            item.checked = false
          })
        }
      }
      let type = 0
      pages.childrenGropy.map(page => {
        page.map(p => {
          if (p.checked) {
            type++
          }
        })
      })
      if (type === 0) {
        pages.checked = false
      } else if (type > 0) {
        pages.checked = true
      }
      this.options = group.children
      let option = document.getElementsByClassName('options')
      for (let i = 0; i < option.length; i++) {
        option[i].style.display = 'none'
      }
      document.getElementById(divId).style.display = 'block'
    },
    // 选择3级一个标签
    changeMenu (event, pages, childrenGropy, options) {
      let number = 0
      childrenGropy.map(i => {
        if (i.children) {
          i.children.map(j => {
            if (j.name === options.name) {
              let num = 0
              i.children.map(k => {
                if (k.checked === true) {
                  num++
                }
              })
              if (num > 0) {
                i.checked = true
              } else {
                i.checked = false
                pages.checked = false
              }
            }
          })
        }
      })
      pages.childrenGropy.map(itme => {
        itme.map(a => {
          if (a.checked) {
            number++
          }
        })
      })
      if (number > 0) {
        pages.checked = true
      }
    },
    // 数据回填选中checkbox
    checkboxIschecked (itmes) {
      itmes.map(item => {
        this.pagesJs.map(js => {
          if (item === js.mkid) {
            js.checked = true
          }
          js.childrenGropy.map(groups => {
            groups.map(group => {
              if (item === group.mkid) {
                group.checked = true
              }
              if (group.children) {
                group.children.map(citme => {
                  if (item === citme.mkid) {
                    citme.checked = true
                  }
                })
              }
            })
          })
        })
      })
    },
    // 一下为树组成，和分组
    chunk (arr, len) {
      len = parseInt(len)
      let groups = []
      if (len <= 1 || arr.length < len) {
        groups.push(arr)
        return groups
      }
      let loop = Math.ceil(arr.length / len)
      for (var i = 0; i < loop; i++) {
        groups.push(arr.slice(len * i, len * (i + 1)))
      }
      return groups
    },
    mkTree (data) {
      let deleteids = []
      let changeids = []
      data.map(item => {
        item.pid = item.mkid.substring(0, item.mkid.length - 2)
        if (item.mkid && item.mkid.length === 8) {
          let type = 0
          if (deleteids.length > 0) {
            deleteids.map(id => {
              if (id === item.mkid.substring(0, 4)) {
                type++
              }
            })
          }
          if (type === 0) {
            deleteids.push(item.mkid.substring(0, 4))
          }
        }
      })
      data.map((item, index) => {
        deleteids.map(deleteid => {
          if (item.mkid === deleteid) {
            changeids.push(item.mkid)
            data.splice(index, 1)
          }
        })
      })
      data.map((item, index) => {
        changeids.map(changeid => {
          if (item.pid === changeid) {
            item.pid = item.mkid.substring(0, 2)
          }
        })
      })
      var rst = []
      data.map(item => {
        item.name = item.mkname
        item.checked = false
        if (item.pid === '') {
          item.iconFontClass = {open: 'iconfont icon-xialasanjiaoxia', close: 'iconfont icon-xialasanjiaozuo'}
          item.expand = false
          item.path = item.url
          rst.push(item)
        }
      })
      rst.map(item => {
        this.listtotree(data, item.pid)
      })
      return rst
    },
    listtotree (data, pid) {
      var result = []
      var temp
      data.map(item => {
        if (item.pid === pid) {
          temp = this.listtotree(data, item.mkid)
          if (temp.length > 0) {
            item.children = temp
          }
          if (item.pid !== '') {
            item.path = item.url
            item.iconFontClass = item.img
          }
          result.push(item)
        }
      })
      return result
    }
  },
  mounted () {
    let h = ($('.js-layout')[0].offsetHeight)
    $('.js-scrollbar').css('height', h - 50 + 'px')
    $('.mks-scrollbar').css('height', h - 50 + 'px')

    this.getAllJurisds()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .js-layout{
    border-top: 1px solid rgba(00, 00, 00, 0.1);
    box-shadow: 0px 1px 1px 0px rgba(00, 00, 00, 0.3);
  }
  .js-scrollbar ul li{
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding-left: 10px;
    position: relative;
    cursor: pointer;
  &:hover{
     background-color: #f5f6fa;
  .caozuo{display: inline;}
  }
  .jinyong{
    color: #8c93a6;
  }
  .caozuo{
    display: none;
    position: absolute;
    right: 15px;
  i{color: #4c84ff}
  }
  }
  .js-scrollbar ul li.select{
    background-color: #f5f6fa;
  .caozuo{display: inline;}
  }
  .js-scrollbar ul li .el-input {
    position: absolute;height: 30px;border: none;
    padding-left: 10px;
    font-size: 12px;
    font-family: 宋体;
    width: 65%;
  .el-input__inner{
    height: 30px;border: none;
  }
  }
  .js-mk-layout{
    margin-left: 10px;
    width: calc(100% - 10px);
    height:100%;
    border-top: 1px solid rgba(00, 00, 00, 0.1);
    box-shadow: 0px 1px 1px 0px rgba(00, 00, 00, 0.3);
  }
  .js_check{
    height: 44px;
    line-height: 44px;
    .el-checkbox__input.is-disabled+.el-checkbox__label{
      color: inherit !important;
    }
  }
</style>
