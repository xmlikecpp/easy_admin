<template>
    <div class="screen-container">
        <div class="screen-wrapper" :style="wrapperStyle">
            <!-- 头部 -->
            <header class="screen-header">
                <div class="header-left">数据统计中心 <button class="ml-4! py-2 px-4 rounded-3xl border"
                        @click="$router.replace('/home')">返回</button></div>
                <div class="header-title">可视化数字大屏系统</div>
                <div class="header-right">{{ currentTime }}</div>
            </header>

            <!-- 主体内容 -->
            <main class="screen-main">
                <!-- 左侧 -->
                <div class="column">
                    <div class="chart-box">
                        <div class="chart-title">核心业务占比</div>
                        <div ref="pieChartRef" class="chart-content"></div>
                    </div>
                    <div class="chart-box">
                        <div class="chart-title">周活跃度趋势</div>
                        <div ref="lineChartRef" class="chart-content"></div>
                    </div>
                </div>

                <!-- 中间：地图区域 -->
                <div class="column-center">
                    <div class="data-summary">
                        <div class="summary-item" v-for="item in summaryData" :key="item.label">
                            <span class="label">{{ item.label }}</span>
                            <span class="value">{{ item.value }}</span>
                        </div>
                    </div>
                    <!-- 核心地图容器 -->
                    <div class="map-box">
                        <div ref="mapChartRef" style="width: 100%; height: 100%;"></div>
                    </div>
                </div>

                <!-- 右侧 -->
                <div class="column">
                    <div class="chart-box">
                        <div class="chart-title">营收排名 Top5</div>
                        <div ref="barChartRef" class="chart-content"></div>
                    </div>
                    <div class="chart-box">
                        <div class="chart-title">实时预警信息</div>
                        <div class="news-list">
                            <div v-for="i in 5" :key="i" class="news-item">
                                <span class="dot"></span> 预警：节点 {{ i }} 负载过高 ({{ (Math.random() * 100).toFixed(0) }}%)
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue';
import * as echarts from 'echarts';

// --- 1. 响应式适配 (Scale) ---
const wrapperStyle = reactive({
    transform: 'scale(1) translate(-50%, -50%)',
    width: '1920px',
    height: '1080px'
});

const updateScale = () => {
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    wrapperStyle.transform = `scale(${scale}) translate(-50%, -50%)`;
};

// --- 2. 模拟数据 ---
const summaryData = [
    { label: '累计用户', value: '128,492' },
    { label: '今日营收', value: '￥52,103' },
    { label: '在线设备', value: '1,024' }
];

const currentTime = ref('');
const timer = setInterval(() => { currentTime.value = new Date().toLocaleString() }, 1000);

// --- 3. 图表逻辑 ---
const pieChartRef = ref(null);
const lineChartRef = ref(null);
const barChartRef = ref(null);
const mapChartRef = ref(null);
let charts = [];

// 获取地图数据并初始化地图
const initMap = async () => {
    try {
        // 使用公开的 GeoJSON API (阿里 DataV 提供)
        const response = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json');
        const chinaGeoJson = await response.json();

        echarts.registerMap('china', chinaGeoJson);

        const mapChart = echarts.init(mapChartRef.value);
        const mapOption = {
            tooltip: { trigger: 'item' },
            geo: {
                map: 'china',
                roam: false, // 禁止缩放
                emphasis: {
                    itemStyle: { areaColor: '#2a333d' },
                    label: { show: true, color: '#fff' }
                },
                itemStyle: {
                    areaColor: 'rgba(7, 21, 57, 0.5)',
                    borderColor: '#00d2ff',
                    borderWidth: 1.5,
                    shadowColor: '#00d2ff',
                    shadowBlur: 10
                }
            },
            series: [
                {
                    name: '活跃度',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: [
                        { name: '北京', value: [116.46, 39.92, 100] },
                        { name: '上海', value: [121.47, 31.23, 80] },
                        { name: '广州', value: [113.23, 23.16, 70] },
                        { name: '西安', value: [108.95, 34.27, 60] },
                    ],
                    symbolSize: 12,
                    itemStyle: { color: '#ffff00' }
                },
                // 气泡效果
                {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: [{ name: '成都', value: [104.06, 30.67, 90] }],
                    symbolSize: 15,
                    showEffectOn: 'render',
                    rippleEffect: { brushType: 'stroke' },
                    itemStyle: { color: '#00ffcc' }
                }
            ]
        };
        mapChart.setOption(mapOption);
        charts.push(mapChart);
    } catch (error) {
        console.error("地图加载失败:", error);
    }
};

const initOtherCharts = () => {
    // 饼图
    const pie = echarts.init(pieChartRef.value, 'dark');
    pie.setOption({
        backgroundColor: 'transparent',
        series: [{
            type: 'pie',
            radius: ['40%', '70%'],
            data: [{ value: 1048, name: '业务A' }, { value: 735, name: '业务B' }, { value: 580, name: '业务C' }]
        }]
    });

    // 折线图
    const line = echarts.init(lineChartRef.value, 'dark');
    line.setOption({
        backgroundColor: 'transparent',
        xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
        yAxis: { type: 'value' },
        series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: 'line', smooth: true }]
    });

    // 柱状图
    const bar = echarts.init(barChartRef.value, 'dark');
    bar.setOption({
        backgroundColor: 'transparent',
        xAxis: { type: 'value' },
        yAxis: { type: 'category', data: ['北京', '上海', '广州', '深圳', '杭州'] },
        series: [{ type: 'bar', data: [120, 200, 150, 80, 70], itemStyle: { color: '#4facfe' } }]
    });

    charts.push(pie, line, bar);
};

onMounted(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    initMap(); // 初始化地图
    initOtherCharts();
});

onUnmounted(() => {
    clearInterval(timer);
    window.removeEventListener('resize', updateScale);
    charts.forEach(c => c.dispose());
});
</script>

<style scoped>
.screen-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    background: radial-gradient(circle at 18% 18%, rgba(45, 157, 255, 0.26), transparent 28%),
        linear-gradient(to top, #051325 0%, #03101e 64%, #01070f 100%);
}

.screen-container::after {
    background: linear-gradient(rgba(139, 160, 172, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(92, 176, 220, 0.1) 1px, transparent 1px);
    background-size: 52px 52px;
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
}

.screen-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: left top;
    display: flex;
    flex-direction: column;
    color: #fff;
    z-index: 1;
}

.screen-header {
    height: 80px;
    background: rgba(16, 24, 48, 0.4);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    border-bottom: 1px solid rgba(0, 210, 255, 0.3);
}

.header-title {
    font-size: 32px;
    font-weight: bold;
    color: #00d2ff;
    text-shadow: 0 0 10px rgba(0, 210, 255, 0.5);
}

.screen-main {
    flex: 1;
    display: flex;
    padding: 20px;
    gap: 20px;
}

.column {
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.column-center {
    flex: 5;
    /* 地图区域大一点 */
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.chart-box {
    flex: 1;
    background: rgba(16, 24, 48, 0.6);
    border: 1px solid rgba(26, 42, 74, 0.8);
    box-shadow: inset 0 0 15px rgba(0, 210, 255, 0.1);
    padding: 15px;
    display: flex;
    flex-direction: column;
}

.chart-title {
    border-left: 4px solid #00d2ff;
    padding-left: 10px;
    font-size: 18px;
    margin-bottom: 10px;
}

.chart-content {
    flex: 1;
}

.data-summary {
    display: flex;
    justify-content: space-around;
    background: rgba(0, 210, 255, 0.1);
    border: 1px solid rgba(0, 210, 255, 0.2);
    padding: 20px;
}

.summary-item .label {
    display: block;
    font-size: 16px;
    color: #aaa;
}

.summary-item .value {
    font-size: 30px;
    color: #00d2ff;
    font-weight: bold;
}

.map-box {
    flex: 1;
    position: relative;
    border: 1px solid rgba(0, 210, 255, 0.1);
}

.news-item {
    padding: 8px 0;
    font-size: 14px;
    border-bottom: 1px solid rgba(26, 42, 74, 0.5);
}

.dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #ff4d4f;
    border-radius: 50%;
    margin-right: 10px;
    box-shadow: 0 0 5px #ff4d4f;
}
</style>