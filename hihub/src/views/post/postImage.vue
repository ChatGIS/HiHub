<script setup lang='ts'>
import { useRouter } from 'vue-router'
const router = useRouter()
console.log('image接受', router.currentRoute.value.params.id)
console.log('image接受', router.currentRoute.value.params.name)

</script>

<template>
    <div>
        <h1>image</h1>
    </div>
</template>

<style scoped>

</style>