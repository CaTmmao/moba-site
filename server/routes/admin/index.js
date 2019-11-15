module.exports = app => {
  const express = require('express')

  //定义一个路由（这个是express的子路由）
  const router = express.Router()

  //引入Category模型
  const Category = require('../../models/Category')

  //子路由上加一个post方法，接口地址是category
  router.post('/category', async (req, res) => {
    //把客户端传递过来的数据存储在数据库中
    const model = await Category.create(req.body)
    res.send(model)
  })

  //获取分类列表
  router.get('/category', async (req, res) => {
    const list = await Category.find().populate('parent').limit(10)
    res.send(list)
  })

  //通过id获取分类详情
  router.get('/category/:id', async (req, res) => {
    const model = await Category.findById(req.params.id)
    res.send(model)
  })

  //更新分类
  router.put('/category/:id', async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  //删除分类
  router.delete('/category/:id', async (req, res) => {
    const model = await Category.findByIdAndDelete(req.params.id)
    res.send(model)
  })


  //把子路由挂载上去
  app.use('/admin/api', router)
}