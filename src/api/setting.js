import request from "@/utils/request";

// 获取全局配置
export function getSetting() {
    return request.get("api/setting");
}

// 修改全局配置
export function updateSetting(data) {
    return request({
        url: "api/setting",
        method: "put",
        data
    });
}