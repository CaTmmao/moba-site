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

  const multer = require('multer')
  const upload = multer({ dest: `${__dirname}/../../upload` })
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    //之所以可以用req.file获取到文件数据，是因为用multer库的upload.single('file')将file参数赋值到req上
    const file = req.file

    //给file里面添加一个url属性，作为前端展示图片的一个地址，需要用上面已有的file对象内的属性拼接出来
    file.url = `http://localhost:3001/upload/${file.filename}`
    res.send(file)
  })


  //登录接口
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body

    //根据用户名找用户
    const Admin = require('../../models/Admin')

    /**
     * 由于在Admin模型中设置了password字段默认不被查出来（select:false），如果想要查询
     * password这个字段，用select('+password')表示增加查询password这个字段
     */
    const user = await Admin.findOne({ username }).select('+password')

    //1.查询不到用户
    if (!user) {
      res.send({
        code: 0,
        msg: '该用户不存在'
      })
    }

    //2.校验密码
    //用用户传进来的password和数据库中查到的用户password值进行对比 
    let isValid = require('bcryptjs').compareSync(password, user.password)

    //密码错误
    if (!isValid) {
      res.send({
        code: 0,
        msg: '密码错误'
      })
    }

    //3.返回token
    const jwt = require('jsonwebtoken')
    //生成token
    const token = jwt.sign({
      id: user._id
    }, app.get('secret'))

    res.send({
      code: 1,
      token
    })
  })
}