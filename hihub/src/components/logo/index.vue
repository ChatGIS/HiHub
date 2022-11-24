<template>
    <div class="logo-container">
        <el-image class="logo-image" :src="logoHi" :fit="fitVal" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import logoHi from '@/assets/images/logo.png'

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
