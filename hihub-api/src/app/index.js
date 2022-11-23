const Koa = require('koa')
const { koaBody } = require('koa-body');
cors = require('koa2-cors')

const router = require('../router')
const response = require('../middleware/response')

const app = new Koa()

app.use(cors())
app.use(koaBody())
app.use(response())
app.use(router.routes()).use(router.allowedMethods())

module.exports = app