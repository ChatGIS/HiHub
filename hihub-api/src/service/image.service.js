const { QueryTypes } = require('sequelize')
const seq = require('../db/seq')

class ImageService {
    // 获取图片总数
    async getImageTotalNum(searchWord, startNum, pageSize) {
        const sqlCount = `select count(id) as num from image`
        const resCount = await seq.query(sqlCount, { type: QueryTypes.SELECT })
        return {
            total: resCount[0].num,
        }
    }
    // 通过帖子ID获取帖子对应的图片
    async getImageByPostId(id) {
        const sql = `select * from image where postid = ${id}`
        const res = await seq.query(sql, { type: QueryTypes.SELECT })
        return {
            images: res,
        }
    }
}

module.exports = new ImageService()