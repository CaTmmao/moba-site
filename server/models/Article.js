const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  //文章标题
  title: {type: String},
  //文章正文
  body: {type: String},
  //文章分类
  categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}]
}, {
  // 自动添加 createdAt & updatedAt 字段
  timestamps: true
})

module.exports = mongoose.model('Article', schema)