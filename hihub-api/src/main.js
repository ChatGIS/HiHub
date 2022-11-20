const Koa = require('koa')
const { APP_PORT } = require('./config/config.default')
const userRouter = require('./router/user.route')

const app = new Koa()

app.use(userRouter.routes())

app.listen(APP_PORT, () => {
    console.log(`HiHub-API server is running on port ${APP_PORT}`);
})