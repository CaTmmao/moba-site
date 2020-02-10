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

  // 获取首页轮播图
  router.get('/home/carousel', async (req, res) => {
    const data = await Carousel.find()
    res.send(data)
  })

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
      name: '新闻分类'
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

  // 导入英雄数据（英雄数据初始化，正式环境不使用）
  router.get('/hero/init', async (req, res) => {
    return
    let rawData = [{ "name": "战士", "heroes": [{ "name": "赵云", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg" }, { "name": "墨子", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg" }, { "name": "钟无艳", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg" }, { "name": "吕布", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg" }, { "name": "夏侯惇", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg" }, { "name": "曹操", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg" }, { "name": "典韦", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg" }, { "name": "宫本武藏", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg" }, { "name": "达摩", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg" }, { "name": "老夫子", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg" }, { "name": "关羽", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg" }, { "name": "程咬金", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg" }, { "name": "露娜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg" }, { "name": "花木兰", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg" }, { "name": "橘右京", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg" }, { "name": "亚瑟", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg" }, { "name": "孙悟空", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg" }, { "name": "刘备", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg" }, { "name": "钟馗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg" }, { "name": "杨戬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg" }, { "name": "雅典娜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg" }, { "name": "哪吒", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg" }, { "name": "铠", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg" }, { "name": "苏烈", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg" }, { "name": "裴擒虎", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg" }, { "name": "狂铁", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg" }, { "name": "孙策", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg" }, { "name": "李信", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg" }, { "name": "盘古", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg" }, { "name": "云中君", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg" }, { "name": "曜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/522/522.jpg" }, { "name": "马超", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg" }] }, { "name": "法师", "heroes": [] }, { "name": "坦克", "heroes": [] }, { "name": "刺客", "heroes": [] }, { "name": "射手", "heroes": [] }, { "name": "辅助", "heroes": [] }]

    // 英雄分类列表循环
    rawData.forEach(async category => {
      // 找出该英雄分类的相关分类信息
      const categoryInfo = await Category.findOne({
        // 通过英雄名查找
        name: category.name
      })

      // 给每个英雄添加一个分类信息字段
      category.heroes.map(hero => {
        hero.categories = [categoryInfo]
        return hero
      })

      // 将数据插入到数据库中
      await Hero.insertMany(category.heroes)
    })

    res.send(await Hero.find())
  })

  // 获取英雄列表
  router.get('/heroes/list', async (req, res) => {
    // 查找英雄分类
    const parent = await Category.findOne({
      name: '英雄分类'
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
    categories.unshift({
      name: '热门',
      heroList: await Hero.find().where({
        categories: { $in: subCategories }
      }).limit(10).lean()
    })

    res.send(categories)
  })

  // 获取英雄详细信息
  router.get('/heroes/info/:id', async (req, res) => {
    const data = await Hero.findById(req.params.id).populate('categories')
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