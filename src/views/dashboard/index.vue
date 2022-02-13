<template>
  <div class="dashboard-container">
    <div class="dashboard-text">首页</div>
    <PageTools :show-before="true">
      <el-button slot="before">导出excel</el-button>
      <el-button slot="after">导入excel</el-button>
    </PageTools>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { IsCheckTimeOut } from '@/utils/request'

export default {
  name: 'Dashboard',
  components: {},
  computed: {
    ...mapGetters([
      'name'
    ])
  },

  methods: {
    IsCheckTimeOut() {
      IsCheckTimeOut()
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
