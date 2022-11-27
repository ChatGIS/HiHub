const Router = require('koa-router')
const { getTagOfPost, getTags, addTag, addRelPostTag, deleteRelPostTag } = require('../controller/tag.controller')

const router = new Router({ prefix: '/tags' })

// 获取所有标签
router.get('/getTags', getTags)
// 获取某个帖子的标签
router.get('/getTagOfPost', getTagOfPost)
// 添加标签
router.post('/tag', addTag)
// 添加帖子标签关系
router.post('/relPostTag', addRelPostTag)
// 删除帖子标签关系
router.delete('/relPostTag', deleteRelPostTag)
module.exports = router