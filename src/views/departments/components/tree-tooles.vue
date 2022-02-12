<template>
  <el-row type="flex" justify="space-between" align="middle" style="height:40px;width:100%">
    <el-col>{{ treeNode.name }}</el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown @command="operateDepts">
            <span>操作
              <i class="el-icon-arrow-down" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
  props: {
    treeNode: {
      required: true,
      type: Object
    },
    isRoot: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    async operateDepts(type) {
      if (type === 'add') {
        // 添加子部门
        this.$emit('addDept', this.treeNode)
      } else if (type === 'edit') {
        // 编辑子部门
      } else {
        // 删除子部门
        this.$confirm('您确认要删除该部门吗?').then(() => {
          return delDepartments(this.treeNode.id)
        }).then(() => {
          // 自定义事件，通知父组件重新获取数据
          this.$emit('delDepts')
          this.$message.success('删除部门成功。')
        })
      }
    }
  }

}
</script>

<style>

</style>
