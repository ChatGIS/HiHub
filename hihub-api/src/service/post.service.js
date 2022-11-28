const { QueryTypes } = require('sequelize')
const seq = require('../db/seq')

class PostService {
    // 获取帖子总数
    async getPostTotalNum() {
        const sqlCount = `select count(id) as num from post`
        const resCount = await seq.query(sqlCount, { type: QueryTypes.SELECT })
        return {
            total: resCount[0].num,
        }
    }
    // 分页查询帖子
    async getPosts(searchWord, startNum, pageSize, tags, tagLength) {debugger
        const sqlBasic = `select p.*, GROUP_CONCAT(rpt.tagid) as tagIds, GROUP_CONCAT(t.name) as tagNames, w.url as weburl from post p`
        + ` left join rel_post_tag rpt on rpt.postid = p.id`
        + ` left join sys_tag t on rpt.tagid = t.id`
        + ` left join website w on p.webid = w.id`
        + ` where p.name like '%${searchWord}%'` 
        const sqlTag = sqlBasic + ` and rpt.tagid in (${tags}) GROUP BY p.id HAVING count(p.id) = ${tagLength}`
        const sqlNoTag = sqlBasic + ` GROUP BY p.id`
        let sqlCount = '', sqlPage = ''
        if(tags === '0') {
            sqlCount = sqlNoTag
            sqlPage = sqlNoTag + ` limit ${pageSize} offset ${startNum}`
        } else {
            sqlCount = sqlTag
            sqlPage =  sqlTag + ` limit ${pageSize} offset ${startNum}`
        }
        const resCount = await seq.query(sqlCount, { type: QueryTypes.SELECT })
        const resPage = await seq.query(sqlPage, { type: QueryTypes.SELECT })
        debugger
        return {
            total: resCount.length,
            posts: resPage
        }
    }
}

module.exports = new PostService()