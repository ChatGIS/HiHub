<template>
    <div class="search-container">
        <el-input
            v-model="searchWord"
            placeholder="开始搜索吧"
            clearable
            @keyup.enter.native="openSearchTab('Bing')"
        />
        <el-button color="#5CA8B5" plain @click="openSearchTab('Bing')">Bing</el-button>
        <el-button color="#5CA8B5" plain @click="openSearchTab('Baidu')">Baidu</el-button>
        <el-button color="#5CA8B5" plain @click="openSearchTab('Google')">Google</el-button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { addSearchLog } from '../../api/search'
// 搜索关键词
const searchWord = ref('')
// 打开搜索tab页
// 按键enter搜索，默认bing
const openSearchTab = (type) => {
    // 为空提醒
    if (searchWord.value == '') {
        ElMessage({
            message: '请输入搜索关键词',
            type: 'warning',
        })
        return
    }
    // 根据类型使用不同的搜索引擎
    let url = 'https://cn.bing.com'
    if (type == 'Bing') {
        url = `https://cn.bing.com/search?q=${searchWord.value}`
    } else if (type == 'Baidu') {
        url = `https://kaifa.baidu.com/searchPage?wd=${searchWord.value}`
    } else {
        url = `https://www.google.com/search?q=${searchWord.value}`
    }
    window.open(url)
    // 记录搜索日志
    let searchObj = { word: searchWord.value }
    addSearchLog(searchObj)
}
</script>

<style scoped>
.search-container {
    flex: 1 0 auto;
    display: flex;
}
.el-input {
    padding-top: 12px;
}

.el-button {
    margin: 12px 6px;
}
</style>
