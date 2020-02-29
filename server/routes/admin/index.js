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
    //增加一级分类，删除 parent 字段
    !req.body.parent && delete req.body.parent

    //把客户端传递过来的数据存储在数据库中
    await req.Model.create(req.body, (err) => {
      err && res.send({ code: 0, msg: err.errmsg })
      res.send({ code: 1 })
    })
  })

  //删除
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id).exec((err, data) => {
      err && res.send({ code: 0, msg: err.errmsg })
      res.send({ code: 1 })
    })
  })

  //更新
  router.put('/:id', async (req, res) => {
    await req.Model.findByIdAndUpdate(req.params.id, req.body).exec((err, data) => {
      err && res.send({ code: 0, msg: err.errmsg })
      res.send({ code: 1 })
    })
  })

  /**
   * 查询数据
   * @param {number} page 当前页码
   * @param {number} pageSize 每页数据条数
   * @returns {arr} 数据列表
   */
  router.get('/', async (req, res) => {
    // 总条数 & 总页数 
    let totalCount, pages
    let { page, pageSize } = req.query

    totalCount = await req.Model.countDocuments()
    pages = Math.ceil(totalCount / pageSize)
    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 10

    await req.Model
      .find()
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec((err, data) => {
        // 出错
        err && res.send({ code: 0, msg: err.errmsg })
        res.send({ code: 1, page, totalCount, pages, pageSize, data })
      })
  })

  /**
   * 根据父级分类名查询子分类集合
   * @param {string} parentName 父级分类名
   * @returns {arr} 子分类数组
   */
  router.get('/category/subList', async (req, res) => {
    // 父级分类id & 查询参数
    let parentId, query
    // 父级分类名
    let { parentName } = req.query

    // 通过名称查询父级分类 id
    await req.Model.find({ name: parentName }).then(data => {
      if (data.length) {
        parentId = data[0]._id
      }

      query = {
        parent: parentId
      }
    })

    await req.Model
      .find(query)
      .exec((err, data) => {
        err && res.send({ code: 0, msg: err.errmsg })
        res.send({ code: 1, data })
      })
  })

  /**
   * 以树形结构返回所有分类列表   
   * @param {number} page 当前页码
   * @param {number} pageSize 每页数据条数
   * @returns {arr} 树形结构分类集合
   */
  router.get('/category/treeList', async (req, res) => {
    // 总条数 & 总页数 & 查询参数
    let totalCount, pages, query
    let { page, pageSize } = req.query

    query = {
      parent: undefined
    }

    totalCount = await req.Model.countDocuments(query)
    pages = Math.ceil(totalCount / pageSize)
    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 10

    // 根据条件查询数据
    await req.Model
      .aggregate([
        {
          $match: query
        },
        {
          $skip: (page - 1) * pageSize
        },
        { $limit: pageSize },
        {
          //递归查询，并添加 children 字段
          $graphLookup: {
            from: "categories",
            startWith: "$_id",
            connectFromField: "_id",
            connectToField: "parent",
            as: "children"
          }
        }
      ]).exec((err, data) => {
        // 出错
        err && res.send({ code: 0, msg: err.errmsg })
        res.send({ code: 1, page, totalCount, pages, pageSize, data })
      })
  })

  //通过id获取详情
  router.get('/:id', async (req, res) => {
    await req.Model.findById(req.params.id).exec((err, data) => {
      err && res.send({ code: 0, msg: err.errmsg })
      res.send({ code: 1, data })
    })
  })

  //注册
  app.post('/admin/api/register', async (req, res) => {
    //把客户端传递过来的数据存储在数据库中
    await Admin.create(req.body, (err) => {
      err && res.send({ code: 0, msg: '请求出错，请稍后再试' })
      res.send({ code: 1 })
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
        code: 101,
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
    SecretId: 'xxx',
    SecretKey: 'xxx'
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
      Bucket: 'xxx',
      Region: 'xxx',
      Key: `${fileName}${time}.jpg`,
      FilePath
    }, (err, data) => {
      err && res.status(403).send({ code: 0, msg: err.errmsg });
      res.send({ code: 1, data: `https://${data.Location}` });
    });
  })
}