const { QueryTypes } = require('sequelize')
const seq = require('../db/seq')

class TagService {
    async getTagOfPost(postId) {
        const sql = `select t.*, rpt.id as rpt_id from sys_tag t left join (select * from rel_post_tag where postid = ${postId}) rpt on t.id = rpt.tagid`
        const res = await seq.query(sql, { type: QueryTypes.SELECT })
        return res
    }

    async getTags() {
        const sql = `select * from sys_tag`
        const res = await seq.query(sql, { type: QueryTypes.SELECT })
        return res
    }

    async addTag(tagName) {
        const sqlSelect = `select * from sys_tag where name = '${tagName}'`
        const sqlInsert = `insert into sys_tag (name) value('${tagName}')`
        const res = await seq.query(sqlSelect, { type: QueryTypes.SELECT })
        if(res.length === 0){
            const resInsert = await seq.query(sqlInsert, { type: QueryTypes.INSERT })
            return resInsert[0]
        } else {
            return false
        }
    }
}

module.exports = new TagService()