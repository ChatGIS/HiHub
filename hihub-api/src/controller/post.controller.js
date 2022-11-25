const { getPosts, getPostTotalNum } = require('../service/post.service')

class PostController {
    // 获取帖子总数
    async getPostTotalNum(ctx, next) {
        const res = await getPostTotalNum()
        ctx.success(res, '获取帖子总数成功')
    }
    // 分页查询帖子
    async getPosts(ctx, next) {
        const pageNum = parseInt(ctx.query.pagenum)
        const pageSize = parseInt(ctx.query.pagesize)
        const tag = parseInt(ctx.query.tag)
        const startNum = (pageNum - 1) * pageSize
        const serachWord = ctx.query.query
        const res = await getPosts(serachWord, startNum, pageSize)
        ctx.success(res, '查询帖子成功')
    }
}

module.exports = new PostController()