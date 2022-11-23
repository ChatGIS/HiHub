<template>
    <div class="common-layout">
        <Type @selectedType="getTagSelected"></Type>
        <el-row>
            <el-col :span="6" v-for="(item, index) in websiteData" :key="index">
                <el-card shadow="hover" class="webcard">
                    <div class="webcard-img-title" @click="clickWeb(item.id, item.url)">
                        <el-row>
                            <el-col :span="8">
                                <el-avatar shape="square" :size="70" :src="item.favicon" />
                            </el-col>
                            <el-col :span="16">
                                <div style="height: 40px; font-size: 500">
                                    <span>{{ item.name }}</span>
                                </div>
                                <div>
                                    <el-tag type="success" size="small" v-for="aTag in item.tags_name.split(',')"
                                        :key="aTag" round>{{ aTag }}</el-tag>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <el-row class="webcard-desc" @click="clickWeb(item.id, item.url)">
                        <el-col> {{ item.description }}</el-col>
                    </el-row>
                    <el-divider />
                    <el-row class="webcard-click">
                        <el-col :span="8">
                            <el-tooltip class="box-item" effect="light" content="点击量" placement="top">
                                <div>
                                    <el-icon>
                                        <Pointer />
                                    </el-icon>
                                    <span style="margin-left: 5px">{{ item.num_click }}</span>
                                </div>
                            </el-tooltip>
                        </el-col>
                        <el-col :span="8">
                            <el-tooltip class="box-item" effect="light" content="收藏量" placement="top">
                                <div>
                                    <el-icon><CollectionTag /></el-icon>
                                    <span style="margin-left: 5px">{{ item.num_click - Math.round(Math.random() * 10) }}</span>
                                </div>
                            </el-tooltip>
                        </el-col>
                        <el-col :span="8">
                            <el-tooltip class="box-item" effect="light" content="分享" placement="top">
                                <div>
                                    <Share style="width: 1em; height: 1em; margin-right: 8px" />
                                </div>
                            </el-tooltip>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        <el-pagination v-model:currentPage="pageParam.pagenum" v-model:page-size="pageParam.pagesize"
            layout="prev, pager, next, jumper" :hide-on-single-page="isSinglePage" :total="total"
            @current-change="handleCurrentChange" />
    </div>
</template>

<script lang="ts" setup>
import Type from '../../components/type/index.vue'
import { getWebsite, clickWebsite } from '../../api/resource.js'
import { reactive, ref } from 'vue'

// 查询结果总数
const total = ref(0)
// 分页查询条件
const pageParam = ref({
    query: '',
    pagenum: 1,
    pagesize: 20,
    tags: [0],
})
// 查询结果是否只有一页，是则不显示分页组件
const isSinglePage = ref(true)
// 查询结果
const websiteData = ref([])
// 查询网站
const initGetWebsitesList = async (tagSelected: any) => {
    let tags = tagSelected ? tagSelected : []
    pageParam.value.tags = tags
    const res = await getWebsite(pageParam.value)
    total.value = res.total
    websiteData.value = res.websites
}
// 初始化查询
initGetWebsitesList([])

// 选择页码
const handleCurrentChange = (val: number) => {
    pageParam.value.pagenum = val
    initGetWebsitesList([])
}

// 点击网站
const clickWeb = (id: number, url: string) => {
    debugger
    window.open(url)
    clickWebsite(id)
}

// 获取标签值
const getTagSelected = (val: any) => {
    if (val.length == 1 && val.includes(0)) {
        val = []
    }
    initGetWebsitesList(val)
}
</script>

<style scoped>
.el-avatar {
    --el-avatar-text-color: #fff;
    --el-avatar-bg-color: #f4f6f7;
}

.webcard {
    height: 180px;
    margin: 5px;
}

.webcard-img-title {
    height: 80px;
    cursor: pointer;
}

.webcard-desc {
    height: 50px;
    font-size: 12px;
    color: #5CA8B5;
    cursor: pointer;
}

.el-divider--horizontal {
    margin: 2px 0;
}

.el-tag {
    margin: 0.1rem 0.1rem;
}
</style>
