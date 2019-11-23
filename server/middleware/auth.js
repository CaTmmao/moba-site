//验证中间件
module.exports = () => async (req, res, next) => {
  const jwt = require('jsonwebtoken')

  //引入Admin模型
  const Admin = require('../models/Admin')

  //获取token
  let token = ''
  if (req.headers.authorization) {
    token = String(req.headers.authorization).split(' ').pop()
  }

  //没有token告知用户先登录
  if (!token) {
    res.send({
      code: 110,
      msg: '请先登录'
    })
  }

  //通过从前端获取的token解密出是哪个id生成的
  const { id } = jwt.verify(token, req.app.get('secret'))

  //查询出这个user挂载到req中
  req.user = await Admin.findById(id)

  if (!req.user) {
    res.send({
      code: 110,
      msg: '请先登录'
    })
  }

  next()
}