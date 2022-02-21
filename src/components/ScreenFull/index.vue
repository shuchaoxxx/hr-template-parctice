<template>
  <div>
    <svg-icon icon-class="fullscreen" style="color:#fff;width:20px;height:20px" @click="changeScreenFull" />
  </div>
</template>

<script>
import ScreenFull from 'screenfull'
export default {
  methods: {
    changeScreenFull() {
      if (!ScreenFull.isEnabled) {
        this.$message.warning('此时全屏组件不可用')
      }
      ScreenFull.toggle()
    }
  }
}
</script>

<style>

</style>
