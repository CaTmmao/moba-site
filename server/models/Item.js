const mongoose = require('mongoose')

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

module.exports = mongoose.model('Item', schema)