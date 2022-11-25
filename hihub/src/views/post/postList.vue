<script setup lang='ts'>
import { getPosts } from '@/api/post'
import { ref, reactive, computed } from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter()
// 定义Post
interface Post {
    id: number
    postid: string
    name: string
    posturl: string
    status_img: number
    weburl: string
}
// 帖子数据
const posts: Post[] = reactive([])
const totalPost = ref(0)
// 查询条件
const queryParam = reactive({
    query: '',
    pagenum: 1,
    pagesize: 20,
    tags: [0],
})
// 初始化获取帖子数据
const initPosts = async () => {
    const res = await getPosts(queryParam)
    posts.length = 0
    posts.push(...res.posts)
    totalPost.value = res.total
}
initPosts()
// 表格高度
const tableHeight = computed(() => {
    return (window.innerHeight - 129) + 'px'
})
// 分页page-size改变时触发
const handleSizeChange = () => {
    initPosts()
}
// 分页current-page 改变时触发
const handleCurrentChange = () => {
    initPosts()
}
// 表格状态函数
const tableRowClassName = ({ row
}: {
    row: Post
}) => {
    if (row.status_img === 1) {
        return 'warning-row'
    } else if (row.status_img === 2) {
        return 'success-row'
    }
    return ''
}
// 打开帖子的图片
const openImageByPostId = (id: number, name: string) => {
    router.push({
        name: 'post-image',
        params: {
            id,
            name
        }
    })
}
</script>

<template>
    <div>
        <el-table :data="posts" style="width: 100%" size="small" :height="tableHeight"
            :row-class-name="tableRowClassName">
            <el-table-column prop="id" label="ID" width="50" />
            <el-table-column label="名称">
                <template #default="scope">
                    <el-button link size="small" @click="openImageByPostId(scope.row.id, scope.row.name)">
                        {{ scope.row.name }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column label="原始地址">
                <template #default="scope">
                    <el-link :href="scope.row.weburl + scope.row.posturl" target="_blank">{{ scope.row.weburl +
                            scope.row.posturl
                    }}</el-link>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="queryParam.pagenum" v-model:page-size="queryParam.pagesize"
            :page-sizes="[20, 50, 100, 200]" small="true" background="true"
            layout="total, sizes, prev, pager, next, jumper" :total="totalPost" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
</template>

<style scoped>
.el-table :deep(.warning-row) {
    --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table :deep(.success-row) {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>