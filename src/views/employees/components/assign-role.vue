<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="btnCancel">
    <el-checkbox-group v-model="roleIds">
      <!-- 默认情况下label是存储值也是显示值 -->
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <template slot="footer">
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="small" @click="btnOK">确定</el-button>
          <el-button size="small" @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: true
    },
    userId: {
      type: String,
      default: null,
      require: true
    }
  },
  data() {
    return {
      list: [], // 负责存储当前所有的角色id
      roleIds: [] // 这个数组负责存储，当前用户所拥有的角色id
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows } = await getRoleList({ page: 1, pagesize: 20 })
      this.list = rows
    },
    // 父组件调用子组件的方法
    // 此处使用this.userId拿不到值，因为props传值是异步的，所以可以直接传入一个id
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id)
      this.roleIds = roleIds
    },
    async btnOK() {
      await assignRoles({ id: this.userId, roleIds: this.roleIds })
      this.$emit('update:showRoleDialog', false)
    },
    btnCancel() {
      this.roleIds = [] // 取消时重置数组，在重新打开页面时，会重新渲染角色
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>

<style>

</style>
