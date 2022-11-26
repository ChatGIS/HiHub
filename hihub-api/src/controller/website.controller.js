const { getWebsitesCrawl, getWebsiteById } = require('../service/website.service')

class WebsiteController {
    // 获取所有爬取网站
    async getWebsitesCrawl(ctx, next) {
        const res = await getWebsitesCrawl()
        ctx.success(res, '成功获取需要爬取的网站')
    }
    // 根据网站Id获取网站
    async getWebsiteById(ctx, next) {
        const id = parseInt(ctx.query.id)
        const res = await getWebsiteById(id)
        ctx.success(res, '成功根据网站Id获取网站')
    }
}

module.exports = new WebsiteController()