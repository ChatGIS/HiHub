import request from './request'

// 登录请求
export const login = (params: any) => {
    return request({
        url: 'login',
        data: params,
        method: 'post',
    })
}