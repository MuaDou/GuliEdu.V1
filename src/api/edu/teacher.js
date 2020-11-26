import request from '@/utils/request'

export default {
  getTeacherListAll() {
    return request({
      url: `/serviceedu/edu-teacher/list`,
      method: 'get'
    })
  },
  getTeacherList(page, limit, teacher_query) {
    return request({
      url: `/serviceedu/edu-teacher/condition/${page}/${limit}`,
      method: 'get',
      params: teacher_query
    })
  },
  addTeacher(teacher) {
    return request({
      url: `/serviceedu/edu-teacher`,
      method: 'post',
      data: teacher
    })
  },
  deleteTeacher(id) {
    return request({
      url: `/serviceedu/edu-teacher/${id}`,
      method: 'delete'
    })
  },
  updateTeacher(teacher) {
    return request({
      url: `/serviceedu/edu-teacher`,
      method: 'put',
      data: teacher
    })
  },
  queryTeacher(teacher_id) {
    return request({
      url: `/serviceedu/edu-teacher/${teacher_id}`,
      method: 'get'
    })
  }
}
