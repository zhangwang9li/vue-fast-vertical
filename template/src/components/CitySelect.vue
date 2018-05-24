/**
* Created by zhanghao on 2018/1/24.
*/
<template>
  <div style="position: relative">
    <span style="width: 40px;line-height: 28px;padding-left: 20px" v-show="labelShow">城市</span>
    <div class="" :style="labelShow?'width: calc(100% - 55px);':'width:100%;'" style="float: right;margin-left: 5px">
      <el-input style="width: 100%" clearable :readonly="true" placeholder="搜索" size="small" :class="labelShow?'input-yuan':''" v-model="treeInputValue" @focus="city_floatShow"></el-input>
    </div>
    <div class="city-select-float" v-show="city_float" style="">
      <div style="margin: 10px 10px 0px">
        <div class="rmcs">
          <div style="margin-bottom: 6px">
            <span>热门城市</span>
          </div>
          <i style="border-bottom: 1px solid #edeef0; width: calc(100% - 20px);height: 1px;position: absolute;"></i>
          <ul>
            <li v-for="(rmcs, index) in rm_shi" :key="index+''" @click="selectShi(rmcs)">\{{rmcs}}</li>
          </ul>
        </div>
        <div class="tabmain">
          <div class="tabmain-tab" style="">
            <el-row>
              <el-col :span="12" style="text-align: center">
                <el-button type="text" size="small" :class="showcityDiv? 'buttonselect': 'buttonunselect'" @click="showcityDiv=true">
                  按省份
                </el-button>
              </el-col>
              <!--<i style="border-right: 1px solid #edeef0; width: 1px;height: 12px;position: absolute;left: 82px;top: 9px"></i>-->
              <el-col :span="12" style="text-align: center">
                <el-button type="text" size="small" :class="!showcityDiv? 'buttonselect': 'buttonunselect'" @click="showcityDiv=false">
                  按城市
                </el-button>
              </el-col>
            </el-row>
          </div>
          <div v-show="showcityDiv" class="sheng-tabs"  style="position: relative">
            <div class="sheng-tabs-bar" style="border-bottom: 1px solid #edeef0">
              <ul>
                <li v-for="(shenGtoup, index) in shenGtoupList" :id="'shen_' + index" :class="shenselect_li===index?'shen_select':'shen_unselect'" :key="index + ''" @click="changeTranslateX(index)">
                  \{{shenGtoup.label}}
                </li>
              </ul>
              <div class="shen-active-bar" :style="'width: '+ translateWidth +'px;transform: translateX('+ translateX +'px);'"></div>
            </div>
            <table style="" class="sheng-cont">
              <tr v-for="(shenList, index) in shenGtoupList[shenselect_li].child" :key="index">
                <td class="shenjp" style="">
                  <template v-if="(index>0&&shenGtoupList[shenselect_li].child[index-1].shenjp === shenList.shenjp)">
                  </template>
                  <template v-else="">
                    \{{shenList.shenjp}}
                  </template>
                </td>
                <td class="shen-name" @click="selectShen(shenList)">\{{shenList.shenname}}</td>
                <td class="shen-shi">
                  <ul>
                    <li v-for="(shi,index) in shenList.shi" :key="index+''" @click="selectShi(shi)">\{{shi}}</li>
                  </ul>
                </td>
              </tr>
            </table>
          </div>
          <div v-show="!showcityDiv" class="sheng-tabs" style="position: relative">
            <div class="sheng-tabs-bar" style="border-bottom: 1px solid #edeef0">
              <ul>
                <li style="padding: 0 5px" v-for="(shiGtoup, index) in shiGroupList" :id="'shi_' + index" :class="shiselect_li===index?'shen_select':'shen_unselect'" :key="index + ''" @click="changeShiTranslateX(index)">
                  \{{shiGtoup.label}}
                </li>
              </ul>
              <div class="shen-active-bar" :style="'width: '+ shitranslateWidth +'px;transform: translateX('+ shitranslateX +'px);'"></div>
            </div>
            <table style="" class="sheng-cont">
              <tr v-for="(shiList, index) in shiGroupList[shiselect_li].child" :key="index">
                <td class="shenjp" style="">
                  <template v-if="(index>0&&shiGroupList[shiselect_li].child[index-1].shenjp === shiList.shenjp)">
                  </template>
                  <template v-else="">
                    \{{shiList.shenjp}}
                  </template>
                </td>
                <td class="shen-shi">
                  <ul>
                    <li v-for="(shi,index) in shiList.shi" :key="index+''" @click="selectShi(shi)">\{{shi}}</li>
                  </ul>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    labelShow: {
      type: Boolean, default: true
    },
    model: {
      type: String, default: ''
    }
  },
  components: {},
  data () {
    return {
      treeInputValue: '',
      city_float: false,
      showcityDiv: true,
      shenselect_li: 0,
      translateX: 0,
      translateWidth: 40,
      shiselect_li: 0,
      shitranslateX: 0,
      shitranslateWidth: 40,
      rm_shi: ['北京', '上海', '广州', '深圳', '成都', '天津', '南京', '杭州', '武汉', '重庆'],
      shenGtoupList: [
        {
          label: 'AFG',
          child: [{
            shenjp: 'A',
            shenname: '安徽',
            shi: ['安徽', '安徽1', '安徽', '安徽1', '安徽', '安徽1', '安徽', '安徽1', '安徽', '安徽1', '安徽', '安徽1', '安徽', '安徽1']
          }, {shenjp: 'A', shenname: '安徽2', shi: ['安徽22', '安徽21']}, {shenjp: 'F', shenname: '安徽f', shi: ['安徽f', '安徽f']}]
        },
        {
          label: 'HJ',
          child: [{shenjp: 'H', shenname: '安徽', shi: ['安徽', '安徽1']}, {
            shenjp: 'A',
            shenname: '安徽2',
            shi: ['安徽22', '安徽21']
          }, {shenjp: 'F', shenname: '安徽f', shi: ['安徽f', '安徽f']}]
        },
        {
          label: 'LN',
          child: [{shenjp: 'L', shenname: '安徽', shi: ['安徽', '安徽1']}, {
            shenjp: 'A',
            shenname: '安徽2',
            shi: ['安徽22', '安徽21']
          }, {shenjp: 'F', shenname: '安徽f', shi: ['安徽f', '安徽f']}]
        },
        {
          label: 'QST',
          child: [{shenjp: 'Q', shenname: '安徽', shi: ['安徽', '安徽1']}, {
            shenjp: 'A',
            shenname: '安徽2',
            shi: ['安徽22', '安徽21']
          }, {shenjp: 'F', shenname: '安徽f', shi: ['安徽f', '安徽f']}]
        },
        {
          label: 'XYZ',
          child: [{shenjp: 'X', shenname: '安徽', shi: ['安徽', '安徽1']}, {
            shenjp: 'A',
            shenname: '安徽2',
            shi: ['安徽22', '安徽21']
          }, {shenjp: 'F', shenname: '安徽f', shi: ['安徽f', '安徽f']}]
        },
        {label: '其他', child: [{shenjp: '其他', shenname: '', shi: ['香港', '澳门']}]}
      ],
      shiGroupList: [
        {
          label: 'ABCD',
          child: [{shenjp: 'A', shi: ['澳门', '澳门', '澳门', '澳门', '澳门', '澳门', '澳门', '澳门']}, {
            shenjp: 'B',
            shi: ['澳门', '澳门', '澳门', '澳门', '澳门', '澳门', '澳门', '澳门']
          }, {shenjp: 'C', shi: ['澳门', '澳门', '澳门', '澳门', '澳门', '澳门', '澳门', '澳门']}]
        },
        {label: 'EFGH', child: []},
        {label: 'IJKL', child: []},
        {label: 'MNOPQ', child: []},
        {label: 'RSTUV', child: []},
        {label: 'WXYZ', child: []}
      ]
    }
  },
  methods: {
    changeTranslateX (index) {
      this.shenselect_li = index
      this.translateX = $('#' + 'shen_' + index)[0].offsetLeft - $('#' + 'shen_' + index)[0].offsetWidth / 4 + 10
      this.translateWidth = $('#' + 'shen_' + index)[0].offsetWidth
    },
    changeShiTranslateX (index) {
      this.shiselect_li = index
      this.shitranslateX = $('#' + 'shi_' + index)[0].offsetLeft - $('#' + 'shi_' + index)[0].offsetWidth / 4 + 10
      this.shitranslateWidth = $('#' + 'shi_' + index)[0].offsetWidth
    },
    selectShen (shen) {
      console.log(shen)
      this.treeInputValue = shen.shenname
      this.$emit('citySelect', shen.shenname)
      this.city_float = false
    },
    selectShi (shi) {
      console.log(shi)
      this.treeInputValue = shi
      this.$emit('citySelect', shi)
      this.city_float = false
    },
    city_floatShow (event) {
      this.city_float = true
      setTimeout(() => {
        this.changeTranslateX(0)
      }, 200)
    }
  },
  mounted () {
    this.treeInputValue = this.model
    window.setTimeout(() => {
      document.addEventListener('click', (event) => {
        var e = event || window.event // 浏览器兼容性
        var elem = e.target || e.srcElement
        let ischick = false
        while (elem) { // 循环判断至跟节点，防止点击的是div子元素
          if (elem.className && elem.className === 'city-select-float') {
            ischick = true
            return
          }
          if ((elem.className && elem.className === 'el-input__inner') || (elem.className && elem.className === 'el-input__suffix')) {
            ischick = true
            return
          }
          elem = elem.parentNode
        }
        this.city_float = ischick
        document.removeEventListener('click', () => {
        }, false)
      }, false)
    }, 1000)
  },
  watch: {
    model: {
      handler (curVal, oldVal) {
        console.log(1111, curVal)
        this.treeInputValue = curVal
      },
      deep: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .city-select-float{
    position: absolute;
    width: 270px;
    background-color: #fff;
    left:50px;
    top: 28px;
    z-index:10000;border: 1px solid #edeef0;
    font-size: 12px!important;
    font-family: 宋体!important;
    line-height: normal!important;
  }
  .rmcs ul>li{
    list-style: none;
    float: left;
    padding: 15px 15px 0px 0px;
    cursor: pointer;
    line-height: normal!important;
  &:hover{
     color: #4c84ff;
   }
  }
  .sheng-tabs .sheng-tabs-bar ul>li {
    list-style: none;
    display: inline;
    height: 20px;
    line-height: 20px;
    padding: 0 10px;
    cursor: pointer;
  }
  .sheng-tabs .sheng-tabs-bar ul>li.shen_unselect{
    color: #19233c;
  }
  .sheng-tabs .sheng-tabs-bar ul>li.shen_select{
    color: #4c84ff;
  }
  .shen-active-bar{
    position: absolute;
    top: 20px;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: #409eff;
    z-index: 1;
    transition: transform .3s cubic-bezier(.645,.045,.355,1);
    list-style: none;
  }
  .sheng-cont{
    min-height: 60px;
  tr{
  }
  td{
    vertical-align: top;
    padding-top: 12px;
  }
  .shenjp{
    font-size: 14px;
    color: #8c93a6;
    font-family: 微软雅黑;
  }
  .shen-name{
    width: 40px;
    font-size: 12px;
    line-height: 18px;
    text-align: right;
    cursor: pointer;
  &:hover{color: #4c84ff}
  }
  .shen-shi{
    font-size: 12px;
    line-height: 18px;
    padding-left: 6px;
  ul>li{
    display: inline-block;
    list-style: none;
    padding: 0 15px 8px 0;
    cursor: pointer;
  &:hover{color: #4c84ff}
  }
  }
  }
  .city-select-float .tabmain-tab{
    display: inline-block;
    width: 120px;
    height: 24px;
    border: 1px solid #edeef0;
    border-radius: 3px;
    margin-top: 15px;
  }
  .city-select-float .tabmain-tab .el-button.buttonselect{
    height: 22px;
    line-height: 22px;
  @extend .tab-buttonselect
  }
  .city-select-float .tabmain-tab .el-button.buttonunselect{
    height: 22px;
    line-height: 22px;
  @extend .tab-buttonunselect
  }
  .tab-buttonselect{
    padding: 0px!important;
    width: 100%!important;
    color: #8c93a6!important;
    background-color: #f5f6fa!important;
  }
  .tab-buttonunselect{
    padding: 0px!important;
    width: 100%!important;
    background-color: #fff!important;
    color: #19233c!important;
  }
</style>
