const { APP_PORT } = require('./config/config.default')
const app = require('./app/index')

app.listen(APP_PORT, () => {
    console.log(`HiHub-API server is running on port ${APP_PORT}`);
})