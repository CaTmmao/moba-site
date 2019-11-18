const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {type: String},
  password: {type: String}
})

module.exports = mongoose.model('Admin', schema)