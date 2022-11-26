const { getPosts, getPostTotalNum } = require('../service/crawl.service')
const { getWebsiteById } = require('../service/website.service')

class CrawlController {
    // 信息爬取
    async crawlInfo(ctx, next) {
        const webId = ctx.query.webId
        const resWeb = await getWebsiteById(webId)
        const webName = resWeb.website[0].name
        if(webName === '1024') {
            console.log('爬取1024')
        }
        ctx.success(resWeb, '爬取请求')
    }
}

module.exports = new CrawlController()