<template>
    <a-card title="菜单管理">
        <a-table :columns="columns" :data-source="treeData" row-key="id" bordered :pagination="false"
            children-data-name="children" />
    </a-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const treeData = ref([])

const columns = [
    { title: '菜单名称', dataIndex: 'name', width: 200 },
    { title: '路由地址', dataIndex: 'path' },
    { title: '图标', dataIndex: 'icon', width: 120 },
    { title: '排序', dataIndex: 'sort', width: 80 },
]

async function loadTree() {
    const res = await axios.get('/api/menu/tree')
    treeData.value = res.data.data
}

onMounted(() => loadTree())
</script>