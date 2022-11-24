<template>
    <el-menu class="menu" background-color="#000000" text-color="#fff" active-text-color="#ffd04b"
        :default-active="activeIndex" router="true" mode="horizontal" @select="handleSelect">
        <el-menu-item index="/dashbord">仪表盘</el-menu-item>
        <el-menu-item index="/post">资源帖</el-menu-item>
        <el-sub-menu index="2">
            <template #title>管理项</template>
            <el-menu-item index="2-1">帖子管理</el-menu-item>
            <el-menu-item index="2-2">图片管理</el-menu-item>
            <el-menu-item index="2-3">人员管理</el-menu-item>
            <el-sub-menu index="2-4">
                <template #title>蜘蛛管理</template>
                <el-menu-item index="2-4-1">1024</el-menu-item>
                <el-menu-item index="2-4-2">2048</el-menu-item>
                <el-menu-item index="2-4-3">测试</el-menu-item>
            </el-sub-menu>
        </el-sub-menu>
    </el-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMainStore } from '../../store'

const store = useMainStore()
const activeIndex = ref('/dashbord')
// 进入页面，根据进行store.activeMenu判断要触发的菜单
if (store.activeMenu == '') {
    store.activeMenu = activeIndex.value
} else {
    activeIndex.value = store.activeMenu
}
// 菜单切换，进行保存
const handleSelect = (key: string) => {
    activeIndex.value = key
    store.activeMenu = key
}
</script>

<style scoped>
.menu {
    flex: 1 0 auto;
    margin-left: 35px;
}
</style>
