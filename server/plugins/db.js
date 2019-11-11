//数据库配置
module.exports = app => {
  const mongoose = require('mongoose')

  //连接数据库
  mongoose.connect('mongodb://127.0.0.1:27017/moba-site', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}