import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './index.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import * as Icons from '@ant-design/icons-vue';
const app = createApp(App)
for (const [key, component] of Object.entries(Icons)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)
app.use(Antd)
app.mount('#app')
