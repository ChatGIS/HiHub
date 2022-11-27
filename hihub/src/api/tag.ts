import request from '@/api/request'
// 获取所有标签
export const getTags = () => {
    return request({
        url: '/tags/getTags',
    })
}
// 获取某个帖子的标签
export const getTagOfPost = (params: any) => {
    return request({
        url: '/tags/getTagOfPost',
        params,
    })
}
// 添加帖子标签关系
export const addRelPostTag = (params: any) => {
    return request({
        method: 'post',
        url: '/tags/relPostTag',
        params,
    })
}
// 添加帖子标签关系
export const deleteRelPostTag = (params: any) => {
    return request({
        method: 'delete',
        url: '/tags/relPostTag',
        params,
    })
}

