const Koa = require('koa')
const { APP_PORT } = require('./config.default')

const app = new Koa()
app.use((ctx, next) => {
    ctx.body = 'hello node'
})

app.listen(APP_PORT, () => {
    console.log(`HiHub-API server is running on port ${APP_PORT}`);
})