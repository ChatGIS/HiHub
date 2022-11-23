<script setup lang='ts'>
import { reactive } from 'vue'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import { login } from '../api/login'
import router from '../router'
import { useMainStore } from '../store'

// 表单对象
const form = reactive({
    username: '',
    password: '',
})
// 获取状态管理容器
const store = useMainStore()
// 登录函数
const onSubmit = async () => {       
    await login(form).then((res) => {
        store.isLogin = true
        ElMessage({
            message: `欢迎回来，${res.username}`,
            type: 'success',
        })
        window.localStorage.setItem('mbToken', res.token)
        setTimeout(() => {
            router.go(-1) 
        }, 500)
    })
}
</script>

<template>
    <div id="login-container">
        <h2>面包导航-登录页面</h2>
        <el-form :model="form" label-width="120px">
            <el-form-item label="用户名">
                <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" type="password" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
                <el-button>退出</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
#login-container {
    position: absolute;
    top: 30%;
    left: 30%;
    width: 40%;
}
</style>