//引用express
const express = require('express')

//创建express实例
const app = express()

//引用跨域模块
app.use(require('cors')())

//对post请求体进行解析
app.use(express.json())

//引入后端路由
require('./routes/admin')(app)

//引入数据库配置
require('./plugins/db')(app)

//会在3000端口启动，启动后会调用回调函数
app.listen(3001, () => {
})

