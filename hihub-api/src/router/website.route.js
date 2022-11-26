const Router = require('koa-router')
const { getWebsitesCrawl, getWebsiteById } = require('../controller/website.controller')

const router = new Router({ prefix: '/websites' })

// 获取所有爬取网站
router.get('/getWebsitesCrawl', getWebsitesCrawl)
// 根据网站Id获取网站
router.get('/getWebsiteById', getWebsiteById)

module.exports = router 