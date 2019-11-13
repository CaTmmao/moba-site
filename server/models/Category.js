//分类模型
const mongoose = require('mongoose')

//创建分类模型的字段
const schema = new mongoose.Schema({
  //分类名称
  name: {
    type: String
  },
  //上级分类
  parent: {
    //关联Category模型
    type: mongoose.SchemaTypes.ObjectId, ref: 'Category'
  }
})

//导出一个Category模型
module.exports = mongoose.model('Category', schema)