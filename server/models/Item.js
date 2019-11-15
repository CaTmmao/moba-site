//分类模型
const mongoose = require('mongoose')

//创建分类模型的字段
const schema = new mongoose.Schema({
  //物品名称
  name: {
    type: String
  },
  //图标
  icon: {
    type: String
  }
})

//导出一个Category模型
module.exports = mongoose.model('Item', schema)