const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  //图片地址
  imgUrl: {type: String},
  //图片跳转连接
  path: {type: String}
})

module.exports = mongoose.model('Carousel', schema)