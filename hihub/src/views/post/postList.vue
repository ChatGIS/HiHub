<script setup lang='ts'>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getPosts } from '@/api/post'
import { getTags } from '@/api/tag'

const router = useRouter()
// 定义Post
interface Post {
    id: number
    postid: string
    name: string
    posturl: string
    status_img: number
    weburl: string,
    tagIds: string
}
interface Tag {
    id: number
    name: string
    pid: number
    orders: number
}
// 帖子数据
const posts: Post[] = reactive([])
const tags: Tag[] = reactive([])
const totalPost = ref(0)
const checkboxGroupTag = ref([])
const currentRowId = ref(0)
// 查询条件
const queryParam = reactive({
    query: '',
    pagenum: 1,
    pagesize: 14,
    tags: ''
})
// 初始化获取帖子数据
const initPosts = async () => {
    const res = await getPosts(queryParam)
    posts.length = 0
    posts.push(...res.posts)
    totalPost.value = res.total
}
// 初始化获取标签
const initTags = async () => {
    const res = await getTags()
    tags.push(...res.tags)
}
initPosts()
initTags()
// 表格高度
const tableHeight = computed(() => {
    return (window.innerHeight - 212) + 'px'
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
// 改变标签选择
const changeTagGroup = () => {
    queryParam.tags = JSON.stringify(checkboxGroupTag.value)
    initPosts()
}
// 改变选中行的样式
const changeCurrentRow = (row: any) => {
    if (currentRowId.value === row.id) return
    currentRowId.value = row.id
}
// 选中行样式
const rowStyle = ({ row }: { row: any }) => {
    if (currentRowId.value === row.id) {
        return {
            'background-color': 'rgb(94, 180, 251)',
            'color': 'rgb(255, 255, 255)'
        }
    }
}
</script>

<template>
    <div>
        <el-card>
            <el-row>
                <el-col :span="8">
                    <el-input v-model="queryParam.query" clearable />
                    <el-button type="primary" @click="initPosts">搜索</el-button>
                </el-col>
                <el-col :span="16">
                    <el-checkbox-group v-model="checkboxGroupTag">
                        <el-checkbox-button v-for="item in tags" :key="item.id" :label="item.id"
                            @change="changeTagGroup">{{
                                    item.name
                            }}</el-checkbox-button>
                    </el-checkbox-group>
                </el-col>
            </el-row>
        </el-card>
        <el-table :data="posts" style="width: 100%" size="small" :height="tableHeight"
            :row-class-name="tableRowClassName" :row-style="rowStyle" @row-click="changeCurrentRow">
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
            <el-table-column prop="tagNames" label="标签" width="100" />
        </el-table>
        <el-pagination v-model:current-page="queryParam.pagenum" v-model:page-size="queryParam.pagesize"
            :page-sizes="[14, 50, 100, 200]" small="true" background="true"
            layout="total, sizes, prev, pager, next, jumper" :total="totalPost" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
</template>

<style scoped>
.el-input {
    width: 70%;
    margin: 0 40px 0 0;
}

.el-card {
    margin-bottom: 10px;
}

.el-table :deep(.warning-row) {
    --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table :deep(.success-row) {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>