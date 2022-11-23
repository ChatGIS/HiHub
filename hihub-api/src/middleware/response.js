module.exports = (option = {}) => {
    return async (ctx, next) => {
        ctx.success = (data, msg, code) => {
            ctx.type = option.type || 'json'
            ctx.body = {
                meta: {
                    status: code || option.successCode || 200,
                    msg: msg || option.successMsg || 'success'
                },
                data: data
            }
        }

        ctx.fail = (msg, code) => {
            ctx.type = option.type || 'json'
            ctx.body = {
                meta: {
                    status: code || option.failCode || 99,
                    msg: msg || option.successMsg || 'fail'
                }
            }
        }

        await next()
    }

}