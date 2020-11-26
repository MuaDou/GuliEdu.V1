import request from '@/utils/request'
export default {
  addChapter(chapter_form) {
    return request({
      url: '/serviceedu/edu-chapter',
      method: 'post',
      data: chapter_form
    })
  },
  getChapter(chapter_id) {
    return request({
      url: `/serviceedu/edu-chapter/${chapter_id}`,
      method: 'get'
    })
  },
  updateChapter(chapter_form) {
    return request({
      url: '/serviceedu/edu-chapter',
      method: 'put',
      data: chapter_form
    })
  },
  getChapterList(course_id) {
    return request({
      url: `/serviceedu/edu-chapter/list/${course_id}`,
      method: 'get'
    })
  },
  deleteChapter(course_id) {
    return request({
      url: `/serviceedu/edu-chapter/${course_id}`,
      method: 'delete'
    })
  }
}
