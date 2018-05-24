<template>
  <div>
    <div id="calendar-inupt" ref="calendars" style="position: relative;font-size: 14px;display: inline-block;" @click="openByDrop($event)" >
      <i class="el-icon-date calendar-icon"></i>
      <input class="calendar-input" type="text" v-model="iDisplay" :placeholder="placeholder" readonly>
    </div>
    <transition name="fade">
      <div class="calendar-dropdown" :style="{'left':left+'px','top':top+'px'}" v-if="divShow">
        <div class="calendar-tools">
                <span class="calendar-prev" @click="prev">
                    <svg width="20" height="20" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg"
                         xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g class="transform-group">
                        <g transform="scale(0.015625, 0.015625)">
                            <path
                              d="M671.968 912c-12.288 0-24.576-4.672-33.952-14.048L286.048 545.984c-18.752-18.72-18.752-49.12 0-67.872l351.968-352c18.752-18.752 49.12-18.752 67.872 0 18.752 18.72 18.752 49.12 0 67.872l-318.016 318.048 318.016 318.016c18.752 18.752 18.752 49.12 0 67.872C696.544 907.328 684.256 912 671.968 912z"
                              fill="#5e7a88"></path>
                        </g>
                    </g>
                    </svg>
                </span>
          <span class="calendar-next" @click="next">
                    <svg width="20" height="20" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg"
                         xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g class="transform-group">
                        <g transform="scale(0.015625, 0.015625)">
                            <path
                              d="M761.056 532.128c0.512-0.992 1.344-1.824 1.792-2.848 8.8-18.304 5.92-40.704-9.664-55.424L399.936 139.744c-19.264-18.208-49.632-17.344-67.872 1.888-18.208 19.264-17.376 49.632 1.888 67.872l316.96 299.84-315.712 304.288c-19.072 18.4-19.648 48.768-1.248 67.872 9.408 9.792 21.984 14.688 34.56 14.688 12 0 24-4.48 33.312-13.44l350.048-337.376c0.672-0.672 0.928-1.6 1.6-2.304 0.512-0.48 1.056-0.832 1.568-1.344C757.76 538.88 759.2 535.392 761.056 532.128z"
                              fill="#5e7a88"></path>
                        </g>
                    </g>
                    </svg>
                </span>
          <div class="calendar-info">
            <!--  -->
            <span>\{{year}}</span>
            <span v-for="(m,index) in months" :key="index" v-if="index ===month">\{{m}}</span>
          </div>
        </div>
        <div class="calendar">
          <div style="margin: auto 20px">
            <table cellpadding="5">
              <thead>
              <tr>
                <td v-for="(week,index) in weeks" :key="index" class="week">\{{week}}</td>
              </tr>
              </thead>
              <tr v-for="(day,k1) in days" :key="k1">
                <td v-for="(child,k2) in day" :class="{'selected':child.selected,'disabled':child.disabled}"
                    @click="select(k1,k2,$event)" :key="k2">
                  <input v-if="isCheckBoxShow" style="position: absolute;left: 0;" type="checkbox" disabled :checked="child.selected">
                  <span :class="{'red':k2==0||k2==6||((child.isLunarFestival||child.isGregorianFestival) && lunar)}">\{{child.day}}</span>
                  <div class="text"
                       :class="{'isLunarFestival':child.isLunarFestival,'isGregorianFestival':child.isGregorianFestival}"
                       v-if="lunar">\{{child.lunar}}
                  </div>
                </td>
              </tr>
            </table>
            <div style="text-align: center;padding-bottom: 10px">
              <el-button type="text" @click="divShow=false" class="qu_xiao" size="small" style="">取消</el-button>
              <el-button size="small" @click="confirm()" class="bao_cun" style="margin-left: 16px">确定</el-button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
/* eslint-disable */
import calendar from '../../static/calendar.js'
export default {
  name: 'calendar',
  props: {
    placeholder: {
      type: String,
      default: '请选择日期'
    },
    display: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    begin: {
      type: Array,
      default: function () {
        return []
      }
    },
    end: {
      type: Array,
      default: function () {
        return []
      }
    },
    range: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    },
    isCheckBoxShow: {
      type: Boolean,
      default: false
    },
    zero: {
      type: Boolean,
      default: true
    },
    lunar: {
      type: Boolean,
      default: false
    },
    weeks: {
      type: Array,
      default: function () {
        return window.navigator.language.toLowerCase() === 'zh-cn' ? ['日', '一', '二', '三', '四', '五', '六'] : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      }
    },
    months: {
      type: Array,
      default: function () {
        return window.navigator.language.toLowerCase() === 'zh-cn' ? ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'] : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      }
    }
  },
  data() {
    return {
      divShow: false,
      iDisplay: '',
      value: [],
      checkBoxValue: [],
      year: 0,
      month: 0,
      day: 0,
      days: [],
      today: [],
      festival: {
        lunar: {
          '1-1': '春节',
          '1-15': '元宵节',
          '2-2': '龙头节',
          '5-5': '端午节',
          '7-7': '七夕节',
          '7-15': '中元节',
          '8-15': '中秋节',
          '9-9': '重阳节',
          '10-1': '寒衣节',
          '10-15': '下元节',
          '12-8': '腊八节',
          '12-23': '祭灶节'
        },
        gregorian: {
          '1-1': '元旦',
          '2-14': '情人节',
          '3-8': '妇女节',
          '3-12': '植树节',
          '4-5': '清明节',
          '5-1': '劳动节',
          '5-4': '青年节',
          '6-1': '儿童节',
          '7-1': '建党节',
          '8-1': '建军节',
          '9-10': '教师节',
          '10-1': '国庆节',
          '12-24': '平安夜',
          '12-25': '圣诞节'
        }
      },
      rangeBegin: [],
      rangeEnd: []
    }
  },
  mounted() {
    if (this.isCheckBoxShow) {
      this.value = this.date.split(';')[0].split('-')
    } else {
      this.value = this.date.split('-')
    }
    this.iDisplay = this.date
    this.init()
    window.setTimeout(() => {
      document.addEventListener('click', (event) => {
        var e = event || window.event // 浏览器兼容性
        var elem = e.target || e.srcElement
        while (elem) { // 循环判断至跟节点，防止点击的是div子元素
          if (elem.class && elem.class === 'calendar-dropdown' || elem.id && elem.id === 'calendar-inupt') {
            return
          }
          elem = elem.parentNode
        }
        this.divShow = false
        if (!this.iDisplay) {
          this.checkBoxValue = []
        } else {
          this.checkBoxValue = []
          this.iDisplay.split(';').map((val) => {
            if (val) {
              var a = val.split('-')
              this.checkBoxValue.push(a)
            }
          })
        }
        document.removeEventListener('click', () => {
        }, false)
      }, false)
    }, 1000)
  },
  methods: {
    // 初始化一些东西
    init() {
      this.divShow = this.show
      let now = new Date()
      // 没有默认值
      this.year = now.getFullYear()
      this.month = now.getMonth()
      this.day = now.getDate()
      console.log('init', this.value.length > 0)
      if (this.value.length > 0) {
        if (this.range) {
          this.year = parseInt(this.value[0][0])
          this.month = parseInt(this.value[0][1]) - 1
          this.day = parseInt(this.value[0][2])

          let year2 = parseInt(this.value[1][0])
          let month2 = parseInt(this.value[1][1]) - 1
          let day2 = parseInt(this.value[1][2])

          this.rangeBegin = [this.year, this.month, this.day]
          this.rangeEnd = [year2, month2, day2]
          // console.log(this.month,this.rangeBegin,this.rangeEnd)
        } else {
          this.year = parseInt(this.value[0])
          this.month = parseInt(this.value[1]) - 1
          this.day = parseInt(this.value[2])
        }
      }
      this.render(this.year, this.month)
    },
    // 渲染日期
    render(y, m) {
      let firstDayOfMonth = new Date(y, m, 1).getDay()         // 当月第一天
      let lastDateOfMonth = new Date(y, m + 1, 0).getDate()    // 当月最后一天
      let lastDayOfLastMonth = new Date(y, m, 0).getDate()     // 最后一月的最后一天
      this.year = y
      let seletSplit = this.value
      let selectCheckSplit = this.checkBoxValue
      let i = 0
      let line = 0
      let temp = []
      for (i = 1; i <= lastDateOfMonth; i++) {
        let dow = new Date(y, m, i).getDay()
        let k
        // 第一行
        if (dow === 0) {
          temp[line] = []
        } else if (i === 1) {
          temp[line] = []
          k = lastDayOfLastMonth - firstDayOfMonth + 1
          for (let j = 0; j < firstDayOfMonth; j++) {
            // console.log("第一行",lunarYear,lunarMonth,lunarValue,lunarInfo)
            temp[line].push(Object.assign(
              {day: k, disabled: true},
              this.getLunarInfo(this.month === 0 ? this.year - 1 : this.year, this.month === 0 ? 12 : this.month, k)
            ))
            k++
          }
        }

        // 范围
        if (this.range) {
          // console.log("日期范围",this.getLunarInfo(this.year,this.month+1,i))
          let options = Object.assign({day: i}, this.getLunarInfo(this.year, this.month + 1, i))
          if (this.rangeBegin.length > 0) {
            let beginTime = Number(new Date(this.rangeBegin[0], this.rangeBegin[1], this.rangeBegin[2]))
            let endTime = Number(new Date(this.rangeEnd[0], this.rangeEnd[1], this.rangeEnd[2]))
            let stepTime = Number(new Date(this.year, this.month, i))
            if (beginTime <= stepTime && endTime >= stepTime) {
              options.selected = true
            }
          }
          if (this.begin.length > 0) {
            let beginTime = Number(new Date(parseInt(this.begin[0]), parseInt(this.begin[1]) - 1, parseInt(this.begin[2])))
            if (beginTime > Number(new Date(this.year, this.month, i))) options.disabled = true
          }
          if (this.end.length > 0) {
            let endTime = Number(new Date(parseInt(this.end[0]), parseInt(this.end[1]) - 1, parseInt(this.end[2])))
            if (endTime < Number(new Date(this.year, this.month, i))) options.disabled = true
          }
          temp[line].push(options)
        } else {
          let chk = new Date()
          let chkY = chk.getFullYear()
          let chkM = chk.getMonth()
          if (this.isCheckBoxShow) {
            let options = Object.assign({day: i, selected: false}, this.getLunarInfo(this.year, this.month + 1, i))
            if (this.begin.length > 0) {
              let beginTime = Number(new Date(parseInt(this.begin[0]), parseInt(this.begin[1]) - 1, parseInt(this.begin[2])))
              if (beginTime > Number(new Date(this.year, this.month, i))) options.disabled = true
            }
            if (this.end.length > 0) {
              let endTime = Number(new Date(parseInt(this.end[0]), parseInt(this.end[1]) - 1, parseInt(this.end[2])))
              if (endTime < Number(new Date(this.year, this.month, i))) options.disabled = true
            }
            temp[line].push(options)
            if (selectCheckSplit.length > 0) {
              selectCheckSplit.map((val, index) => {
                if (parseInt(val[0]) === this.year && parseInt(val[1]) - 1 === this.month && parseInt(val[2]) === i) {
                  // console.log("匹配上次选中的日期",lunarYear,lunarMonth,lunarValue,lunarInfo)
                  temp[line].map((obj) => {
                    if (obj.day === i) {
                      obj.selected = true
                    }
                  })
                }
              })
            }
          } else {
            // 匹配上次选中的日期
            if (parseInt(seletSplit[0]) === this.year && parseInt(seletSplit[1]) - 1 === this.month && parseInt(seletSplit[2]) === i) {
              // console.log("匹配上次选中的日期",lunarYear,lunarMonth,lunarValue,lunarInfo)
              temp[line].push(Object.assign(
                {day: i, selected: true},
                this.getLunarInfo(this.year, this.month + 1, i)
              ))
              this.today = [line, temp[line].length - 1]
            } else if (chkY === this.year && chkM === this.month && i === this.day && this.value === '') { // 没有默认值的时候显示选中今天日期
              // console.log("今天",lunarYear,lunarMonth,lunarValue,lunarInfo)
              temp[line].push(Object.assign(
                {day: i, selected: true},
                this.getLunarInfo(this.year, this.month + 1, i)
              ))
              this.today = [line, temp[line].length - 1]
            } else {
              // 普通日期
              // console.log("设置可选范围",i,lunarYear,lunarMonth,lunarValue,lunarInfo)
              let options = Object.assign({day: i, selected: false}, this.getLunarInfo(this.year, this.month + 1, i))
              if (this.begin.length > 0) {
                let beginTime = Number(new Date(parseInt(this.begin[0]), parseInt(this.begin[1]) - 1, parseInt(this.begin[2])))
                if (beginTime > Number(new Date(this.year, this.month, i))) options.disabled = true
              }
              if (this.end.length > 0) {
                let endTime = Number(new Date(parseInt(this.end[0]), parseInt(this.end[1]) - 1, parseInt(this.end[2])))
                if (endTime < Number(new Date(this.year, this.month, i))) options.disabled = true
              }
              temp[line].push(options)
            }
          }
        }
        // 最后一行
        if (dow === 6) {
          line++
        } else if (i === lastDateOfMonth) {
          let k = 1
          for (dow; dow < 6; dow++) {
            // console.log("最后一行",lunarYear,lunarMonth,lunarValue,lunarInfo)
            temp[line].push(Object.assign(
              {day: k, disabled: true},
              this.getLunarInfo(this.month + 2 > 11 ? this.year + 1 : this.year, this.month + 2 > 11 ? 1 : this.month + 2, k)
            ))
            k++
          }
        }
      } // end for
      this.days = temp
      this.chengedsize()
    },
    // 获取农历信息
    getLunarInfo(y, m, d) {
      let lunarInfo = calendar.solar2lunar(y, m, d)
      let lunarValue = lunarInfo.IDayCn
      // console.log(lunarInfo)
      let isLunarFestival = false
      let isGregorianFestival = false
      if (this.festival.lunar[lunarInfo.lMonth + '-' + lunarInfo.lDay] !== undefined) {
        lunarValue = this.festival.lunar[lunarInfo.lMonth + '-' + lunarInfo.lDay]
        isLunarFestival = true
      } else if (this.festival.gregorian[m + '-' + d] !== undefined) {
        lunarValue = this.festival.gregorian[m + '-' + d]
        isGregorianFestival = true
      }
      return {
        lunar: lunarValue,
        isLunarFestival: isLunarFestival,
        isGregorianFestival: isGregorianFestival
      }
    },
    // 上月
    prev(e) {
      e.stopPropagation()
      if (this.month === 0) {
        this.month = 11
        this.year = parseInt(this.year) - 1
      } else {
        this.month = parseInt(this.month) - 1
      }
      this.render(this.year, this.month)
    },
    //  下月
    next(e) {
      e.stopPropagation()
      if (this.month === 11) {
        this.month = 0
        this.year = parseInt(this.year) + 1
      } else {
        this.month = parseInt(this.month) + 1
      }
      this.render(this.year, this.month)
    },
    // 选中日期
    select(k1, k2, e) {
      if (e !== undefined) e.stopPropagation()
      // 日期范围
      if (this.range) {
        if (this.rangeBegin.length === 0 || this.rangeEndTemp !== 0) {
          this.rangeBegin = [this.year, this.month, this.days[k1][k2].day]
          this.rangeBeginTemp = this.rangeBegin
          this.rangeEnd = [this.year, this.month, this.days[k1][k2].day]
          this.rangeEndTemp = 0
        } else {
          this.rangeEnd = [this.year, this.month, this.days[k1][k2].day]
          this.rangeEndTemp = 1
          // 判断结束日期小于开始日期则自动颠倒过来
          if (+new Date(this.rangeEnd[0], this.rangeEnd[1], this.rangeEnd[2]) < +new Date(this.rangeBegin[0], this.rangeBegin[1], this.rangeBegin[2])) {
            this.rangeBegin = this.rangeEnd
            this.rangeEnd = this.rangeBeginTemp
          }
          // 小于10左边打补丁
          let begin = []
          let end = []
          if (this.zero) {
            this.rangeBegin.forEach((v, k) => {
              if (k === 1) v = v + 1
              begin.push(this.zeroPad(v))
            })
            this.rangeEnd.forEach((v, k) => {
              if (k === 1) v = v + 1
              end.push(this.zeroPad(v))
            })
          } else {
            begin = this.rangeBegin
            end = this.rangeEnd
          }
          // console.log("选中日期",begin,end)
          this.$emit('select', begin, end)
        }
        this.render(this.year, this.month)
      } else {
        if (this.isCheckBoxShow) {
          this.days[k1][k2].selected = true
          this.day = this.days[k1][k2].day
          this.today = [k1, k2]
          var a = [this.year, this.zero ? this.zeroPad(this.month + 1) : this.month + 1, this.zero ? this.zeroPad(this.days[k1][k2].day) : this.days[k1][k2].day]
          console.log(a)
          console.log(a.toString())
          let delectIndex = -1
          this.checkBoxValue.map((val, index) => {
            if (val.toString() === a.toString()) {
              delectIndex = index
            }
          })
          if (delectIndex === -1) {
            this.checkBoxValue.push(a)
          } else {
            if (this.days[k1][k2].selected) {
              this.days[k1][k2].selected = false
            }
            this.checkBoxValue.splice(delectIndex, 1)
          }
          console.log('xuanz', this.checkBoxValue)
//            this.$emit('select', this.checkBoxValue)
        } else {
          // 取消上次选中
          if (this.today.length > 0) {
            this.days.forEach(v => {
              v.forEach(vv => {
                vv.selected = false
              })
            })
          }
          // 设置当前选中天
          this.days[k1][k2].selected = true
          this.day = this.days[k1][k2].day
          this.today = [k1, k2]
          let dt = [this.year, this.zero ? this.zeroPad(this.month + 1) : this.month + 1, this.zero ? this.zeroPad(this.days[k1][k2].day) : this.days[k1][k2].day]
          this.iDisplay = dt.join('-')
          this.$emit('select', this.iDisplay)
        }
      }
    },
    // 日期补零
    zeroPad(n) {
      return String(n < 10 ? '0' + n : n)
    },
    openByDrop() {
      if (this.isCheckBoxShow) {
        if (this.date) {
          this.value = this.date.split(';')[0].split('-')
        } else {
          this.value = []
        }
      } else {
        if (this.date) {
          this.value = this.date.split('-')
        } else {
          this.value = []
        }
      }
      this.iDisplay = this.date
      this.init()
      this.divShow = true
      this.render(this.year, this.month)
    },
    confirm() {
      this.divShow = false
      if (this.isCheckBoxShow) {
        let inputValue = ''
        if (this.checkBoxValue.length > 0) {
          this.checkBoxValue.map((val) => {
            inputValue += val.join('-') + ';'
          })
        }
        this.iDisplay = inputValue
      } else {
//          console.log(this.value)
      }
      this.$emit('select', this.iDisplay)
    },
    chengedsize() {
      this.left = this.$refs.calendars.offsetLeft
      if (window.screen.height - this.getpos(this.$refs.calendars) < 372) {
        if (this.days.length === 5) {
          this.top = this.$refs.calendars.offsetTop - 372 + 44
        } else {
          this.top = this.$refs.calendars.offsetTop - 372
        }
      } else {
        this.top = this.$refs.calendars.offsetTop + this.$refs.calendars.offsetHeight
      }
    },
    getpos(obj) {
      var oParent
      var oTop = obj.offsetTop
      while (obj.offsetParent !== null) {
        oParent = obj.offsetParent
        oTop += oParent.offsetTop
        obj = oParent
      }
      return oTop
    }
  }
}
</script>

<style scoped>
  .calendar-input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    display: inline-block;
    font-size: inherit;
    height: 30px;
    line-height: 1;
    outline: none;
    padding: 3px 0px;
    padding-right: 36px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
  .calendar-icon{
    position: absolute;
    width: 30px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    color: #bfcbd9;
    right: 0;
    top: 0;
  }
  .calendar {
    margin: auto;
    width: 100%;
    min-width: 256px;
    background: #fff;
    font-family: "PingFang SC", "Hiragino Sans GB", "STHeiti", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    user-select: none;
  }

  .calendar-tools {
    height: 40px;
    font-size: 20px;
    line-height: 40px;
    color: #5e7a88;
    font-family: "PingFang SC", "Hiragino Sans GB", "STHeiti", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  }

  .calendar-tools span {
    cursor: pointer;
  }

  .calendar-prev {
    width: 14.28571429%;
    float: left;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  .calendar-info {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
  }

  .calendar-info > div.month {
    float: right;
    margin: auto;
    height: 20px;
    width: 100px;
    text-align: center;
    color: #5e7a88;
    overflow: hidden;
    position: relative;
  }

  .calendar-info > div.month .month-inner {
    position: absolute;
    left: 0;
    top: 0;
    height: 240px;
    transition: top .5s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  .calendar-info > div.month .month-inner > span {
    display: block;
    height: 20px;
    width: 100px;
    text-align: center;
  }

  .calendar-info > div.year {
    font-size: 10px;
    line-height: 1;
    color: #999;
  }

  .calendar-next {
    width: 14.28571429%;
    float: right;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  .calendar table {
    clear: both;
    width: 100%;
    border-collapse: collapse;
    color: #444444;
  }

  .calendar td {
    margin: 2px !important;
    padding: 0px 0;
    width: 14.28571429%;
    height: 44px;
    text-align: center;
    vertical-align: middle;
    font-size: 14px;
    line-height: 125%;
    cursor: pointer;
    position: relative;
    vertical-align: top;
  }

  .calendar td.week {
    font-size: 10px;
    pointer-events: none !important;
    cursor: default !important;
  }

  .calendar td.disabled {
    color: #ccc;
    visibility:hidden;
    pointer-events: none !important;
    cursor: default !important;
  }

  .calendar td.disabled div {
    color: #ccc;
  }

  .calendar td span {
    display: block;
    max-width: 40px;
    height: 36px;
    font-size: 12px;
    line-height: 36px;
    margin: 0px auto;
    border-radius: 2px;
  }

  .calendar td:not(.selected) span:not(.red):hover {
    background: #f3f8fa;
    color: #444;
  }

  .calendar td:not(.selected) span.red:hover {
    background: #f9efef;
  }

  .calendar td:not(.disabled) span.red {
    color: #ea6151;
  }

  .calendar td.selected span {
    background-color: #00a2fd;
    color: #fff;
  }

  .calendar td .text {
    position: absolute;
    top: 28px;
    left: 0;
    width: 40px;
    text-align: center;
    border-radius: 2px;
    padding: 2px;
    font-size: 8px;
    line-height: 1.2;
    color: #444;
  }

  .calendar td .isGregorianFestival,
  .calendar td .isLunarFestival {
    color: #ea6151;
  }

  .calendar td.selected span.red {
    background-color: #ea6151;
    color: #fff;
  }

  .calendar td.selected span.red:hover {
    background-color: #ea6151;
    color: #fff;
  }

  .calendar thead td {
    text-transform: uppercase;
    height: 30px;
    vertical-align: middle;
  }

  .calendar-button {
    text-align: center;
  }

  .calendar-button span {
    cursor: pointer;
    display: inline-block;
    min-height: 1em;
    min-width: 5em;
    vertical-align: baseline;
    background: #5e7a88;
    color: #fff;
    margin: 0 .25em 0 0;
    padding: .6em 2em;
    font-size: 1em;
    line-height: 1em;
    text-align: center;
    border-radius: .3em;
  }

  .calendar-button span.cancel {
    background: #efefef;
    color: #666;
  }


  /*下拉框*/
  .calendar-dropdown{
    position: absolute;
    min-width: 322px;
    left:0;
    top:0;
    border: 1px solid #eee;
    border-radius: 2px;
    color: #48576a;
    box-shadow: 0 2px 6px #ccc;
    background: #fff;
    line-height: 20px;
    /*margin: 5px 0;*/
    z-index: 9999;
  }
  /*.calendar-dropdown:before {*/
  /*position: absolute;*/
  /*left:30px;*/
  /*top: -10px;*/
  /*content: "";*/
  /*border:5px solid rgba(0, 0, 0, 0);*/
  /*border-bottom-color: #DEDEDE;*/
  /*}*/
  /*.calendar-dropdown:after {*/
  /*position: absolute;*/
  /*left:30px;*/
  /*top: -9px;*/
  /*content: "";*/
  /*border:5px solid rgba(0, 0, 0, 0);*/
  /*border-bottom-color: #fff;*/
  /*}*/
</style>
