function id2ip (id) {
    const ip = id.replaceAll('.', '')
    return String(Number(ip.slice(0, 3))) + '.' + String(Number(ip.slice(3, 6))) + '.' + String(Number(ip.slice(6, 9))) + '.' + String(Number(ip.slice(9, 12)))
}

function date (date) {
    const year = String(date.getFullYear())
    let month = String(date.getMonth() + 1)
    month = month.length === 1 ? '0' + month : month
    let day = String(date.getDate())
    day = day.length === 1 ? '0' + day : day
    let hour = String(date.getHours())
    hour = hour.length === 1 ? '0' + hour : hour
    let minute = String(date.getMinutes())
    minute = minute.length === 1 ? '0' + minute : minute
    let second = String(date.getSeconds())
    second = second.length === 1 ? '0' + second : second
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
}

export default {
    id2ip,
    date
}
