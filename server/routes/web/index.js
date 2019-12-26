// 用于移动端的接口
module.exports = (app) => {
  // 实例化一个路由
  const router = require('express').Router()
  // 引入 Category 模型
  const Category = require('../../models/Category')
  // 引入 Article 模型
  const Article = require('../../models/Article')

  // 给文章列表生成数据作为初始化数据
  router.get('/news/init', async (req, res) => {
    return
    // 查找新闻资讯这一个分类
    const parentCategory = await Category.findOne({
      name: '新闻资讯'
    })

    // 查找新闻资讯下面的分类对象
    const categories = await Category.find().where({
      parent: parentCategory
    }).lean()

    // 标题
    const newsTitles = ["王者荣耀交响音乐会·原曲大赏（收听同款歌单）", "王者荣耀玩家的最佳聚集地，QQ音乐推出特色专区", "模拟战爆料丨换阵营，新天赋，还能“回转”拿BUFF？", "《王者荣耀》×QQ音乐︱快来王者荣耀音乐专区听歌啦！", "活动玩法爆料丨黄忠开大还能走，孙策能开三艘船？！"]

    const news = newsTitles.map(title => {
      // 分类的顺序随机
      const randomCategories = categories.slice(0).sort((a, b) => Math.random() - 0.5)
      return {
        // 返回前面两个
        categories: randomCategories.slice(0, 2),
        title
      }
    })

    // 清空 Article 模型中的数据
    await Article.deleteMany({})
    // 插入数据
    await Article.insertMany(news)

    res.send(news)
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

  // 接口通用前缀
  app.use('/web/api', router)

}