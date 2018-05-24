/**
 * Created by zhanghao on 2018/4/3.
 */
<template>
  <div class="layout-div" >
    <el-amap vid="amapDemo" ref="map" :center="center" :map-manager="amapManager" :zoom="zoom" :events="events" :plugin="plugins"
             style="width: 100%;height: 100%;position: relative">
      <el-amap-marker v-for="(marker, index) in markers" :key="index"
                      :position="marker.position" :events="marker.events" :template="marker.template">
      </el-amap-marker>
      <el-amap-polyline :editable="polyline.editable" :path="polyline.path" :events="polyline.events" :strokeWeight="polyline.strokeWeight" :strokeColor="polyline.strokeColor" :lineJoin="polyline.lineJoin"></el-amap-polyline>

      <el-amap-info-window v-for="(window, index) in infoWindows" :key="index" :position="window.position" :visible="window.visible">
        <div class="ssjk-map-info" v-show="window.visible">
          asdasdasdasdasdasd
        </div>
      </el-amap-info-window>
    </el-amap>
  </div>
</template>

<script>
import { AMapManager } from 'vue-amap'
export default {
  components: {},
  data () {
    return {
      amapManager: new AMapManager(),
      zoom: 5,
      center: [116.29, 31.197646],
      events: {
        init: (map) => {
          console.log(this.$refs.map.$$getInstance())
          this.mouseTool = new AMap.MouseTool(this.$refs.map.$$getInstance())
          this.trafficLayer = new AMap.TileLayer.Traffic({
            zIndex: 4
          })
          this.trafficLayer.setMap(map)
          this.trafficLayer.hide()
        },
        'click': (e) => {
          console.log('this.$refs.map.$$getInstance()', this.$refs.map)
        }
      },
      plugins: [
        {pName: 'Geolocation', buttonPosition: 'RB', liteStyle: false, autoPosition: false, events: {init (o) { o.getCurrentPosition((status, result) => { if (result && result.position) {} }) }}}
      ],
      polyline: {
        path: [[112.43, 23.55], [112.33, 23.15], [112.63, 22.15], [112.13, 23.35], [112.73, 23.55], [112.53, 23.75]],
        events: {
          click (e) {
            console.log(e)
            alert('click polyline')
          },
          end: (e) => {
            let newPath = e.target.getPath().map(point => [point.lng, point.lat])
            console.log(newPath)
          }
        },
        lineJoin: 'round',
        editable: false,
        strokeWeight: '5',
        strokeColor: '#40FF69'
      },
      markers: [],
      infoWindows: [],
      showingInfowindowsIndex: -1,
      markdata: [
        {name: '京N125D', iconSkin: 'zc', longitude: 112.23, latitude: 23.15},
        {name: '京N125D', iconSkin: 'zc', longitude: 112.33, latitude: 23.22},
        {name: '京N125D', iconSkin: 'zc', longitude: 112.43, latitude: 23.18},
        {name: '京N125D', iconSkin: 'zc', longitude: 112.53, latitude: 23.32},
        {name: '京N125D', iconSkin: 'zc', longitude: 112.73, latitude: 23.62},
        {name: '京N125D', iconSkin: 'zc', longitude: 112.13, latitude: 23.10}
      ]
    }
  },
  methods: {
    getMarkerWindows (list) {
      this.markers = []
      list.map((item, index) => {
        let imgurl = ''
        if (item.iconSkin === 'zc') {
          imgurl = './static/img/right.png'
        } else if (item.iconSkin === 'bj') {
          imgurl = './static/img/jb.png'
        } else if (item.iconSkin === 'yw') {
          imgurl = './static/img/wh.png'
        } else {
          imgurl = './static/img/p.png'
        }
        let s = `<div class="map-marker-div"><img src="${imgurl}" alt="" style=""></div>`
        let a = {
          key: item.plateNumber,
          position: [item.longitude, item.latitude],
          value: item,
          events: {
            init: (o) => {
            },
            click: () => {
              this.infoWindows.map(window => {
                window.visible = false
              })
              this.showingInfowindowsIndex = -1
              this.$nextTick(() => {
                this.showingInfowindowsIndex = index
                this.infoWindows[index].visible = true
              })
            }
          },
          template: `${s}`
        }
        this.markers.push(a)
        this.infoWindows.push({
          key: item.plateNumber,
          value: item,
          position: [item.longitude, item.latitude],
          visible: false
        })
      })
    }
  },
  mounted () {
    this.getMarkerWindows(this.markdata)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.map-marker-div{
  top: 12px;
  position: absolute;
  left: -2px;
}
</style>
