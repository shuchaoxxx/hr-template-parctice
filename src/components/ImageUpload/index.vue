<template>
  <div>
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :http-request="upload"
      :class="{ disabled:fileComputed }"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress
      v-if="showPercent"
      :percentage="percent"
      style="width: 180px"
    />
    <!-- 弹层 -->
    <el-dialog title="图片预览" :visible.sync="showDialog">
      <img :src="imgUrl" alt="" style="width:100%">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDxjESP6XicGdjfV7WgeOt9BzYsxoQnvoT',
  SecretKey: 'ThhTyC9qGOFuIPEm46rKXT9YhaDagV3K'
})
export default {
  data() {
    return {
      fileList: [],
      showDialog: false,
      imgUrl: '',
      currentFileUid: null,
      percent: 0,
      showPercent: false
    }
  },
  computed: {
    // 利用计算属性配合class样式，控制：当有一张图片时，隐藏加号。
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    preview(file) {
      this.imgUrl = file.url
      this.showDialog = true
    },
    // 删除图片后显示加号
    handleRemove(file, fileList) {
      // file 是要删除的文件、
      // fileList 是删除之后的文件
      // this.fileList = this.fileList.filter(item => item.uid !== file.uid)
      this.fileList = fileList
    },
    changeFile(file, fileList) {
      // file 是一个被选中的图片的对象
      // fileList 是当前的最新数组
      // console.log(file)
      // console.log(fileList)
      // if (!fileList.some(item => item.uid === file.uid)) {
      //   this.fileList.push(file)
      // }
      this.fileList = fileList.map(item => item)
      console.log(this.fileList)
      this.currentFileUid = file.uid // 记录当前上传的图片
    },
    beforeUpload(file) {
      // 做文件上传的检查
      // 文件类型 和 文件大小
      // 文件类型
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是JPG、GIF、BMP、PNG格式。')
        return false
      }
      // 检查大小
      const maxSize = 5 * 1024 * 1024
      // 1MB = 1024KB 1KB = 1024B
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      this.$message.success('图片格式和大小都符合要求')
      this.showPercent = true
      return true // 必须要return true 才可以继续
    },
    upload(params) {
      // console.log(params)
      if (params.file) {
        cos.putObject({
          Bucket: 'chao-02-1307709591',
          Region: 'ap-nanjing',
          Key: params.file.name,
          StorageClass: 'STANDARD',
          Body: params.file, // 上传文件对象
          // 若上传的时间很长，可以自己重复调用 所以可以按进度打印出params
          onProgress: (params) => {
            this.percent = params.percent * 100
          }
        }, (err, data) => {
          if (!err && data.statusCode === 200) {
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentFileUid) {
                // 若找到，直接返回一个对象，包含url属性，和upload属性
                return { url: 'http://' + data.Location, upload: true }
              }
              // 若没找到，直接返回
              return item
            })
            // 先关闭进度条
            // 重置百分比
            setTimeout(() => {
              this.showPercent = false
              this.percent = 0
            }, 1000)
            console.log(this.fileList)
          }
        })
      }
    }
  }

}
</script>

<style>
.disabled .el-upload--picture-card {
  display: none
}
</style>
