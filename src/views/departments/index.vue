<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <TreeTooles :tree-node="company" :is-root="false" @addDept="addDept" />
        <!-- 树形组件 -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 插槽内容，有多少节点，就循环多少次 -->
          <TreeTooles slot-scope="{data}" :tree-node="data" @addDept="addDept" @editDept="editDept" @delDepts="getDepartments" />
        </el-tree>
      </el-card>
      <AddDepts ref="addDepts" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" />
    </div>
  </div>
</template>

<script>
import TreeTooles from './components/tree-tooles.vue'
import { getDepartments } from '@/api/departments'
import { transListToTreeData } from '@/utils'
import AddDepts from './components/add-dept.vue'
export default {
  components: {
    TreeTooles, AddDepts
  },
  data() {
    return {
      company: { name: '********有限公司', manager: '负责人', id: '' },
      departs: [],
      defaultProps: { label: 'name', children: 'children' },
      showDialog: false,
      node: null
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const reslut = await getDepartments()
      this.departs = transListToTreeData(reslut.depts, '')
    },
    addDept(node) {
      this.showDialog = true
      this.node = node
    },
    editDept(node) {
      this.showDialog = true
      this.node = node
      this.$refs.addDepts.getDepartDetail(node.id)
    }
  }

}
</script>

<style>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
