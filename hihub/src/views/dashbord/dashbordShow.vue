<script setup lang='ts'>
import { ref } from 'vue'
import { getTotalNumOfPost, getTotalNumOfImage } from '@/api/post'

const numPost = ref(0)
const numImage = ref(0)

// 获取总数
const initTotalNum = async () => {
    const resPost = await getTotalNumOfPost()
    numPost.value = resPost.total
    const resImage = await getTotalNumOfImage()
    numImage.value = resImage.total
} 
initTotalNum()
</script>

<template>
    <div>
        <el-row>
            <el-col :span="8">
                <div class="div-num">
                    <el-card class="card-num" shadow="always" :body-style="{ 'background-color': '#2b73af' }">
                        <p>{{ numPost }}</p>
                        <p>帖子数</p>
                    </el-card>
                    <el-card class="card-num" shadow="always" :body-style="{ 'background-color': '#51c4d3' }">
                        <p>{{ numImage }}</p>
                        <p>图片数</p>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="8"></el-col>
            <el-col :span="8"></el-col>
        </el-row>
        <el-row>
            <el-col :span="8"></el-col>
            <el-col :span="8"></el-col>
            <el-col :span="8"></el-col>
        </el-row>
        <el-row>
            <el-col :span="8"></el-col>
            <el-col :span="8"></el-col>
            <el-col :span="8"></el-col>
        </el-row>
    </div>
</template>

<style scoped>
.div-num {
    display: flex;
    justify-content: space-around;
}

p {
    color: #FFFFFF;
    font-size: large;
}
.card-num {
    width: 45%;
}
.card-num p:first-child {
    font-size: 60px;
    margin: 20px 0;
}
</style>