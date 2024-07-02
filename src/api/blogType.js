import request from '@/utils/request'

// 查看文章分类接口(get): /api/blogtype
export function getBlogType() {
  return request.get('/api/blogtype')
}
// 添加文章分类接口(post): /api/blogtype
export function addBlogType(data) {
  return request({
    url: '/api/blogtype',
    method: 'post',
    data
  })
}
// 删除文章分类接口(delete): /api/blogtype/{id}
export function delBlogType(id) {
  return request.delete(`/api/blogtype/${id}`)
}
// 查找某一个文章分类(get): /api/blogtype/{id}
export function findOneBlogType(id) {
  return request({
    url: `/api/blogtype/${id}`,
    method: 'get'
  })
}
// 更新某一个文章分类(put): /api/blogtype/{id}
export function updateOneBlogType(editInfo) {
  return request({
    url: `/api/blogtype/${editInfo.id}`,
    method: 'put',
    data: editInfo.data
  })
}
