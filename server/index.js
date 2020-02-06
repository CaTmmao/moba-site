//引用express
const express = require('express')

//创建express实例
const app = express()

//生成这个密钥生成token，一般这个存储在环境变量中，这里简便处理
app.set('secret', 'ssdasdad')

//引用跨域模块
app.use(require('cors')())

//对post请求体进行解析
app.use(express.json())

// 前端页面
app.use('/', express.static(`${__dirname}/web`))
// 后台管理系统页面
app.use('/admin', express.static(`${__dirname}/admin`))
//托管静态文件，使该目录里的文件可以被客户端通过 /upload 这个地址访问
app.use('/upload', express.static(`${__dirname}/upload`))

//引入后端路由（后台管理系统）
require('./routes/admin')(app)
// 引入移动端路由
require('./routes/web')(app)

//引入数据库配置
require('./plugins/db')(app)

//会在3000端口启动，启动后会调用回调函数
app.listen(3001, () => {
  console.log('listening 3001');
  
})

