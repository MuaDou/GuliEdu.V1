<template>
  <div class="content">
    <div class="list">
      <el-input
        v-model="filterText"
        placeholder="输入关键字进行过滤"/>

      <el-tree
        ref="tree"
        :data="subject_list"
        :props="defaultProps"
        :filter-node-method="filterNode"
        class="filter-tree"
        default-expand-all/>
    </div>
    <div class="upload">
      <el-upload
        ref="upload"
        :action="BASE_API"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
        class="upload-demo">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
import subject from '@/api/edu/subject'
export default {
  name: 'SubjectList',
  data() {
    return {
      BASE_API: process.env.BASE_API + '/serviceedu/edu-subject',
      filterText: '',
      subject_list: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    subject.getSubjectList()
      .then(res => {
        this.subject_list = res.data.records
      })
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    }
  }
}
</script>

<style lang="scss" scoped>
  .content{
    display: flex;
    justify-content: center;
    .list{
      width: 50%;
      height: 100vh;
    }
    .upload{
      width: 50%;
      height: 100vh;
    }
  }
</style>
