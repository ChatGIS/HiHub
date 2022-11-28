<script setup lang='ts'>
import { getImagesByPostId } from '@/api/post'
import { getTagOfPost, addRelPostTag, deleteRelPostTag } from '@/api/tag'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const postName = router.currentRoute.value.params.name
const postId = router.currentRoute.value.params.id

interface Image {
    id: number
    postid: number
    orders: number
    url: string
}
interface Tag {
    id: number
    name: string
    orders: number
    pid: number
    rpt_id: number
}

const images: Image[] = reactive([])
const tags: Tag[] = reactive([])
const isShowGrid = ref(true)
// 请求参数
const queryParam = reactive({
    id: postId.toString()
})
// 添加关系参数
const paramAdd = reactive({
    postId: postId.toString(),
    tagId: '0'
})
// 初始化图片
const initImages = async () => {
    const res = await getImagesByPostId(queryParam)
    images.push(...res.images)
}
// 初始化标签
const initTags = async () => {
    const res = await getTagOfPost(queryParam)
    tags.push(...res.tags)
}
initImages()
initTags()

// 改变图片布局函数
const changeImageLayout = () => {
    isShowGrid.value = !isShowGrid.value
}
// 标签选择框改变函数
const changeTagCheck = async (isChecked: boolean, tagId: number) => {
    console.log(isChecked)
    console.log(tagId)
    paramAdd.tagId = tagId.toString()
    if (isChecked) {
        const res = await addRelPostTag(paramAdd)
        if (res.tag > 0) {
            ElMessage({
                message: '成功添加标签',
                type: 'success',
            })
        }
    } else {
        const res = await deleteRelPostTag(paramAdd)
        if (res.is_deleted) {
            ElMessage('成功删除标签')
        }
    }
}
// 切换到上一页或下一页图片
const toOtherPostImage = (index: number) => {
    const currentPostId = parseInt(postId.toString())
    let id = currentPostId
    let name = ''
    if(index === -1){
        id = currentPostId - 1
    } else {
        id = currentPostId + 1
    }
    router.replace({
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
        <el-row>
            <el-col :span="6">
                <el-affix :offset="200">
                    <el-button-group>
                        <el-button type="primary" @click="toOtherPostImage(-1)">
                            <el-icon>
                                <ArrowLeft />
                            </el-icon>上一个
                        </el-button>
                        <el-button type="primary" @click="toOtherPostImage(1)">
                            下一个<el-icon>
                                <ArrowRight />
                            </el-icon>
                        </el-button>
                    </el-button-group>
                    <h3>{{ postName }}</h3>
                    <div style="margin: 0 0 15px 0">
                        <el-icon @click="changeImageLayout" :size="25">
                            <Grid v-show="!isShowGrid" />
                            <Iphone v-show="isShowGrid" />
                        </el-icon>
                    </div>
                    <div>
                        <el-checkbox v-for="item in tags" :key="item.id" :checked="item.rpt_id > 0" :label="item.name"
                            size="large" border @change="changeTagCheck($event, item.id)" />
                    </div>
                </el-affix>
            </el-col>
            <el-col :span="18">
                <el-image v-for="item in images" :key="item.id" :src="item.url" fit="contain" v-show="!isShowGrid" />
                <el-popover placement="right" :width="600" trigger="click" v-for="item in images" :key="item.id">
                    <template #reference>
                        <el-image :src="item.url" fit="fill" v-show="isShowGrid" style="width: 20%" />
                    </template>
                    <el-image :src="item.url" fit="contain" />
                </el-popover>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.el-checkbox {
    margin: 10px 2px
}
</style>