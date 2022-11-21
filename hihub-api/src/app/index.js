const Koa = require('koa')
const { koaBody } = require('koa-body');

const userRouter = require('../router/user.route')
const tagRouter = require('../router/tag.route')

const app = new Koa()

app.use(koaBody())

app.use(userRouter.routes())
app.use(tagRouter.routes())

module.exports = app