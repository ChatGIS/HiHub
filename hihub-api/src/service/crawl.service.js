const { QueryTypes } = require('sequelize')
const seq = require('../db/seq')

class CrawlService {
    // 分页查询帖子
    async getPosts(searchWord, startNum, pageSize) {
        const sqlCount = `select count(id) as num from post where name like '%${searchWord}%'`
        const sqlPage = `select p.*, w.url as weburl from post p left join website w on p.webid = w.id`
            + ` where p.name like '%${searchWord}%' limit ${pageSize} offset ${startNum}`
        const resCount = await seq.query(sqlCount, { type: QueryTypes.SELECT })
        const resPage = await seq.query(sqlPage, { type: QueryTypes.SELECT })
        return {
            total: resCount[0].num,
            posts: resPage
        }
    }
}

module.exports = new CrawlService()