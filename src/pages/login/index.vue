<template>
    <div class="login-container">
        <a-card class="login-card" title="系统登录">
            <a-form
                    ref="formRef"
                    :model="form"
                    :rules="rules"
                    layout="vertical">
                <a-form-item label="账号" name="username">
                    <a-input
                             v-model:value="form.username"
                             placeholder="请输入账号"
                             size="large" />
                </a-form-item>

                <a-form-item label="密码" name="password">
                    <a-input-password
                                      v-model:value="form.password"
                                      placeholder="请输入密码"
                                      size="large" />
                </a-form-item>

                <a-form-item>
                    <a-button
                              type="primary"
                              size="large"
                              block
                              :loading="loading"
                              @click="onSubmit">
                        登 录
                    </a-button>
                </a-form-item>
            </a-form>
        </a-card>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const formRef = ref()
const loading = ref(false)

// 表单数据
const form = reactive({
    username: 'admin',
    password: '123456'
})

// 表单验证
const rules = {
    username: [{ required: true, message: '请输入账号' }],
    password: [{ required: true, message: '请输入密码' }]
}

// 登录提交
const onSubmit = async () => {
    try {
        await formRef.value.validate()
        loading.value = true

        // 调用 mock 接口
        const res = await axios.post('/api/login', form)

        if (res.data.code === 200) {
            message.success('登录成功')
            router.push('/home') // 跳首页
        } else {
            message.error(res.data.message)
        }
    } catch (err) {
        console.log('验证失败', err)
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.login-container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f0f2f5;
}

.login-card {
    width: 400px;
}
</style>