const Router = require('koa-router')
const { getTagOfPost } = require('../controller/tag.controller')

const router = new Router({ prefix: '/tags' })

// 获取某个帖子的标签
router.get('/getTagOfPost', getTagOfPost)

module.exports = router