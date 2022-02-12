<template>
  <!-- 弹层 -->
  <el-dialog title="新增部门" :visible="showDialog">
    <!-- 表单 -->
    <el-form label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select style="width:80%" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input style="width:80%" type="textarea" placeholder="1-300个字符" :rows="3" />
      </el-form-item></el-form>
    <!-- 确定和取消按钮 -->
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" type="primary">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
    }
  }
}
</script>

<style>

</style>
