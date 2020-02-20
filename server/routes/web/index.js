// 用于移动端的接口
module.exports = (app) => {
  // 实例化一个路由
  const router = require('express').Router()
  // 引入 Category 模型
  const Category = require('../../models/Category')
  // 引入 Article 模型
  const Article = require('../../models/Article')
  // 引入 Hero 模型
  const Hero = require('../../models/Hero')
  // 引入 Carousel 模型
  const Carousel = require('../../models/Carousel')
  const Rune = require('../../models/Rune')
  const Item = require('../../models/Item')

  // 获取首页轮播图
  router.get('/home/carousel', async (req, res) => {
    const data = await Carousel.find()
    res.send(data)
  })

  // 获取新闻资讯分类列表
  router.get('/news/list', async (req, res) => {
    // 顶级分类
    const parent = await Category.findOne({
      name: '新闻资讯'
    })

    // 聚合查询
    const categories = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        // 类似于关系数据库里的 join 做外连接查另外一个集合
        $lookup: {
          // 关联哪个表/集合（集合的名字和模型名一一对应，默认情况下，是小写+复数形式，如 模型名：Article，集合名：articles）
          from: 'articles',
          // localField 对应 foreignField
          localField: '_id',
          foreignField: 'categories',
          // 起名为
          as: 'newsList'
        }
      },
      {
        $addFields: {
          // 修改 newsList 数据
          newsList: {
            // newsList 中的数据最多 5 个
            $slice: ['$newsList', 5]
          }
        }
      }
    ])

    const subCategories = categories.map(item => item._id)
    categories.unshift({
      name: '热门',
      newsList: await Article.find().where({
        categories: { $in: subCategories }
      }).populate('categories').limit(5).lean()
    })

    categories.map(category => {
      category.newsList.map(item => {
        item.categoryName = category.name === '热门' ? item.categories[0].name : category.name
        return item
      })
      return category
    })

    res.send(categories)
  })

  // 获取最新英雄
  router.get('/heroes/newest', async (req, res) => {
    const data = await Hero.find().populate('categories').sort({ createdAt: -1 }).limit(1)
    res.send(data[0])
  })

  // 获取英雄列表
  router.get('/heroes/list', async (req, res) => {
    // 查找英雄分类
    const parent = await Category.findOne({
      name: '英雄列表'
    })

    // 聚合查询
    const categories = await Category.aggregate([
      // 查找 parent id 为英雄分类的分类
      { $match: { parent: parent._id } },
      {
        // 类似于关系数据库里的 join 做外连接查另外一个集合
        $lookup: {
          // 关联哪个表/集合（集合的名字和模型名一一对应，默认情况下，是小写+复数形式，如 模型名：Article，集合名：articles）
          from: 'heroes',
          // 本地字段也就是 category 模型里字段是 _id
          localField: '_id',
          // 外键字段是 heroes 里的 categories 
          foreignField: 'categories',
          // 起名为
          as: 'heroList'
        }
      }
    ])

    const subCategories = categories.map(item => item._id)
    categories.unshift(
      {
        name: '热门',
        heroList: await Hero.find().where({
          categories: { $in: subCategories }
        }).limit(10).lean()
      },
      {
        name: '全部',
        heroList: await Hero.find()
      })

    res.send(categories)
  })

  // 获取英雄详细信息
  router.get('/heroes/info/:id', async (req, res) => {
    const data = await Hero.findById(req.params.id).populate(['rune', 'items1', 'items2', 'partners.hero', 'control.hero', 'controledBy.hero'])
    res.send(data)
  })

  // 获取文章详情
  router.get('/articles/:id', async (req, res) => {
    let data = await Article.findById(req.params.id)
    // 查找两条分类一样的文章作为推荐文章
    let related = await Article.find().where({
      categories: { $in: data.categories }
    }).limit(2)
    res.send({
      data,
      related
    })
  })

  // 接口通用前缀
  app.use('/web/api', router)

}