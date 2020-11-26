import request from '@/utils/request'
export default {
  addCourse(course_form) {
    return request({
      url: '/serviceedu/edu-course',
      method: 'post',
      data: course_form
    })
  },
  queryCourse(course_id) {
    return request({
      url: `/serviceedu/edu-course/${course_id}`,
      method: 'get'
    })
  },
  updateCourse(course_form) {
    return request({
      url: '/serviceedu/edu-course',
      method: 'put',
      data: course_form
    })
  },
  getCourseInfo(course_id) {
    return request({
      url: `/serviceedu/edu-course/info/${course_id}`,
      method: 'get'
    })
  }
}
