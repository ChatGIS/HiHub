const Router = require('koa-router')
const { getImageTotalNum, getImageByPostId } = require('../controller/image.controller')

const router = new Router({ prefix: '/images' })

// 获取图片总数
router.get('/getImageTotalNum', getImageTotalNum)
// 通过帖子ID获取帖子对应的图片
router.get('/getImageByPostId', getImageByPostId)

module.exports = router