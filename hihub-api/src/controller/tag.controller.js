const { getTagOfPost } = require('../service/tag.service')

class TagController {
    async getTagOfPost(ctx, next) {
        const res = await getTagOfPost()
        ctx.success({
            tags: res
        }, '查询标签成功')
    }
}

module.exports = new TagController()