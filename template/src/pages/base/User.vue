/**
 * Created by zhanghao on 2018/3/29.
 */
<template>
  <VerticalLayout hHeightOpen="36px" fHeightOpen="40px">
    <div slot="header" class="layout-div" >
      <div style="position: absolute;right: 15px;line-height: 36px">
        <el-input class="input-yuan" v-model="queryForm.name" placeholder="快速查询" style="width: 200px;display: inline-block">
          <i slot="suffix" class="el-icon-search"></i>
        </el-input>
        <el-button class="cha-xun zdy-button qu_xiao" @click="isShowQueryForm=!isShowQueryForm">
          <template v-if="!isShowQueryForm">高级查询</template>
          <template v-if="isShowQueryForm">隐藏查询</template>
        </el-button>
        <el-button class="zdy-button qu_xiao" @click="addFormShow">添加</el-button>
        <el-button class="zdy-button qu_xiao">导出</el-button>
      </div>
      <div v-show="isShowQueryForm" class="query-from-div" style="">
        <el-form class="query-from" v-model="queryForm" :inline="true">
          <el-form-item label="名称">
            <el-input v-model="queryForm.name" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="queryForm.age" placeholder="年龄"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="zdy-button qu_xiao" @click="onSeach">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="layout-div" style="padding: 10px 0 0 0;height:calc(100% - 10px);">
      <div class="layout-div data-list-cont-table">
        <el-table :data="tableData" row-class-name="eltable-row" stripe style="width: 100%" :height="tableHeight" :max-height="tableHeight" v-loading="tableLoading">
          <el-table-column align="center"  label="操作" width="66">
            <template slot-scope="scope">
              <span  style="cursor: pointer;color: #4c84ff" @click="seeDetail(scope.row)"><i class="el-icon-document"></i></span>
              <span  style="cursor: pointer;color: #4c84ff" @click="deleteSubmit(scope.row)"><i class="el-icon-error"></i></span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="phone" label="电话" width="180">
          </el-table-column>
          <el-table-column prop="birth" label="生日"></el-table-column>
        </el-table>
      </div>
    </div>
    <div slot="footer" class="layout-div" style="text-align: center;position: absolute;top: 6px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"
                     :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" :total="sizeTotal">
      </el-pagination>
    </div>
    <el-dialog class="data-dialog el-updata-div" title="添加用户信息" :visible.sync="showDetail" width="720px" @close="dialogClose">
      <el-form :inline="true" :model="userForm" class="form-twoline" ref="userForm" :rules="userFormRules" v-loading="dialogLoading">
        <div class="form-twoline-row">
          <div class="first-column">
            <el-form-item class="formitem" label="姓名" prop="name">
              <el-input size="small" v-model.trim="userForm.name" placeholder="姓名"></el-input>
            </el-form-item>
          </div>
          <div class="blank-column"></div>
          <div class="two-column">
            <el-form-item class="formitem" label="电话" prop="phone">
              <el-input size="small" v-model.trim="userForm.phone" placeholder="电话"></el-input>
            </el-form-item>
          </div>
        </div>
        <div style="text-align: center;padding: 10px">
          <el-button size="small" @click="restForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
          <el-button size="small" v-if="isadd" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit">保存</el-button>
          <el-button size="small" v-if="!isadd" type="primary" class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
  </VerticalLayout>
</template>

<script>
import HorizontalLayout from '../../components/HorizontalLayout.vue'
import VerticalLayout from '../../components/VerticalLayout.vue'
export default {
  components: {VerticalLayout, HorizontalLayout},
  data () {
    return {
      isShowQueryForm: false,
      tableLoading: false,
      currentPage: 1,
      pageSizes: config.pageSizes,
      pageSize: config.pageSize,
      queryForm: {
        name: '',
        age: '',
        currentPage: 1,
        pageSize: config.pageSize
      },
      sizeTotal: 0,
      tableHeight: 100,
      tableData: [],
      showDetail: false,
      dialogLoading: false,
      isadd: true,
      submitLoading: false,
      userForm: {
        name: ''
      },
      userFormRules: {
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.currentPage = 1
      this.queryForm.pageSize = this.pageSize
      this.queryForm.currentPage = this.currentPage
      this.onSeach()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.queryForm.pageSize = this.pageSize
      this.queryForm.currentPage = this.currentPage
      this.onSeach()
    },
    onSeach () {
      this.tableLoading = true
      this.$api.userPageList(this.queryForm).then(resp => {
        this.tableLoading = false
        if (resp.status !== 200) {
          this.$message({message: '出错了', type: 'error'})
        } else {
          this.sizeTotal = resp.data.total
          this.tableData = resp.data.users
        }
      }).catch(e => {
        this.tableLoading = false
        console.log(e)
      })
    },
    addFormShow () {
      this.isadd = true
      this.showDetail = true
    },
    dialogClose () {
      this.restForm()
    },
    seeDetail (row) {
      this.isadd = false
      this.showDetail = true
      this.dialogLoading = true
      this.$api.userDetails(row.id).then(resp => {
        this.userForm = resp.data.user
        console.log(this.userForm)
        this.dialogLoading = false
      }).catch(e => {
        this.dialogLoading = false
        console.log(e)
      })
    },
    deleteSubmit (row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        confirmButtonClass: 'dialog-button bao_cun',
        cancelButtonText: '取消',
        cancelButtonClass: 'dialog-button qu_xiao',
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.$api.userDelect(row.id).then(resp => {
          if (resp.status !== 200) {
            this.loading = false
            this.$message({message: '删除失败，请稍后再试', type: 'error'})
          } else {
            if (resp.data) {
              this.$message({type: 'success', message: '删除成功!'})
              this.onSeach()
            } else {
              this.loading = false
              this.$message({message: '删除失败，请稍后再试', type: 'error'})
            }
          }
        }).catch(e => {
          this.loading = false
          console.log(e)
        })
      }).catch(() => {
        this.$message({type: 'info', message: '已取消删除'})
      })
    },
    restForm () {
      this.$refs.userForm.resetFields()
      this.showDetail = false
      this.dialogLoading = false
    },
    addSubmit () {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          this.$api.userAdd(this.userForm).then(resp => {
            this.submitLoading = false
            if (resp.status !== 200) {
              this.$message({message: '出错了', type: 'error'})
            } else {
              if (resp.data) {
                this.$message({message: '修改成功', type: 'success'})
                this.restForm()
                this.onSeach()
              } else {
                this.$message({message: '修改异常，请稍后再试', type: 'error'})
              }
            }
            console.log(resp)
          }).catch(e => {
            this.submitLoading = false
            console.log(e)
          })
        } else {
        }
      })
    },
    updateSubmit () {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          this.$api.userUpdate(this.userForm).then(resp => {
            this.submitLoading = false
            if (resp.status !== 200) {
              this.$message({message: '出错了', type: 'error'})
            } else {
              if (resp.data) {
                this.$message({message: '修改成功', type: 'success'})
                this.restForm()
                this.onSeach()
              } else {
                this.$message({message: '修改异常，请稍后再试', type: 'error'})
              }
            }
            console.log(resp)
          }).catch(e => {
            this.submitLoading = false
            console.log(e)
          })
        } else {
        }
      })
    }
  },
  mounted () {
    this.tableHeight = $('.data-list-cont-table')[0].offsetHeight
    this.onSeach()
    document.onkeydown = (e) => {
      if (e.keyCode === 13) {
        if (!this.isShowQueryForm) {
          this.currentPage = 1
          this.queryForm.pageSize = this.pageSize
          this.queryForm.currentPage = this.currentPage
          this.onSeach()
        }
      }
    }
    window.setTimeout(() => {
      document.addEventListener('click', (event) => {
        var e = event || window.event // 浏览器兼容性
        var elem = e.target || e.srcElement
        let ischick = false
        while (elem) { // 循环判断至跟节点，防止点击的是div子元素
          if (elem.className && elem.className === 'query-from-div') {
            ischick = true
            return
          }
          if ((elem.className && elem.className.indexOf('cha-xun') >= 0)) {
            ischick = true
            return
          }
          elem = elem.parentNode
        }
        if (!ischick) {
          this.isShowQueryForm = false
        }
        document.removeEventListener('click', () => {
        }, false)
      }, false)
    }, 100)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
