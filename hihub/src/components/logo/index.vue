<template>
    <div class="logo-container">
        <el-image class="logo-image" :src="imgBread" :fit="fitVal" />
        <span class="logo-text">面包导航</span>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import imgBread from '../../assets/images/bread_618.png'

const fitVal = ref('fit')
</script>

<style scoped>
.logo-container {
    vertical-align: center;
}
.logo-image {
    display: inline-block;
    height: 54px;
    width: 54px;
}
.logo-text {
    font-family: STHupo;
    font-size: x-large;
    vertical-align: super;
}
</style>
