//资源中间件
module.exports = () => async (req, res, next) => {
  /**获取resource字段是接口的名称，如category，由于接口名称和模型名称是一样的，除了模型名称
  * 的首字母需要大写。后面需要操作模型，因为需要获取接口地址把接口地址的首字母转成大写
 */
  let model = req.params.resource
  //把首字母换成大写的，这样就获取到了模型名称
  model = model.charAt(0).toUpperCase() + model.slice(1)
  model = require(`../models/${model}`)
  req.Model = model
  next()
}