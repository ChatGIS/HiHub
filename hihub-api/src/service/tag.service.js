const {QueryTypes} = require('sequelize')
const User = require('../model/user.model')
const seq = require('../db/seq')

class TagService {
    async getTagOfPost() {
        // sql
        const sql = 'select t.*, rpt.id as rpt_id from sys_tag t left join (select * from rel_post_tag where postid = 3921) rpt on t.id = rpt.tagid'
        const res = await seq.query(sql, { type: QueryTypes.SELECT })
        return res
    }
}

module.exports = new TagService()