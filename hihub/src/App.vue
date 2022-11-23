<template>
    <router-view></router-view>
</template>
<script setup lang="ts">
</script>
<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
.el-header {
    border-bottom: solid 1px #e6e6e6;
}
.header-container {
    display: flex;
}

#footer {
    background-color: #ffffff;
}

.el-main {
    min-height: 593px;
    background-color: #f4f5f5;
}

.el-menu--horizontal {
    border-width: 0;
}
.el-main {
    --el-main-padding: 0px;
}
</style>
