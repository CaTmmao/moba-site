
/**
 * 从 cdn 动态加载 tinymce
 * @param {string} src tinymce 的 cdn 地址
 * @param {function} callback 回调函数
 */
const dynamicLoadScript = (src, callback = function () { }) => {
  // 引入 tinymce 库的 sctipt 标签
  const existingScript = document.getElementById(src)

  // 如果页面中没有创建该元素，就动态创建一个 script 标签用来引入 tinymce 库
  if (!existingScript) {
    const script = document.createElement('script')
    script.src = src
    script.id = src
    document.body.appendChild(script)
    // script 元素是否成功加载的检查步骤
    checkIfLoadSuccess(script)
  }

  // 引入了 tinymce 库 && 有回调函数
  if (existingScript && callback) {
    // 判断该 js 文件是否是否已经下载完毕
    if (window.tinymce) {
      callback(null)
    } else {
      callback(new Error(`${src} 加载失败`))
    }
  }

  /**
   * 检查 script 元素是否成功加载
   * @param script script元素
   */
  function checkIfLoadSuccess(script) {
    // 成功加载
    script.onload = function () {
      callback(null)
    }

    // 加载失败
    script.onerror = function () {
      callback(new Error(`${src} 加载失败`))
    }
  }
}
export default dynamicLoadScript
