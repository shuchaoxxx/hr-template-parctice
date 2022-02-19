<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools>
        <template v-slot:after>

          <el-button type="primary" size="small" @click="addPermission(1,'0')">
            <i class="el-icon-plus" style="margin-right:10px" />添加权限</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <el-table :data="list" row-key="id" border="">
        <el-table-column label="名称" prop="name" />
        <el-table-column label="标识" prop="code" />
        <el-table-column label="描述" prop="description" />
        <el-table-column label="操作" align="center">
          <template v-slot="{ row }">
            <!-- 添加按钮只在 访问权限的层级显示 当 type=1时才显示，当type=2时不显示 -->
            <el-button v-if="row.type === 1" type="text" @click="addPermission(2, row.id)">添加</el-button>
            <el-button type="text" @click="updatePermission(row.id)">编辑</el-button>
            <el-button type="text" @click="delPermission(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增弹层 -->
      <el-dialog :visible="showDialog" :title="showText" @close="btnCancel">
        <el-form ref="permForm" :model="formData" :rules="rules" label-width="120px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="formData.name" style="width:90%" />
          </el-form-item>
          <el-form-item label="标识" prop="code">
            <el-input v-model="formData.code" style="width:90%" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="formData.description" style="width:90%" />
          </el-form-item>
          <el-form-item label="开启">
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
              style="width:90%"
            />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button type="primary" size="small" @click="btnOk">确定</el-button>
            <el-button size="small" @click="btnCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import { getPermissionList, addPermission, updatePermission, delPermission, getPermissionDetail } from '@/api/permission'
import { transListToTreeData } from '@/utils'
export default {
  data() {
    return {
      list: [],
      showDialog: false,
      formData: {
        name: '',
        code: '',
        description: '',
        type: '',
        pid: '',
        enVisible: '0'
      },
      rules: {
        name: [{ required: true, message: '名称为必填项。', trigger: 'blur' }],
        code: [{ required: true, message: '标识为必填项。', trigger: 'blur' }] }
    }
  },
  computed: {
    showText() {
      return this.formData.id ? '修改权限' : '添加权限'
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      this.list = transListToTreeData(await getPermissionList(), '0')
    },
    async delPermission(id) {
      try {
        await this.$confirm('您确认删除该权限吗?')
        await delPermission(id)
        this.$message.success('删除成功')
        this.getPermissionList() // 重新拉取数据
      } catch (error) {
        console.log(error)
      }
    },
    addPermission(type, pid) {
      // 页面访问权限type = 1 按钮操作权 type = 2
      // pid表示当前节点的父节点标识
      this.formData.type = type
      this.formData.pid = pid
      this.showDialog = true
    },
    async updatePermission(id) {
      this.formData = await getPermissionDetail(id)
      this.showDialog = true
    },
    btnOk() {
      this.$refs.permForm.validate(async isOk => {
        if (isOk) {
          if (this.formData.id) {
            await updatePermission(this.formData)
          } else {
            await addPermission(this.formData)
          }
          await this.getPermissionList()
          this.$message.success('操作成功')
          this.showDialog = false
        }
      })
    },
    btnCancel() {
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      }
      this.$refs.permForm.resetFields()
      this.showDialog = false
    }
  }
}
</script>

<style>

</style>
