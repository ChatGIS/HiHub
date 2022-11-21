const { getTagOfPost } = require('../service/tag.service')

class TagController {
    async getTagOfPost(ctx, next) {
        const res = await getTagOfPost()
        ctx.body = res
    }
}

module.exports = new TagController()