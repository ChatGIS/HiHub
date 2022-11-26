const Router = require('koa-router')
const { crawlInfo } = require('../controller/crawl.controller')

const router = new Router({ prefix: '/crawls' })

// 爬虫接口
router.get('/crawlInfo', crawlInfo)

module.exports = router 