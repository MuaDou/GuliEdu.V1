import request from '@/utils/request'
export default {
  uploadAvatar(file) {
    return request({
      url: `/serviceoss/edu-oss`,
      method: 'post',
      data: file
    })
  }
}
