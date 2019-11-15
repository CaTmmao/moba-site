module.exports = app => {
  const express = require('express')

  //定义一个路由（这个是express的子路由）
  const router = express.Router({
    /**合并url参数。把父级app.use中的参数合并到router实例中，
    *这样才能在接口中通过res.params.resource获取到 app.use父级中的resource动态参数
    */
    mergeParams: true
  })


  //子路由上加一个post方法，接口地址是category
  router.post('/', async (req, res) => {
    //把客户端传递过来的数据存储在数据库中
    const data = await req.Model.create(req.body)
    res.send(data)
  })

  //获取分类列表
  router.get('/', async (req, res) => {
    let queryOptions = {}

    //检查模型名称
    if (req.Model.modelName === 'Category') {
      queryOptions = {
        populate: 'parent'
      }
    }
    const list = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(list)
  })

  //通过id获取分类详情
  router.get('/:id', async (req, res) => {
    const data = await req.Model.findById(req.params.id)
    res.send(data)
  })

  //更新分类
  router.put('/:id', async (req, res) => {
    const data = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(data)
  })

  //删除分类
  router.delete('/:id', async (req, res) => {
    const data = await req.Model.findByIdAndDelete(req.params.id)
    res.send(data)
  })


  //把子路由挂载上去 (rest代表的是通用的接口；resource用来动态获取接口地址，如category)
  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    /**获取resource字段是接口的名称，如category，由于接口名称和模型名称是一样的，除了模型名称
    * 的首字母需要大写。后面需要操作模型，因为需要获取接口地址把接口地址的首字母转成大写
   */
    let model = req.params.resource
    //把首字母换成大写的，这样就获取到了模型名称
    model = model.charAt(0).toUpperCase() + model.slice(1)
    model = require(`../../models/${model}`)
    req.Model = model
    next()
  }, router)
}