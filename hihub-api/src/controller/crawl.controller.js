const { getPostByPostUrl, addPost } = require('../service/post.service')
const { getWebsiteById } = require('../service/website.service')
const cheerio = require('cheerio')
const charset = require('superagent-charset')
const superagent = charset(require('superagent'))

class CrawlController {
    // 信息爬取
    async crawlInfo(ctx, next) {
        let res = null
        const webId = ctx.query.webId
        const resWeb = await getWebsiteById(webId)
        const webName = resWeb.website[0].name
        const webUrl = resWeb.website[0].url
        if(webName === '1024') {
            const type = ctx.query.type
            if(type === 'post') {
                const pageNum = ctx.query.pageNum
                const pageSize = ctx.query.pageSize
                res = crawlPost1024(webUrl, pageNum, pageSize)
                ctx.success(res, '爬取成功')
            }
        }
        
    }

    
}

const crawlPost1024 = async (rootUrl, num, size) => {
    let url = `${rootUrl}thread.php?fid=15&page=${num}`;
    superagent.get(url).charset('utf-8').buffer(true).end(async (err, data) => { //页面获取到的数据        
        if (err) {
            console.log('页面不存在', err)
            ctx.fail(`请求失败：${url}`)
        }

        let html = data.text,
        $ = cheerio.load(html, {
            decodeEntities: false,
            ignoreWhitespace: false,
            xmlMode: false,
            lowerCaseTags: false
        }),//用cheerio解析页面数据
        arrPost = [];

        $("tbody").eq(3).find("h3").each((index, element) => {
          let $element = $(element);
          let name = $element.children() ? $element.children().first().text() : "";
          let url = $element.children() ? $element.children().first().attr('href') : "";
        //   name = name.substring(8, name.length);
          let create_time = Math.round(new Date().getTime()/1000).toString();
          let indexThree = "@@@";
          if(0 <= index && index <= 9){
            indexThree = `00${index}`
          } else if(10 <= index && index <= 99){
            indexThree = `0${index}`
          } else {
              indexThree = index
          }
          let nowTime = Math.round(new Date().getTime()/1).toString();
          let idPost = `${nowTime}${indexThree}`;
          if(name){
            arrPost.push({
                'postid': idPost,
                'name': name,
                'posturl': url,
                'create_time': create_time,
                'webid': 1
              })
          }  
        })

        for(i = 0; i < 1; i++){
            // for(i = 0; i < arrPost.length; i++){
            const findRes = await getPostByPostUrl(arrPost[i].posturl)
            console.log(findRes)
            
            if (findRes.length > 0) {
                console.log("数据已存在");
                // if(i == arrPost.length -1 && page > 0){
                //     console.log(`--------------------------------------------------下一页啦：${page -1}`);
                //     getInfoByPage(ctx, page-1)
                // }
            } else {
                // 写入库
                // await knex('posts')
                // .returning('id')
                // .insert(arrPost[i])
                // .then(res => {
                //     debugger
                //     console.log('success', res)
                //     if(res.length == 1){
                //         if(i == arrPost.length -1  && page > 0){
                //             console.log(`--------------------------------------------------下一页啦：${page -1}`);
                //             getInfoByPage(ctx, page-1)
                //         }
                //     }
                // })
                addPost(arrPost[i])
            }
        }
        
        
    });
}

module.exports = new CrawlController()