const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  password: {
    type: String,
    //查询这个模型的时候不查询password这个字段
    select: false,
    //密码需要加密
    set(val) {
      var bcrypt = require('bcryptjs');
      //加密强度为10
      var salt = bcrypt.genSaltSync(10);
      //使用bcrypt库的散列（同步）方法对值进行加密后再存入数据库
      return bcrypt.hashSync(val, salt)
    }
  },
  remark: String
},
  {
    // 自动添加 createdAt & updatedAt 字段
    timestamps: true
  })

module.exports = mongoose.model('Admin', schema)