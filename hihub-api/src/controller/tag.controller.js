const { getTagOfPost, getTags, addTag } = require('../service/tag.service')

class TagController {
    async getTagOfPost(ctx, next) {
        const postId = ctx.query.postId
        const res = await getTagOfPost(postId)
        ctx.success({
            tags: res
        }, '查询标签成功')
    }
    
    async getTags(ctx, next) {
        const res = await getTags()
        ctx.success({
            tags: res
        }, '查询所有标签成功')
    }

    async addTag(ctx, next) {debugger
        const tagName = ctx.request.body.tagName
        const res = await addTag(tagName)
        if(!res) {
            ctx.fail('已存在改标签')
        } else {
            ctx.success({
                tag: res
            }, '添加标签成功, id为' + res)
        }
    }
}

module.exports = new TagController()