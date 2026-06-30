<template>
  <a-layout style="height: 100vh; overflow: hidden;">
    <a-layout style="display: flex; flex-direction: column; width: 100%; height: 100%;">
      <!-- 顶部 Header -->
      <a-layout-header class="header">
        <div class="logo">Home</div>
        <div class="right">
          <a-button type="text" @click="logout">退出登录</a-button>
        </div>
      </a-layout-header>
      <!-- 中间部分：侧边栏 + 内容区 -->
      <div class="body-wrapper">
        <!-- 左侧侧边栏 -->
        <a-layout-sider v-model:collapsed="collapsed" collapsible style="height: 100%;">
          <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" theme="dark">
            <!-- 仪表盘 -->
            <a-menu-item key="/home/dashboard">
              <template #icon>
                <DashboardOutlined />
              </template>
              <router-link to="/home/dashboard">仪表盘</router-link>
            </a-menu-item>
            <a-menu-item key="/home/info">
              <router-link to="/home/info">个人信息管理</router-link>
            </a-menu-item>
            <!-- 数据大屏 -->
            <a-menu-item key="/data-screen">
              <template #icon>
                <MonitorOutlined />
              </template>
              <router-link to="/data-screen">数据大屏</router-link>
            </a-menu-item>

            <!-- 权限管理 -->
            <a-sub-menu key="sub-permission">
              <template #icon>
                <LockOutlined />
              </template>
              <template #title>权限管理</template>

              <a-menu-item key="/home/permission/role">
                <router-link to="/home/permission/role">角色管理</router-link>
              </a-menu-item>

              <a-menu-item key="/home/permission/menu">
                <router-link to="/home/permission/menu">菜单管理</router-link>
              </a-menu-item>

              <a-menu-item key="/home/permission/admin">
                <router-link to="/home/permission/admin">管理员管理</router-link>
              </a-menu-item>

            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <!-- 右侧内容区 -->
        <a-layout-content class="content">
          <router-view />
        </a-layout-content>
      </div>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import { DashboardOutlined, MonitorOutlined } from '@ant-design/icons-vue'

const router = useRouter()
const route = useRoute()
const collapsed = ref(false)

const selectedKeys = ref([])
const openKeys = ref([])
watch(() => route.fullPath,
  (newPath) => {
    // 1. 设置高亮项
    selectedKeys.value = [newPath]

    // 2. 自动展开父菜单
    if (newPath.startsWith('/home/permission')) {
      openKeys.value = ['sub-permission']
    } else {
      openKeys.value = []
    }
  },
  { immediate: true })
onMounted(() => {
  selectedKeys.value = [route.fullPath]
})

const logout = () => {
  message.success('退出成功')
  router.push('/login')
}
</script>

<style scoped>
.body-wrapper {
  margin-top: 8px;
  display: flex !important;
  width: 100% !important;
  min-width: 100% !important;
  height: calc(100vh - 64px) !important;
  overflow: hidden;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: bold;
  height: 48px;
  margin: 12px;
  color: #fff;
}

.header {
  width: 100%;
  height: 64px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.content {
  flex: 1;
  margin: 0 16px;
  padding: 16px;
  background: #fff;
  border-radius: 6px;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  height: 100%;
}
</style>