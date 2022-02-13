<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="true">
        <span slot="before">共{{ page.total }}条记录</span>
        <template slot="after">
          <el-button size="small" type="success">Excel导入</el-button>
          <el-button size="small" type="danger">Excel导出</el-button>
          <el-button size="small" type="primary" @click="showDialog = true">新增员工</el-button>
        </template>
      </PageTools>
      <el-card v-loading="loading">
        <el-table border :data="list">
          <el-table-column label="序号" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="电话" sortable="" prop="mobile" />
          <el-table-column label="聘用形式" sortable="" :formatter="formatEmployment" prop="formOfEmployment" />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <!-- 表格的样式修改，使用作用域插槽+过滤器来做-->
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <template v-slot="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template v-slot="{ row }">
              <el-switch :value="row.enableState === 1 " />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280px">
            <template v-slot="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="deleteRole(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="center" align="middle" style="height:60px">
          <el-pagination :current-page="page.page" :page-size="page.size" :total="page.total" layout="prev, pager,next" @current-change="changePage" />
        </el-row>
      </el-card>
      <!-- 新增员工组件 -->
      <AddEmployee :show-dialog.sync="showDialog" />
    </div>
  </div>
</template>

<script>
import { getEmployeeList, deleteRole } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import AddEmployee from './components/add-employee'
export default {
  components: { AddEmployee },
  data() {
    return {
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0
      },
      loading: false,
      showDialog: false
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      debugger
      this.loading = true
      const { total, rows } = await getEmployeeList(this.page)
      debugger
      this.page.total = total
      this.list = rows
      this.loading = false
    },
    changePage(newPage) {
      this.page.page = newPage
      this.getEmployeeList() // 重新拉取数据
    },
    formatEmployment(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    async deleteRole(id) {
      try {
        await this.$confirm('您确认删除该员工吗?')
        await deleteRole(id)
        this.getEmployeeList()
        this.$message.success('删除角色成功!')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
