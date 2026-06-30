import { fileURLToPath, URL } from 'node:url'
import { viteMockServe } from 'vite-plugin-mock'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    viteMockServe({
      mockPath: 'mock', // mock 文件存放目录（默认 mock）
      localEnabled: true, // 开发环境启用 mock
      prodEnabled: false, // 生产环境禁用 mock
      watchFiles: true, // 监听 mock 文件变化，热更新
      logger: true, // 控制台打印请求日志
    }),
  ],
  base: "/easy_admin/",
  build: {
    outDir: "docs"
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
