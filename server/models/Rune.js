const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  // 铭文名称
  name: {
    type: String
  },
  // 铭文图标
  icon: {
    type: String
  },
  // 描述
  desc: {
    type: Array
  }
})

module.exports = mongoose.model('Rune', schema, 'runes')