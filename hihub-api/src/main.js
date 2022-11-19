const Koa = require('koa')

const app = new Koa()
app.use((ctx, next) => {
    ctx.body = 'hello node'
})

app.listen(3000, () => {
    console.log('HiHub-API server is running on port 3000');
})