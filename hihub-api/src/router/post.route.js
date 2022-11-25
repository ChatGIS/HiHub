const Router = require('koa-router')
const { getPosts, getPostTotalNum } = require('../controller/post.controller')

const router = new Router({ prefix: '/posts' })

// 获取帖子总数
router.get('/getPostTotalNum', getPostTotalNum)
// 分页查询帖子
router.get('/getPosts', getPosts)

module.exports = router 