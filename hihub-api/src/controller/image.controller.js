const { getImageTotalNum, getImageByPostId } = require('../service/image.service')

class ImageController {
    // 获取图片总数
    async getImageTotalNum(ctx, next) {
        const res = await getImageTotalNum()
        ctx.success(res, '获取图片总数成功')
    }
    // 通过帖子ID获取帖子对应的图片
    async getImageByPostId(ctx, next) {
        const id = parseInt(ctx.query.id)
        const res = await getImageByPostId(id)
        ctx.success(res, '获取图片成功')
    }
}

module.exports = new ImageController()