const { QueryTypes } = require('sequelize')
const seq = require('../db/seq')

class PostService {
    async getPosts(searchWord, startNum, pageSize) {
        // 获取所有帖子sql；用于获取帖子数
        const sqlCount = `select count(id) as num from posts where name like '%${searchWord}%'`
        const sqlPage = `select p.*, w.url as weburl from posts p left join website w on p.webid = w.id`
            + ` where p.name like '%${searchWord}%' limit ${pageSize} offset ${startNum}`
        const resCount = await seq.query(sqlCount, { type: QueryTypes.SELECT })
        const resPage = await seq.query(sqlPage, { type: QueryTypes.SELECT })
        return {
            total: resCount[0].num,
            posts: resPage
        }
    }
}

module.exports = new PostService()