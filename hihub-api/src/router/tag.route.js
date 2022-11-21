const Router = require('koa-router')
const { getTagOfPost, getTags, addTag } = require('../controller/tag.controller')

const router = new Router({ prefix: '/tags' })

// 获取所有标签
router.get('/getTags', getTags)
// 获取某个帖子的标签
router.get('/getTagOfPost', getTagOfPost)
// 添加标签
router.post('/tag', addTag)

module.exports = router