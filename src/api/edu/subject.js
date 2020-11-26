import request from '@/utils/request'
export default {
  getSubjectList() {
    return request({
      url: '/serviceedu/edu-subject/tree',
      method: 'get'
    })
  },
  getSubjectPaList() {
    return request({
      url: '/serviceedu/edu-subject/pa_list',
      method: 'get'
    })
  },
  getSubjectPaChList(pa_subject_id) {
    return request({
      url: `/serviceedu/edu-subject/pach_list/${pa_subject_id}`,
      method: 'get'
    })
  }
}
