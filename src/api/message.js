import request from "@/utils/request";

// 分页获取留言
export function getMessageList(page = 1, limit = 10) {
    return request({
        url: "/api/message",
        method: "get",
        params: {
            page,
            limit
        }
    })
}

// 删除留言
export function deleteMessage(id) {
    return request.delete(`/api/message/${id}`)
}

// 提交留言
export function addMessage(data) {
    return request({
        url: "/api/message",
        method: "post",
        data
    })
}