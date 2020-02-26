//分类模型
const mongoose = require('mongoose')

//创建分类模型的字段
const schema = new mongoose.Schema({
  //分类名称
  name: String,
  //上级分类
  parent: mongoose.SchemaTypes.ObjectId
})

//导出一个Category模型
module.exports = mongoose.model('Category', schema)