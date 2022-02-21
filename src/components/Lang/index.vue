<template>
  <div>
    <div v-if="this.$i18n.locale === 'en'" @click="changeLuange('zh')">
      <span style="color:#fff; font-size:14px;padding-right:5px">切换成中文</span>
      <svg-icon icon-class="language" style="color:#fff;font-size:20px" />
    </div>
    <div v-else @click="changeLuange('en')">
      <span style="color:#fff;font-size:14px;padding-right:5px">切换成英文</span>
      <svg-icon icon-class="language" style="color:#fff;font-size:20px" /></div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  methods: {
    changeLuange(type) {
      Cookie.set('langee', type)
      this.$i18n.locale = type
      this.$message.success('语言切换成功')
    }
  }

}
</script>

<style>

</style>
