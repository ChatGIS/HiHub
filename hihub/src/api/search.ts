import request from './request.js'

export const addSearchLog = (data: any) => {
    return request({
        url: 'search',
        method: 'post',
        data,
    })
}
