module.exports = app => {
  const express = require('express')

  //定义一个路由（这个是express的子路由）
  const router = express.Router()

  //子路由上加一个post方法，接口地址是category
  router.post('/category', async (req, res) => {
    
  })




  //把子路由挂载上去
  app.use('admin/api', router)
}