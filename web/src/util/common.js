/**
 * 日期转换成 MM/DD
 * @param {date} date 待转换日期
 * @returns {string} 转换完的日期
 */
export function convertDate(date) {
  date = new Date(date)
  let months = date.getMonth() + 1
  months = months < 10 ? `0${months}` : months
  let days = date.getDate()

  return `${months}/${days}`
}