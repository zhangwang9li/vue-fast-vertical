/**
 * Created by zhanghao on 2018/4/3.
 */
<template>
  <div class="layout-div" >
    <el-amap vid="amapDemo" ref="map" :center="center" :map-manager="amapManager" :zoom="zoom" :events="events" :plugin="plugins"
             style="width: 100%;height: 100%;position: relative">
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
          this.initData(this.gjlist)
        },
        'click': (e) => {
          console.log('this.$refs.map.$$getInstance()', this.$refs.map)
        }
      },
      plugins: [
        {pName: 'Geolocation', buttonPosition: 'RB', liteStyle: false, autoPosition: false, events: {init (o) {o.getCurrentPosition((status, result) => {if (result && result.position) {}})}}}
      ],
      navg: null,
      gjlist: [
        [100.340417, 27.376994],
        [108.426354, 37.827452],
        [113.392174, 31.208439],
        [124.905846, 42.232876]
      ]
    }
  },
  methods: {
    initData (list) {
      if (list.length === 0) { return }
      AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], (PathSimplifier, $) => {
        if (!PathSimplifier.supportCanvas) {
          alert('当前环境不支持 Canvas！')
          return
        }

        this.pathSimplifierIns = new PathSimplifier({
          zIndex: 100,
          autoSetFitView: true,
          map: this.$refs.map.$$getInstance(), // 所属的地图实例

          getPath: (pathData, pathIndex) => { // 注意：此处为坐标点的转化
            var lnglatList = []
            console.log('pathData', pathData.points.length)
            pathData.points.map((item, index) => {
              lnglatList.push([item[0], item[1]])
            })
            return lnglatList
          },
          getHoverTitle: (pathData, pathIndex, pointIndex) => {
//              if (pointIndex >= 0) {
//                return pathData.name + '，' + pathData.points[pointIndex].name
//              }
//              return pathData.name + '，点数量' + pathData.points.length
          },
          renderOptions: {
            pathLineStyle: {
              dirArrowStyle: true
            },
            getPathStyle: (pathItem, zoom) => {
              return {
                pathLineStyle: {
                  strokeStyle: '#316ddb',
                  lineWidth: 5
                },
                pathLineSelectedStyle: {
                  lineWidth: 5 + 2
                },
                pathNavigatorStyle: {
                  fillStyle: '#6ae0b0'
                }
              }
            },
            renderAllPointsIfNumberBelow: 100 // 绘制路线节点，如不需要可设置为-1
          }
        })

        window.pathSimplifierIns = this.pathSimplifierIns
        // initRoutesContainer(d);
        this.pathSimplifierIns.setData([{points: list, name: 'xxxxx'}])

        this.navg = this.pathSimplifierIns.createPathNavigator(0, {
          loop: true,
          speed: 100000,
          pathNavigatorStyle: {
            width: 32,
            height: 32,
            // 使用图片
            content: PathSimplifier.Render.Canvas.getImageContent('./static/img/guiji.png', () => { this.pathSimplifierIns.renderLater() }, (e) => { console.log(e) })
//              strokeStyle: null,
//              fillStyle: null,
//              // 经过路径的样式
//              pathLinePassedStyle: {
//                lineWidth: 3,
//                strokeStyle: 'black',
//                dirArrowStyle: {
//                  stepSpace: 15,
//                  strokeStyle: 'red'
//                }
//              }
          }
        })
        this.navg.start()
      })
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
