import request from '@/api/request'

export const getTagOfPost = (params: any) => {
    return request({
        url: '/tags/getTagOfPost',
        params,
    })
}

export const addRelPostTag = (params: any) => {
    return request({
        method: 'post',
        url: '/tags/relPostTag',
        params,
    })
}

export const deleteRelPostTag = (params: any) => {
    return request({
        method: 'delete',
        url: '/tags/relPostTag',
        params,
    })
}

