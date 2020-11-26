import request from '@/utils/request'
export default {
  addVideo(video_form) {
    return request({
      url: '/serviceedu/edu-video',
      method: 'post',
      data: video_form
    })
  },
  getVideo(video_id) {
    return request({
      url: `/serviceedu/edu-video/${video_id}`,
      method: 'get'
    })
  },
  updateVideo(video_form) {
    return request({
      url: '/serviceedu/edu-video',
      method: 'put',
      data: video_form
    })
  },
  deleteVideo(video_id) {
    return request({
      url: `/serviceedu/edu-video/${video_id}`,
      method: 'delete'
    })
  }
}
