const { QueryTypes } = require('sequelize')
const seq = require('../db/seq')

class TagService {
    // 获取某个帖子的标签
    async getTagOfPost(postId) {
        const sql = `select t.*, rpt.id as rpt_id from sys_tag t left join (select * from rel_post_tag where postid = ${postId}) rpt on t.id = rpt.tagid`
        const res = await seq.query(sql, { type: QueryTypes.SELECT })
        return res
    }

    // 获取所有标签
    async getTags() {
        const sql = `select * from sys_tag`
        const res = await seq.query(sql, { type: QueryTypes.SELECT })
        return res
    }

    // 添加标签
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

    // 添加帖子标签关系
    async addRelPostTag(postId, tagId) {
        const sqlSelect = `select * from rel_post_tag where postid = '${postId}' and tagid = ${tagId}`
        const sqlInsert = `insert into rel_post_tag (postid, tagid) value('${postId}', ${tagId})`
        const res = await seq.query(sqlSelect, { type: QueryTypes.SELECT })
        if(res.length === 0){
            const resInsert = await seq.query(sqlInsert, { type: QueryTypes.INSERT })
            return resInsert[0]
        } else {
            return false
        }
    }

    // 删除帖子标签关系
    async deleteRelPostTag(postId, tagId) {
        const sqlDelete = `delete from rel_post_tag where postid = '${postId}' and tagid = ${tagId}`
        const [res, meta] = await seq.query(sqlDelete)
        if(res.affectedRows === 1){
            return true
        } else {
            return false
        }
    }
}
module.exports = new TagService()