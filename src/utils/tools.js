// 工具函数库
export function formatDate(time) {
    let date = new Date(parseInt(time));
    let year = date.getFullYear();    // 获取年份
    let month = date.getMonth() + 1; // 获取月份
    let day = date.getDate(); // 获取日
    let hh = date.getHours(); // 获取时
    let mm = date.getMinutes(); // 获取分
    let ss = date.getSeconds(); // 获取秒
    const weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const week = weekArr[date.getDay()]; // 获取星期几
    month = month > 1 && month < 9 ? '0' + month : month;
    day = day > 0 && day < 9 ? '0' + day : day;
    hh = hh > 0 && hh < 9 ? '0' + hh : hh;
    mm = mm > 0 && mm < 9 ? '0' + mm : mm;
    ss = ss > 0 && ss < 9 ? '0' + ss : ss;
    return `${year}-${month}-${day} ${hh}:${mm}:${ss} ${week}`;
}