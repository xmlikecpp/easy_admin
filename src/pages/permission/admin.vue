<template>
    <a-card title="管理员管理">
        <a-table :columns="columns" :data-source="adminList" row-key="id" bordered :pagination="false">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'status'">
                    <a-tag :color="record.status ? 'green' : 'red'">
                        {{ record.status ? '正常' : '禁用' }}
                    </a-tag>
                </template>
                <template v-if="column.dataIndex === 'perm'">
                    <a-button size="small" type="primary" @click="openPerm(record)">分配权限</a-button>
                </template>
            </template>
        </a-table>

        <!-- 分配权限弹窗 -->
        <a-modal v-model:open="permVisible" title="分配权限" width="600px" @ok="permVisible = false">
            <a-tree v-model:checked-keys="checkedKeys" :tree-data="menuTree" checkable default-expand-all />
        </a-modal>
    </a-card>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 管理员列表
const adminList = ref([
    { id: 1, username: 'super_admin', name: '超级管理员', role: '超级管理员', status: 1 },
    { id: 2, username: 'system_admin', name: '系统管理员', role: '管理员', status: 1 },
    { id: 3, username: 'audit_admin', name: '审计管理员', role: '审计员', status: 1 },
])

// 菜单权限树
const menuTree = ref([
    {
        title: '控制台', key: 'dashboard',
        children: [{ title: '首页', key: 'dashboard:home' }]
    },
    {
        title: '权限管理', key: 'permission',
        children: [
            { title: '用户管理', key: 'permission:user' },
            { title: '管理员管理', key: 'permission:admin' },
            { title: '菜单管理', key: 'permission:menu' },
        ]
    },
    {
        title: '系统配置', key: 'system',
        children: [{ title: '参数设置', key: 'system:config' }]
    },
])

const columns = [
    { title: 'ID', dataIndex: 'id', width: 70 },
    { title: '账号', dataIndex: 'username' },
    { title: '姓名', dataIndex: 'name' },
    { title: '角色', dataIndex: 'role' },
    { title: '状态', dataIndex: 'status' },
    { title: '权限分配', dataIndex: 'perm', width: 120 },
]

// 权限弹窗
const permVisible = ref(false)
const checkedKeys = ref([])

function openPerm(record) {
    // 模拟：根据管理员加载已有权限
    checkedKeys.value = record.id === 1
        ? ['dashboard', 'permission', 'system']
        : ['dashboard', 'permission:user']
    permVisible.value = true
}
</script>