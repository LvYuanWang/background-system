import request from '@/utils/request'

// 分页获取文章
// page 代表页码数，limit 代表每一页显示的数量
export function getBlog(page = 1, limit = 10) {
    return request({
        url: '/api/blog',
        method: 'get',
        params: {
            page, limit
        }
    })
}

// 删除文章
export function deleteBlogApi(id) {
    return request({
        url: `/api/blog/${id}`,
        method: 'delete',
    })
}

// 添加文章
export function addBlogApi(data) {
    return request({
        url: '/api/blog',
        method: 'post',
        data
    })
}

// 修改文章
export function editBlogApi(blogInfo) {
    return request({
        url: `/api/blog/${blogInfo.id}`,
        method: 'put',
        data: blogInfo.data
    })
}

// 获取单篇文章
export function findeOneBlogApi(id) {
    return request({
        url: `/api/blog/${id}`,
        method: 'get'
    })
}