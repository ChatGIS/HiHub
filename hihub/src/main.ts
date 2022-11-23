import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'
import './assets/styles/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 创建pinia实例
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(pinia) // pinia挂载到 vue 根实例
    .use(router)
    .mount('#app')
