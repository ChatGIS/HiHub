const { QueryTypes } = require('sequelize')
const seq = require('../db/seq')

class CrawlService {
    // 获取所有爬取网站
    async getWebsitesCrawl() {
        const sql = 'select * from website where is_crawl = 1'
        const res = await seq.query(sql, { type: QueryTypes.SELECT })
        return {
            websites: res
        }
    }
    // 分页查询帖子
    async getWebsiteById(id) {
        const sql = `select * from website where id = '${id}'`
        const res = await seq.query(sql, { type: QueryTypes.SELECT })
        return {
            website: res
        }
    }
}

module.exports = new CrawlService()