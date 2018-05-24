/**
* Created by zhanghao on 2017/8/19.
*   使用 import hdVideo from '../../components/HdVideo.vue'
*   hdVideo :videoUrl="zhi" :videotype="zhi" :show="true"
*/
<template>
  <div >
    <video :id="id" controls autoplay poster="" style="max-width: 300px;max-height: 400px;min-width: 150px;min-height: 150px;position: absolute;top: 0;bottom: 0;left: 0;right: 0;margin: auto;">
    </video>
  </div>
</template>

<script>
import flv from 'flv.js'
export default {
  components: {},
  props: {
    videoUrl: {
      type: String
    },
    videotype: {
      type: String
    },
    show: {
      type: Boolean
    }
  },
  data () {
    return {
      showVideo: false,
      flvPlayer: null,
      id: ''
    }
  },
  methods: {
    close () {
      this.showVideo = !this.showVideo
      this.flvPlayer.pause()
      this.flvPlayer.unload()
      this.flvPlayer.detachMediaElement()
      this.flvPlayer.destroy()
      this.flvPlayer = null
      this.flvPlayer.$emit('close', false)
    }
  },
  created () {
    this.id = 'videoElement_' + config.uuid(2, 16)
  },
  mounted () {
    this.showVideo = this.show
    if (flv.isSupported()) {
      var videoElement = $('#' + this.id)[0]
      console.log($('#' + this.id))
      console.log(videoElement)
      this.flvPlayer = flv.createPlayer({
        // type: 'mp4',
        // url: 'http://vjs.zencdn.net/v/oceans.mp4'
        type: this.videotype,
        url: this.videoUrl
      })
      this.flvPlayer.attachMediaElement(videoElement)
      this.flvPlayer.load()
      this.flvPlayer.play()
    }
  },
  watch: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
