import request from './request'

export const getPosts = (params: any) => {
    return request({
        url: 'posts/getPosts',
        params,
    })
}