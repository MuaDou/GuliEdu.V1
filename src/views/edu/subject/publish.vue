<template>
  <div>
    <el-steps :active="3" align-center finish-status="success">
      <el-step title="步骤1" description="填写课程基本信息"/>
      <el-step title="步骤2" description="创建课程大纲"/>
      <el-step title="步骤3" description="提交审核"/>
    </el-steps>
    <div class="card_box">
      <img class="course_cover" src="course_form.cover" alt="">
      <div class="course_info">
        <h2>{{ rse_form.title }}</h2>
        <p/><span>课程数量:{{course_form.lessonNum}}</span>
        <p/><span>课程讲师:{{course_form.teacherName}}</span>
        <p/><span>课程分类:{{course_form.paSubjectName}} - {{course_form.pachSbjectName}}</span>
        <p/><span>课程价格:{{course_form.price}}</span>
      </div>
    </div>
    <el-button style="margin-top: 12px;" @click="pre">上一步</el-button>
    <el-button style="margin-top: 12px;" @click="next">保存</el-button>
  </div>
</template>

<script>
import subject from '@/api/edu/subject'
import course from '@/api/edu/course'
export default {
  name: 'Publish',
  data() {
    return {
      BASE_API: process.env.BASE_API + '/serviceoss/edu-oss',
      pasubject_list: [],
      pachsubject_list: [],
      course_form: {
        title: '',
        lessonNum: 0,
        price: 0,
        cover: '',
        paSubjectName: '',
        pachSubjectName: '',
        teacherName: ''
      }
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.course_id = this.$route.params.id
      this.getCourseInfo( this.course_id )
    }
  },
  methods: {
    next() {
      this.$router.push({ path: '/subject/list' })
    },
    pre() {
      this.$router.push({ path: '/subject/chapter/' + this.course_id })
    },
    getCourseInfo(course_id) {
      course.getCourseInfo(course_id)
        .then(res => {
          this.course_form = this.data.record
        })
    }
  }
}
</script>

<style scoped>

</style>
