<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacher_query.name" placeholder="讲师名"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="teacher_query.level" clearable placeholder="讲师头衔">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="teacher_query.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teacher_query.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetForm()">清空</el-button>
      <el-button type="primary" icon="el-icon-add" @click="openDialog(null)">增加</el-button>
    </el-form>

    <el-table
      v-loading="is_loading"
      :data="teacher_list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="名称" width="80" />

      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level===1?'高级讲师':'首席讲师' }}
        </template>
      </el-table-column>

      <el-table-column prop="intro" label="资历" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column prop="sort" label="排序" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="openDialog(scope.row)">修改</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeTeacher(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

    <el-dialog
      :visible.sync="is_showdialog"
      title="讲师编辑"
      width="30%">
      <el-form
        :rules="rules"
        :model="teacher_form"
        :ref="teacher_form"
        label-width="120px">
        <el-form-item label="讲师名称" prop="name">
          <el-input v-model="teacher_form.name"/>
        </el-form-item>
        <el-form-item label="讲师头像" prop="avatar">
          <el-upload
            :action="BASE_API"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="teacher_form.avatar" :src="teacher_form.avatar" class="avatar" alt="">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="讲师排序" prop="sort">
          <el-input-number v-model="teacher_form.sort" controls-position="right"/>
        </el-form-item>
        <el-form-item label="讲师头衔" prop="level">
          <el-select v-model="teacher_form.level" clearable placeholder="请选择">
            <!--
              数据类型一定要和取出的json中的一致，否则没法回填
              因此，这里value使用动态绑定的值，保证其数据类型是number
            -->
            <el-option :value="1" label="高级讲师"/>
            <el-option :value="2" label="首席讲师"/>
          </el-select>
        </el-form-item>
        <el-form-item label="讲师资历" prop="career">
          <el-input v-model="teacher_form.career"/>
        </el-form-item>
        <el-form-item label="讲师简介" prop="intro">
          <el-input v-model="teacher_form.intro" :rows="10" type="textarea"/>
        </el-form-item>

        <!-- 讲师头像：TODO -->

        <el-form-item>
          <el-button type="primary" @click="addOrupdateTeacher">{{ is_add?'保存':'修改' }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import teacher from '@/api/edu/teacher'
export default {
  name: 'List',
  data() {
    return {
      is_loading: true,
      is_add: true,
      is_showdialog: false,
      teacher_list: null,
      page: 1,
      limit: 5,
      total: 0,
      teacher_query: {},
      teacher_form: {},
      BASE_API: process.env.BASE_API + '/serviceoss/edu-oss',
      rules: {
        name: [
          { required: true, message: '请输入讲师姓名', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: '请输入讲师简介', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ],
        career: [
          { required: true, message: '请输入讲师资历', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(page = 1) {
      this.is_loading = true
      this.page = page
      teacher.getTeacherList(this.page, this.limit, this.teacher_query)
        .then(res => {
          this.teacher_list = res.data.records
          this.total = res.data.total
          this.is_loading = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    addOrupdateTeacher() {
      if (this.is_add) {
        teacher.addTeacher(this.teacher_form)
          .then(() => {
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.is_showdialog = false
            this.is_add = false
            this.getList()
          })
      } else {
        teacher.updateTeacher(this.teacher_form)
          .then(() => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.is_showdialog = false
            this.is_add = false
            this.getList()
          })
      }
    },
    removeTeacher(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return teacher.deleteTeacher(id)
      }).then(() => {
        this.getList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    queryTeacher(id) {
      teacher.queryTeacher(id)
        .then(res => {
          this.teacher_form = res.data.record
        })
    },
    resetForm() {
      this.teacher_query = {}
      this.getList()
    },
    openDialog(row = null) {
      if (row === null) {
        this.is_add = true
        this.teacher_form = {}
      } else {
        this.is_add = false
        this.teacher_form = row
      }
      console.log(row)
      this.is_showdialog = true
    },
    handleAvatarSuccess(res, file) {
      this.teacher_form.avatar = res.data.url
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

<style scoped>

</style>
