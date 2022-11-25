import request from './request'

// 获取帖子
export const getPosts = (params: any) => {
    return request({
        url: 'posts/getPosts',
        params,
    })
}
// 获取帖子下的图片
export const getImagesByPostId = (params: any) => {
    return request({
        url: 'images/getImageByPostId',
        params,
    })
}