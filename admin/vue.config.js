module.exports = {
  /**
   * 打包后 dist 文件夹中 index.html 里引用的文件路径是根目录还是 xx 文件夹
   * npm run build 打包命令会自动把 NODE_ENV 变量的值赋值为 production
   */
  publicPath: process.env.NODE_ENV === 'production' ? '/admin/' : '/',
  outputDir: '../server/admin'
}