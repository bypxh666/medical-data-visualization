<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
// 按需引入 ECharts：只注册用到的图表类型与组件，显著减小打包体积
import * as echarts from 'echarts/core'
import { PieChart, BarChart, LineChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([PieChart, BarChart, LineChart, TooltipComponent, LegendComponent, GridComponent, CanvasRenderer])

const props = defineProps({
  option: { type: Object, required: true },
  height: { type: String, default: '360px' },
})

const el = ref(null)
let chart = null

function render() {
  if (!el.value) return
  if (!chart) chart = echarts.init(el.value)
  chart.setOption(props.option, true)
}

function resize() {
  if (chart) chart.resize()
}

onMounted(() => {
  render()
  window.addEventListener('resize', resize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  if (chart) {
    chart.dispose()
    chart = null
  }
})

watch(() => props.option, render, { deep: true })
</script>

<template>
  <div ref="el" class="base-chart" :style="{ height }"></div>
</template>

<style scoped>
.base-chart {
  width: 100%;
}
</style>
