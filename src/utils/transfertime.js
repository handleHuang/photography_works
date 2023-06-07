// 获取当前时间，day为number，
function getDay (day) {
  var today = new Date()
  var targetdayMilliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day
  today.setTime(targetdayMilliseconds)
  var tYear = today.getFullYear()
  var tMonth = today.getMonth()
  var tDate = today.getDate()
  tMonth = doHandleMonth(tMonth + 1)
  tDate = doHandleMonth(tDate)
  return tYear + '-' + tMonth + '-' + tDate
}
function doHandleMonth (month) {
  var m = month
  if (month.toString().length === 1) {
    m = '0' + month
  }
  return m
}
function formatDateTime (originalTiem) {
  var date = new Date()
  var y = date.getFullYear(originalTiem)
  var m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  var h = date.getHours()
  h = h < 10 ? ('0' + h) : h
  var minute = date.getMinutes()
  var second = date.getSeconds()
  minute = minute < 10 ? ('0' + minute) : minute
  second = second < 10 ? ('0' + second) : second
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
}
export { getDay, formatDateTime }
