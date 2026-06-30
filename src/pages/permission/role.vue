<template>
    <a-card title="用户管理">
        <div class="mb-6">
            <a-button type="primary" @click="toAdd">新增用户</a-button>
        </div>

        <a-table :columns="columns" :data-source="list" row-key="id" bordered :pagination="{
            current: page,
            pageSize: 10,
            total,
            showTotal: t => `共 ${t} 条`
        }" @change="handlePage">
            <template #bodyCell="{ column, record }">
                <!-- 状态 -->
                <template v-if="column.dataIndex === 'status'">
                    <a-tag :color="record.status ? 'green' : 'red'">
                        {{ record.status ? '启用' : '禁用' }}
                    </a-tag>
                </template>

                <!-- 操作 -->
                <template v-if="column.dataIndex === 'action'">
                    <a-button size="small" type="primary" @click="toEdit(record)" class=" mr-4!">编辑</a-button>
                    <a-button size="small" danger @click="handleDel(record.id)">删除</a-button>
                </template>
            </template>
        </a-table>

        <!-- 新增/编辑弹窗 -->
        <a-modal v-model:open="modalVisible" :title="isEdit ? '编辑用户' : '新增用户'" @ok="handleSubmit">
            <a-form :model="form" layout="vertical">
                <a-form-item label="用户名" required>
                    <a-input v-model:value="form.username" placeholder="请输入用户名" />
                </a-form-item>
                <a-form-item label="姓名" required>
                    <a-input v-model:value="form.name" placeholder="请输入姓名" />
                </a-form-item>
                <a-form-item label="手机号">
                    <a-input v-model:value="form.phone" placeholder="请输入手机号" />
                </a-form-item>
                <a-form-item label="角色">
                    <a-select v-model:value="form.role" placeholder="请选择角色">
                        <a-select-option value="运营">运营</a-select-option>
                        <a-select-option value="编辑">编辑</a-select-option>
                        <a-select-option value="普通用户">普通用户</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="状态">
                    <a-switch v-model:checked="form.status" checked-children="启用" un-checked-children="禁用" />
                </a-form-item>
            </a-form>
        </a-modal>
    </a-card>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios'
import { message } from 'ant-design-vue'

const page = ref(1)
const total = ref(0)
const list = ref([])

// 列表
const columns = [
    { title: 'ID', dataIndex: 'id', width: 70 },
    { title: '用户名', dataIndex: 'username' },
    { title: '姓名', dataIndex: 'name' },
    { title: '手机号', dataIndex: 'phone' },
    { title: '角色', dataIndex: 'role' },
    { title: '状态', dataIndex: 'status' },
    { title: '创建时间', dataIndex: 'createTime' },
    { title: '操作', dataIndex: 'action', width: 180 },
]

// 加载列表
async function loadList() {
    const res = await axios.get('/api/user/list', { params: { page: page.value } })
    list.value = res.data.data.records
    total.value = res.data.data.total
}

// 分页
function handlePage(p) {
    page.value = p.current
    loadList()
}

// 弹窗
const modalVisible = ref(false)
const isEdit = ref(false)
const form = reactive({
    id: null,
    username: '',
    name: '',
    phone: '',
    role: '',
    status: 1,
})

// 新增
function toAdd() {
    isEdit.value = false
    Object.assign(form, { id: null, username: '', name: '', phone: '', role: '', status: 1 })
    modalVisible.value = true
}

// 编辑
function toEdit(row) {
    isEdit.value = true
    Object.assign(form, row)
    modalVisible.value = true
}

// 提交
async function handleSubmit() {
    if (isEdit.value) {
        await axios.put('/api/user/edit', form)
    } else {
        await axios.post('/api/user/add', form)
    }
    message.success('操作成功')
    modalVisible.value = false
    loadList()
}

// 删除
async function handleDel(id) {
    await axios.delete('/api/user/delete', { params: { id } })
    message.success('删除成功')
    loadList()
}

onMounted(() => loadList())
</script>