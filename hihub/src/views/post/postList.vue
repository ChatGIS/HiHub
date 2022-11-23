<script setup lang='ts'>
import { getPosts } from '@/api/post'
import { reactive } from 'vue'

const posts: any[] = reactive([])
const pageParam = reactive({
    query: '',
    pagenum: 1,
    pagesize: 20,
    tags: [0],
})

const initPosts = async () => {
    const res = await getPosts(pageParam)
    posts.push(...res.posts)

}
initPosts()
</script>

<template>
    <div>
        <el-table :data="posts" stripe style="width: 100%">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
        </el-table>
    </div>
</template>

<style scoped>

</style>