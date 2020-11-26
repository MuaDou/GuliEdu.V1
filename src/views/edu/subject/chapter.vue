<template>
  <div>
    <div class="setp-bar">
      <el-steps :active="2" align-center finish-status="success">
        <el-step title="步骤1" description="填写课程基本信息"/>
        <el-step title="步骤2" description="创建课程大纲"/>
        <el-step title="步骤3" description="提交审核"/>
      </el-steps>
    </div>
    <div class="content">
      <div class="chapter_add">
        <el-button @click="openChapterDialog(add=true, id='')">新增章节</el-button>
      </div>
      <div class="chapters">
        <ul class="chapterList">
          <li
            v-for="chapter in chapterList"
            :key="chapter.id">
            <p>
              {{ chapter.title }}

              <span class="acts">
                <el-button type="text" @click="openVideoDialog(add=true, chapter_id=chapter.id, '')" >添加课时</el-button>
                <el-button style="" type="text" @click="openChapterDialog(add=false, id=chapter.id)">编辑</el-button>
                <el-button type="text" @click="deleteChapter(chapter.id)">删除</el-button>
              </span>
            </p>

            <!-- 视频 -->
            <ul class="chanpterList videoList">
              <li
                v-for="video in chapter.children"
                :key="video.id">
                <p>{{ video.title }}
                  <span class="acts">
                    <el-button type="text" @click="openVideoDialog(add=false, chapter_id=chapter.id, video.id)">编辑</el-button>
                    <el-button type="text" @click="deleteVideo(video.id)">删除</el-button>
                  </span>
                </p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="button-group">
      <el-button style="margin-top: 12px;" @click="pre">上一步</el-button>
      <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
    </div>

    <el-dialog :visible.sync="open_chapter_dialog" title="添加章节">
      <el-form :model="chapter_form" label-position="top">
        <el-form-item label="章节名称">
          <el-input v-model="chapter_form.title" />
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="chapter_form.sort" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeChapterDialog">取 消</el-button>
        <el-button type="primary" @click="addORupdateChapter">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="open_video_dialog" title="添加视频">
      <el-form :model="video_form" label-position="top">
        <el-form-item label="小节名称">
          <el-input v-model="video_form.title" />
        </el-form-item>
        <el-form-item label="小节排序">
          <el-input-number v-model="video_form.sort" />
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video_form.isFree">
            <el-radio :label="1">免费</el-radio>
            <el-radio :label="0">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <!-- TODO -->
        </el-form-item>
      </el-form>`
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeVideoDialog">取 消</el-button>
        <el-button type="primary" @click="addORupdateVideo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import chapter from '@/api/edu/chapter'
import video from '@/api/edu/video'

export default {
  name: 'Chapter',
  data() {
    return {
      course_id: '',
      chapter_id: '',
      open_chapter_dialog: false,
      open_video_dialog: false,
      chapter_form: {
        id: '',
        title: '',
        sort: 0,
        courseId: ''
      },
      video_form: {
        title: '',
        Integer: 0,
        sort: 0,
        videoSourceId: '',
        chapterId: '',
        courseId: ''
      },
      chapterList: []
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.course_id = this.$route.params.id
      this.getChapterList(this.course_id)
    }
  },
  methods: {
    next() {
      this.$router.push({ path: '/subject/publish/' + this.course_id })
    },
    pre() {
      this.$router.push({ path: '/subject/info/' + this.course_id })
    },
    openChapterDialog(add, chapter_id) {
      if (!add) {
        this.getChapter(chapter_id)
      } else {
        this.initChapterForm()
      }
      this.open_chapter_dialog = true
    },
    openVideoDialog(add, chapter_id, video_id) {
      if (!add) {
        this.getVideo(video_id)
      } else {
        this.chapter_id = chapter_id
        this.initVideoForm()
      }
      this.open_video_dialog = true
    },
    initChapterForm() {
      this.chapter_form = {
        id: '',
        title: '',
        sort: 0,
        courseId: this.course_id
      }
    },
    initVideoForm() {
      this.video_form = {
        id: '',
        title: '',
        isFree: 0,
        sort: 0,
        videoSourceId: '',
        chapterId: this.chapter_id,
        courseId: this.course_id
      }
    },
    closeChapterDialog() {
      this.open_chapter_dialog = false
    },
    closeVideoDialog() {
      this.open_video_dialog = false
      this.initVideoForm()
    },
    getChapterList(course_id) {
      chapter.getChapterList(course_id)
        .then(res => {
          this.chapterList = res.data.records
        })
    },
    getChapter(chapter_id) {
      chapter.getChapter(chapter_id)
        .then(res => {
          this.chapter_form = res.data.record
        })
    },
    getVideo(video_id) {
      video.getVideo(video_id)
        .then(res => {
          this.video_form = res.data.record
        })
    },
    addChapter(chapter_form) {
      chapter.addChapter(chapter_form)
        .then(res => {
          this.$message({
            type: 'success',
            message: '章节添加成功!'
          })
          this.getChapterList(this.course_id)
        })
    },
    addVideo(video_form) {
      video.addVideo(video_form)
        .then(res => {
          this.$message({
            type: 'success',
            message: '章节小节添加成功!'
          })
          this.getChapterList(this.course_id)
        })
    },
    updateChapter(chapter_form) {
      chapter.updateChapter(chapter_form)
        .then(res => {
          this.$message({
            type: 'success',
            message: '章节修改成功!'
          })
        })
    },
    updateVideo(video_form) {
      video.updateVideo(video_form)
        .then(res => {
          this.$message({
            type: 'success',
            message: '章节小节修改成功!'
          })
        })
    },
    deleteChapter(chapter_id) {
      chapter.deleteChapter(chapter_id)
        .then(res => {
          this.getChapterList(this.course_id)
        })
    },
    deleteVideo(video_id) {
      video.deleteVideo(video_id)
        .then(res => {
          this.getChapterList(this.course_id)
        })
    },
    addORupdateChapter() {
      if (this.chapter_form.id !== '') {
        this.updateChapter(this.chapter_form)
      } else {
        this.addChapter(this.chapter_form)
      }

      // TODO: 获取不到最新的列表
      this.closeChapterDialog()
    },
    addORupdateVideo() {
      if (this.video_form.id !== '') {
        console.log('删除小节')
        this.updateVideo(this.video_form)
      } else {
        console.log('添加小节')
        this.addVideo(this.video_form)
      }
      this.closeVideoDialog()
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
      width: 60vw;
    }
  }
  .content{
    width: 60vw;
    margin: 20px auto;
    padding-left: 150px;
  }
  .button-group{
    argin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
