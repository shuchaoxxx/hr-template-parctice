<template>
  <!-- 弹层 -->
  <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form ref="deptForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" type="textarea" placeholder="1-300个字符" :rows="3" />
      </el-form-item></el-form>
    <!-- 确定和取消按钮 -->
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" type="primary" @click="btnOK">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments, addDepartments, getDepartDetail, updateDepartments } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    const checkNameRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      let isRepat = null
      if (this.formData.id) {
        // 通过pid相同，找到所有的同级部门，通过id排除自己
        isRepat = depts.filter(item => this.formData.pid === item.pid && item.id !== this.formData.id).some(item => item.name === value)
      } else {
        isRepat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      }

      isRepat ? callback(new Error(`同级部门下已经存在${value}部门了`)) : callback()
    }
    const checkCodeRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      let isRepeat = null
      if (this.formData.id) {
        isRepeat = depts.some(item => item.id !== this.formData.id && item.code === value && value)
      } else {
        isRepeat = depts.some(item => item.code === value && value)
      }

      isRepeat ? callback(new Error(`组织架构下已经存在${value}编码了`)) : callback()
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [{ required: true, message: '部门名称为必填项!', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称为1~50字符!' },
          { validator: checkNameRepeat, trigger: 'blur' }],
        code: [{ required: true, message: '部门编码为必填项!', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码为1~50字符!' }, {
            validator: checkCodeRepeat, trigger: 'blur' }],
        manager: [{ required: true, message: '部门负责人为必填项!', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍为必填项!', trigger: 'blur' },
          { min: 1, max: 50, message: '部门介绍为1~300字符!', trigger: 'blur' }]
      },
      peoples: []
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增子部门'
    }
  },
  methods: {
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple()
    },
    async getDepartDetail(id) {
      this.formData = await getDepartDetail(id)
      // this.formData = await getDepartDetail(this.treeNode.id)  不能使用该方法传值，因为pros传值是异步的
    },
    btnOK() {
      this.$refs.deptForm.validate(async isOK => {
        if (isOK) {
          if (this.formData.id) {
            await updateDepartments(this.formData)
          } else {
            await addDepartments({ ...this.formData, pid: this.treeNode.id })
          }
          this.$emit('addDepts')
          this.$emit('update:showDialog', false)
        }
      })
    },
    btnCancel() {
      this.$refs.deptForm.resetFields() // 重置校验字段 只会重置表单上的数据，若有多的数据会保留，
      // 若想完全重置表单上的数据，需要重新定义
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      this.$emit('update:showDialog', false) // 关闭
    }
  }
}
</script>

<style>

</style>
