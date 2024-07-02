import request from '@/utils/request'

// 删除评论
export function deleteComment(id) {
  return request.delete(`/api/comment/${id}`)
}

// 分页获取评论
export function getCommentList(page = 1, limit = 10) {
  return request({
    url: '/api/comment',
    method: 'get',
    params: {
      page,
      limit
    }
  })
}
