const { getTagOfPost, getTags, addTag, addRelPostTag, deleteRelPostTag } = require('../service/tag.service')

class TagController {
    // 获取某个帖子的标签
    async getTagOfPost(ctx, next) {
        const postId = ctx.query.id
        const res = await getTagOfPost(postId)
        ctx.success({
            tags: res
        }, '查询标签成功')
    }
    // 获取所有标签
    async getTags(ctx, next) {
        const res = await getTags()
        ctx.success({
            tags: res
        }, '查询所有标签成功')
    }
    // 添加标签
    async addTag(ctx, next) {
        const tagName = ctx.request.body.tagName
        const res = await addTag(tagName)
        if (!res) {
            ctx.fail('已存在改标签')
        } else {
            ctx.success({
                tag: res
            }, '添加标签成功, id为' + res)
        }
    }
    // 添加帖子标签关系
    async addRelPostTag(ctx, next) {
        const postId = ctx.query.postId
        const tagId = ctx.query.tagId
        const res = await addRelPostTag(postId, tagId)
        if (!res) {
            ctx.fail('已存在该帖子与标签的对应关系')
        } else {
            ctx.success({
                tag: res
            }, '添加帖子与标签的对应关系成功, 关系id为' + res)
        }
    }
    // 删除帖子标签关系
    async deleteRelPostTag(ctx, next) {
        const postId = ctx.query.postId
        const tagId = ctx.query.tagId
        const res = await deleteRelPostTag(postId, tagId)
        if (!res) {
            ctx.fail('删除失败')
        } else {
            ctx.success({
                is_deleted: true
            }, '删除成功')
        }
    }
}

module.exports = new TagController()