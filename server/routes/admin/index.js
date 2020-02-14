module.exports = app => {
  const express = require('express')

  //定义一个路由（这个是express的子路由）
  const router = express.Router({
    /**合并url参数。把父级app.use中的参数合并到router实例中，
     *这样才能在接口中通过res.params.resource获取到 app.use父级中的resource动态参数
     */
    mergeParams: true
  })

  const Admin = require('../../models/Admin')
  const jwt = require('jsonwebtoken')

  //验证中间件
  const authMiddleware = require('../../middleware/auth')

  //资源中间件
  const resourceMiddleware = require('../../middleware/resource')


  //把子路由挂载上去 (rest代表的是通用的接口；resource用来动态获取接口地址，如category)
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

  //增加 
  router.post('/', async (req, res) => {
    //把客户端传递过来的数据存储在数据库中
    await req.Model.create(req.body, (err) => {
      err && res.send({ code: 0 })
      res.send({ code: 1 })
    })
  })

  //删除
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id).exec((err, data) => {
      err && res.send({ code: 0 })
      res.send({ code: 1 })
    })
  })


  //更新
  router.put('/:id', async (req, res) => {
    await req.Model.findByIdAndUpdate(req.params.id, req.body).exec((err, data) => {
      err && res.send({ code: 0 })
      res.send({ code: 1 })
    })
  })

  router.get('/', async (req, res) => {
    let queryOptions = {}, query
    let parent = req.params.parentId

    //检查模型名称是否是分类模型
    if (req.Model.modelName === 'Category') {
      queryOptions = {
        populate: 'parent'
      }

      query = {
        parent
      }
    }

    await req.Model.find(query).setOptions(queryOptions).exec((err, data) => {
      err && res.send({ code: 0 })
      res.send({ code: 1, data })
    })
  })

  //通过id获取详情
  router.get('/:id', async (req, res) => {
    await req.Model.findById(req.params.id).exec((err, data) => {
      err && res.send({ code: 0 })
      res.send({ code: 1, data })
    })
  })

  //登录
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body

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
    //生成token
    const token = jwt.sign({
      id: user._id
    }, app.get('secret'))

    res.send({
      code: 1,
      token
    })
  })


  //上传图片
  let multer = require('multer')
  let upload = multer({
    dest: './tmp/'
  })
  // 腾讯云COS
  let COS = require('cos-nodejs-sdk-v5');

  let cos = new COS({
    SecretId: 'AKIDBk6CtMEePxe8MKCewynOkqhKhpiNn4Yn',
    SecretKey: 'DF2Y5OREn8E5h3D8qJYaMs8anob9SVO2'
  });

  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
    //之所以可以用req.file获取到文件数据，是因为用multer库的upload.single('file')将file参数赋值到req上
    let file = req.file
    //文件路径
    let FilePath = file.path;
    //文件名
    let fileName = file.filename
    var time = new Date().getTime();

    //上传文件至腾讯云COS
    cos.sliceUploadFile({
      Bucket: 'moba-site-1257106288',
      Region: 'ap-chengdu',
      Key: `${fileName}${time}.jpg`,
      FilePath
    }, (err, data) => {
      err && res.status(403).send({ code: 0, msg: err });
      res.send({ code: 1, data: `https://${data.Location}` });
    });
  })
}