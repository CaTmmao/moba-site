//引用express
const express = require('express')

//创建express实例
const app = express()

//会在3000端口启动，启动后会调用回调函数
app.listen(3000, () => {
    console.log('asd');
})

