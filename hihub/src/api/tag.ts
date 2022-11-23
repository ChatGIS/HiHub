import request from './request.js'

export const getTag = (params: any) => {
    return request({
        url: 'tag',
        params,
    })
}
