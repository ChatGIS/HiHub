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
        const tags = ctx.query.tags
        const startNum = (pageNum - 1) * pageSize
        const serachWord = ctx.query.query
        // ['1', '2'] 转为 "1,2"
        let arrTags = tags.substr(1, tags.length - 2).split(',')
        arrTags = arrTags.map(Number)
        const tagLength = arrTags.length
        const stringTags = arrTags.join(',')
        const res = await getPosts(serachWord, startNum, pageSize, stringTags, tagLength)
        ctx.success(res, '查询帖子成功')
    }
}

module.exports = new PostController()