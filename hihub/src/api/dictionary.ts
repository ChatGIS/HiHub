import request from './request.js'

export const getDict = () => {
    return request({
        url: 'dictionary',
    })
}
