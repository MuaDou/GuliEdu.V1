<template>
  <div>
    <div class="setp-bar">
      <el-steps :active="1" align-center finish-status="success">
        <el-step title="步骤1" description="填写课程基本信息"/>
        <el-step title="步骤2" description="创建课程大纲"/>
        <el-step title="步骤3" description="提交审核"/>
      </el-steps>
    </div>
    <div class="content">
      <el-form label-width="120px" class="course_form">

        <el-form-item label="课程标题">
          <el-input v-model="course_form.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
        </el-form-item>

        <el-form-item label="课程分类">
          <el-select
            v-model="course_form.subjectParentId"
            placeholder="请选择一级分类"
            @change="getPaChSubjectList(course_form.subjectParentId)">
            <el-option
              v-for="item in pasubject_list"
              :key="item.id"
              :label="item.title"
              :value="item.id"/>
          </el-select>
          <el-select v-model="course_form.subjectId" placeholder="请选择二级分类">
            <el-option
              v-for="item in pachsubject_list"
              :key="item.id"
              :label="item.title"
              :value="item.id"/>
          </el-select>
        </el-form-item>

        <el-form-item label="课程讲师">
          <el-select v-model="course_form.teacherId" placeholder="请选择讲师">
            <el-option
              v-for="item in teacher_list"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </el-form-item>

        <el-form-item label="总课时">
          <el-input-number :min="0" v-model="course_form.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
        </el-form-item>

        <el-form-item label="课程简介">
          <el-input
            :rows="2"
            v-model="course_form.description"
            type="textarea"
            placeholder="请填写课程的简介"/>
        </el-form-item>

        <el-form-item label="讲师头像">
          <el-upload
            :action="BASE_API"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="course_form.cover" :src="course_form.cover" class="avatar" alt="">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-form-item>

        <el-form-item label="课程价格">
          <el-input-number :min="0" v-model="course_form.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
        </el-form-item>

        <el-form-item>
          <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
          <!--        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>-->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import course from '@/api/edu/course'
import teacher from '@/api/edu/teacher'
import subject from '@/api/edu/subject'
export default {
  name: 'Info',
  data() {
    return {
      BASE_API: process.env.BASE_API + '/serviceoss/edu-oss',
      teacher_list: [
        {
          name: ''
        }
      ],
      subject_paid: '',
      pasubject_list: [],
      pachsubject_list: [],
      course_form: {
        title: '',
        lessonNum: 0,
        price: 0,
        description: '',
        cover: '',
        subjectParentId: '',
        subjectId: '',
        teacherId: ''
      }
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.course_id = this.$route.params.id
      this.queryCourse(this.course_id)
      // TODO: 思考为什么这里单独调用this.getPaChSubjectList取不到this.course_form
    }
    this.getPaSubjectList()
    this.getgetTeacherListAll()
  },
  methods: {
    next() {
      if (!this.course_form.id) {
        this.addCourse(this.course_form)
      } else {
        this.updateCourse(this.course_form)
      }
    },
    updateCourse(course_form) {
      course.updateCourse(course_form)
        .then(res => {
          this.$message({
            type: 'success',
            message: '课程修改成功!'
          })
          this.$router.push({ path: '/subject/chapter/' + course_form.id })
        })
    },
    addCourse(course_form) {
      course.addCourse(course_form)
        .then(res => {
          this.$message({
            type: 'success',
            message: '添加课程成功!'
          })
          this.$router.push({ path: '/subject/chapter/' + res.data.courseId })
        })
    },
    queryCourse(course_id) {
      this.getPaSubjectList()
      course.queryCourse(course_id)
        .then(res => {
          this.course_form = res.data.record
          this.getPaChSubjectList(this.course_form.subjectParentId)
        })
    },
    getPaSubjectList() {
      subject.getSubjectPaList()
        .then(res => {
          this.pasubject_list = res.data.records
        })
    },
    getgetTeacherListAll() {
      teacher.getTeacherListAll()
        .then(res => {
          this.teacher_list = res.data.records
        })
    },
    getPaChSubjectList(pa_subject_id) {
      subject.getSubjectPaChList(pa_subject_id)
        .then(res => {
          this.pachsubject_list = res.data.records
        })
    },
    handleAvatarSuccess(res, file) {
      this.course_form.cover = res.data.url
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
  div{
    .setp-bar{
      margin: 40px auto;
      display: flex;
      justify-content: center;
      .el-steps{
        width: 40vw;
      }
    }
    .content{
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-form{
        width: 40vw;
      }
    }
  }
</style>
