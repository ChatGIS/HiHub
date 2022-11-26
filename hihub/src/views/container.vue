<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import router from '../router'
import { useMainStore } from '../store'

const store = useMainStore()
let loginOrOutText = ref('')

onMounted(() => {
    loginOrOutText.value = store.isLogin ? '退出登录' : '请登录'
})

// 登录或退出
const loginOrOut = () => {
    store.isLogin = !store.isLogin
    if (store.isLogin === true) {
        loginOrOutText.value = '退出登录'
    } else if (store.isLogin === false) {
        loginOrOutText.value = '请登录'
        window.localStorage.removeItem('mbToken')
    }
    router.push('/login')
}

</script>

<template>
    <el-container>
        <el-header id="hi-header">
            <div class="header-container">
                <Logo></Logo>
                <Menu></Menu>
                <!-- <el-button type="primary" @click="loginOrOut">{{ loginOrOutText }}</el-button> -->
            </div>
        </el-header>
        <el-main id="hi-main">
            <router-view v-slot="{ Component }">
                <transition>
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </transition>
            </router-view>
            <!-- <router-view></router-view> -->
        </el-main>
    </el-container>
</template>

<style scoped>
section {
    --header-height: 60px;
}

#hi-header {
    position: relative;
    height: var(--header-height);
    background-color: black;
}

#hi-main {
    position: absolute;
    top: 60px;
    height: calc(100% - var(--header-height));
    overflow-y: auto;
    width: 100%;
}
</style>