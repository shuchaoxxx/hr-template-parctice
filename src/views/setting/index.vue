<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <el-row>
              <el-button type="primary" icon="el-icon-plus" size="small" @click="showDialog = true">添加角色</el-button>
            </el-row>
            <el-table border="" style="margin-top:20px" :data="list">
              <el-table-column align="center" type="index" label="序号" width="120px" />
              <el-table-column prop="name" label="角色名称" width="240px" />
              <el-table-column prop="description" label="描述" />
              <el-table-column align="center" label="操作">
                <template slot-scope="{ row }">
                  <el-button size="small" type="success" @click="assignPerm(row.id)">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRole(row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="deleteRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="center" align="middle" style="height:60px">
              <el-pagination
                :current-page="page.page"
                :page-size="page.pagesize"
                :total="page.total"
                layout="prev, pager, next"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新,将使得公司资料被重新审核,请谨慎修改"
              type="info"
              show-icon
              :closable="false"
              style="margin-top:25px"
            />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input v-model="formData.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="formData.companyPhone" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formData.remarks" type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>

      <!-- 弹层 -->
      <el-dialog title="编辑弹层" :visible="showDialog" @close="btnCancel">
        <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name" />
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="roleForm.description" />
          </el-form-item>
        </el-form>
        <el-row type="flex" justify="center">
          <el-col :span="6">
            <el-button type="primary" @click="btnOk">  确认</el-button>
            <el-button @click="btnCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
      <!-- 角色分配权限弹层 -->
      <el-dialog title="权限分配" :visible="showPermDialog" @close="btnPermCancel">
        <!-- :check-strictly="true" 父子是否互相关联 -->
        <el-tree
          ref="permTree"
          :data="permData"
          :props="defaultProps"
          :show-checkbox="true"
          :check-strictly="true"
          :default-expand-all="true"
          :default-checked-keys="selectCheck"
          node-key="id"
        />
        <template v-slot:footer>
          <el-row type="flex" justify="center">
            <el-col :span="6">
              <el-button size="small" type="primary" @click="btnPermOK">确定</el-button>
              <el-button size="small" @click="btnPermCancel">取消</el-button>
            </el-col>
          </el-row>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo, deleteRole, getRoleDteail, updateRole, addRole, assignPerm } from '@/api/setting'
import { mapGetters } from 'vuex'
import { getPermissionList } from '@/api/permission'

import { transListToTreeData } from '@/utils'
export default {
  data() {
    return {
      list: [],
      page: {
        page: 1,
        pagesize: 10,
        total: 0
      },
      formData: {},
      showDialog: false,
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: { required: true, message: '角色名称为必填项!', trigger: 'blur' }
      },
      showPermDialog: false,
      permData: {},
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      roleId: null, // 用来记录当前分配权限的id
      // 下面这个数据虽然能绑定给 el-tree 可以展示出来 但是el-tree的数据修改后并不能回写给selectCheck。
      // el-tree有专门获取被选中的方法。
      selectCheck: []
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    async getRoleList() {
      const { total, rows } = await getRoleList(this.page)
      this.page.total = total
      this.list = rows
    },
    changePage(newPage) {
      this.page.page = newPage
      this.getRoleList()
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    },
    async deleteRole(id) {
      try {
        // $confirm是异步的函数，注意配合使用await、async或then来接受。
        await this.$confirm('您确认删除该角色吗?')
        await deleteRole(id)
        this.getRoleList() // 删除后 重新从后台拉取数据
        this.$message.success('删除角色成功。')
      } catch (error) {
        console.log(error)
      }
    },
    async editRole(id) {
      this.roleForm = await getRoleDteail(id) // 先获取完数据再弹出层，防止闪动
      this.showDialog = true
    },
    async btnOk() {
      try {
        await this.$refs.roleForm.validate()
        if (this.roleForm.id) {
          await updateRole(this.roleForm)
        } else {
          // 新增
          await addRole(this.roleForm)
        }
        this.getRoleList()
        this.showDialog = false
        this.$message.success('操作成功!')
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel() {
      this.$refs.roleForm.resetFields()
      this.roleForm = {
        name: '',
        description: ''
      }
      this.showDialog = false
    },
    async assignPerm(id) {
      this.permData = transListToTreeData(await getPermissionList(), '0')
      this.roleId = id
      // 使用上面的id进行对应权限点查询
      const { permIds } = await getRoleDteail(id)
      this.selectCheck = permIds
      this.showPermDialog = true
    },

    async btnPermOK() {
      await assignPerm({ permIds: this.$refs.permTree.getCheckedKeys(), id: this.roleId })
      this.$message.success('分配权限成功!')
      this.showPermDialog = false
    },
    btnPermCancel() {
      this.selectCheck = [] // 重置数据
      this.showPermDialog = false
    }
  }

}
</script>

<style>

</style>
