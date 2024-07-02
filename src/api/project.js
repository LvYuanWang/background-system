import request from "@/utils/request";

// 获取所有项目
export function getProjects() {
    return request({
        url: '/api/project',
        method: 'get'
    })
}

// 修改项目
export function updateProject(projectInfo) {
    return request({
        url: `/api/project/${projectInfo.id}`,
        method: 'put',
        data: projectInfo.data
    })
}

// 删除项目
export function deleteProject(id) {
    return request({
        url: `/api/project/${id}`,
        method: 'delete'
    })
}

// 新增项目
export function addProject(data) {
    return request({
        url: '/api/project',
        method: 'post',
        data,
    })
}