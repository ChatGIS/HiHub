<script setup lang='ts'>
import { getImagesByPostId } from '@/api/post'
import { getTagOfPost } from '@/api/tag'
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

const images: Image[] = reactive([])
const isShowGrid = ref(true)
// 请求参数
const queryParam = reactive({
    id: postId.toString()
})

// 初始化图片
const initImages = async () => {
    const res = await getImagesByPostId(queryParam)
    images.push(...res.images)
}
// 初始化标签
const initTags = async () => {
    const res = await getTagOfPost(queryParam)
    console.log(res)
}
initImages()
initTags()

// 改变图片布局函数
const changeImageLayout = () => {
    isShowGrid.value = !isShowGrid.value
}
</script>

<template>
    <div>
        <el-row>
            <el-col :span="6">
                <el-affix :offset="200">
                    <h3>{{ postName }}</h3>
                    <div style="margin: 0 0 15px 0">
                        <el-icon @click="changeImageLayout" :size="25">
                            <Grid v-show="!isShowGrid" />
                            <Iphone v-show="isShowGrid" />
                        </el-icon>
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

</style>