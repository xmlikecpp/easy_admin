<template>
    <a-card title="控制台仪表盘" class="dashboard-card">
        <div class="grid">
            <!-- 统计卡片 -->
            <template v-for="value in mockdata" :key="value.vaue">
                <a-statistic class=" border p-4!" :title="`统计${value.title}`" :value="value.vaue"
                    :value-style="{ color: value.color }" />

            </template>
        </div>

        <a-divider class=" border-y pb-4!">系统信息</a-divider>

        <a-descriptions :column="2" bordered size="small">
            <a-descriptions-item label="服务器状态">运行中 ✅</a-descriptions-item>
            <a-descriptions-item label="当前登录用户">admin</a-descriptions-item>
            <a-descriptions-item label="Vue 版本">Vue 3</a-descriptions-item>
            <a-descriptions-item label="构建工具">Vite</a-descriptions-item>
            <a-descriptions-item label="UI 库">Ant Design Vue</a-descriptions-item>
            <a-descriptions-item label="Mock 服务">已启用</a-descriptions-item>
        </a-descriptions>
    </a-card>

    <a-card class="mt-4!  ">
        <div class="chart-row">
            <div ref="line_chart" class="chart-item flex justify-center"></div>
            <div class="w-0.5 h-full bg-yellow-50 "></div>
            <div ref="pie_chart" style="width: 40%;"></div>
        </div>
    </a-card>
</template>

<script setup>

import * as echarts from "echarts"
import { onMounted, ref } from "vue";
const line_chart = ref(null)
const pie_chart = ref(null)
const Line_option = {
    title: {
        text: '访问趋势'
    },
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        top: '100'
    },
    xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'line',
        smooth: true
    }]
};
const Pie_option = {
    title: { text: "访问来源占比", bottom: 0 },
    tooltip: { trigger: "item" },
    series: [
        {
            name: "访问来源",
            type: "pie",
            radius: ['40%', '70%'],
            data: [
                { name: "PC端", value: 65 },
                { name: "移动端", value: 25 },
                { name: "小程序", value: 8 },
                { name: "其他", value: 2 },
            ],
        },
    ],
};
function initLine() {
    const mychart = echarts.init(line_chart.value)
    mychart.setOption(Line_option);
}
function initPie() {
    const mychart = echarts.init(pie_chart.value)
    mychart.setOption(Pie_option);
}
const mockdata = [
    {
        title: '今日访问量',
        vaue: 500,
        color: '#00b42a'
    },
    {
        title: '用户总数',
        vaue: 8866,
        color: '#00b42a'
    },
    {
        title: '订单数量',
        vaue: 324,
        color: '#ff7d00'
    },
    {
        title: '总收入',
        vaue: 129990,
        color: '#f53f3f'
    }
]
onMounted(() => {
    initLine()
    initPie()
})
</script>

<style scoped>
.dashboard-card {
    padding: 20px;
    overflow: hidden;
}

.grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 20px;
}

.chart-row {
    display: flex;
    width: 100%;
    height: 400px;
    gap: 20px;
}

.chart-item {
    height: 100%;
    flex: 1;
}
</style>