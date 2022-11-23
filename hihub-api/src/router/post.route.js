const Router = require('koa-router')
const { getPosts } = require('../controller/post.controller')

const router = new Router({ prefix: '/posts' })

// 获取所有帖子
router.get('/getPosts', getPosts)

module.exports = router