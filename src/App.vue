<script setup>
import { ref, computed, onMounted } from 'vue'
import { loadDataset } from './data/index.js'
import {
  buildOutpatientBar,
  buildEmergencyRose,
  buildRevenueBar,
  buildRevenueTrend,
  buildVisitsBar,
  buildVisitTypePie,
} from './data/options.js'
import BaseChart from './components/BaseChart.vue'
import FilterBar from './components/FilterBar.vue'

const dataset = ref(null)
const loading = ref(true)
const selectedDepts = ref([])
const monthStart = ref(0)
const monthEnd = ref(11)

onMounted(async () => {
  dataset.value = await loadDataset()
  selectedDepts.value = [...dataset.value.departments]
  monthEnd.value = dataset.value.months.length - 1
  loading.value = false
})

const departments = computed(() => dataset.value?.departments ?? [])
const months = computed(() => dataset.value?.months ?? [])

const activeDepts = computed(() =>
  departments.value.filter((d) => selectedDepts.value.includes(d)),
)

const activeMonths = computed(() => months.value.slice(monthStart.value, monthEnd.value + 1))

// 同时按「科室 + 月份」过滤后的记录，作为所有图表的统一数据源
const deptFilteredRecords = computed(() => {
  if (!dataset.value) return []
  const deptSet = new Set(activeDepts.value)
  const monthSet = new Set(activeMonths.value)
  return dataset.value.records.filter((r) => deptSet.has(r.dept) && monthSet.has(r.month))
})

const charts = computed(() => {
  if (!dataset.value) return []
  const depts = activeDepts.value
  const records = deptFilteredRecords.value
  return [
    { id: 'outpatient', title: '各科室出诊次数', option: buildOutpatientBar(records, depts) },
    { id: 'emergency', title: '各科室急诊次数占比', option: buildEmergencyRose(records, depts) },
    { id: 'revenue', title: '各科室门诊收费', option: buildRevenueBar(records, depts) },
    { id: 'trend', title: '门诊收费月度趋势', option: buildRevenueTrend(records, activeMonths.value) },
    { id: 'visits', title: '各科室来访人数', option: buildVisitsBar(records, depts) },
    { id: 'visitType', title: '号别占比', option: buildVisitTypePie(dataset.value.visitTypeSplit, depts) },
  ]
})

function toggleDept(d) {
  if (selectedDepts.value.includes(d)) {
    if (selectedDepts.value.length > 1) {
      selectedDepts.value = selectedDepts.value.filter((x) => x !== d)
    }
  } else {
    selectedDepts.value = [...selectedDepts.value, d]
  }
}

function selectAll() {
  selectedDepts.value = [...departments.value]
}

function onChartClick(params) {
  // 点击图表中的科室，联动切换该科室（实现跨图联动）
  const name = params?.name
  if (name && departments.value.includes(name)) {
    toggleDept(name)
  }
}

function onStartChange(v) {
  monthStart.value = Math.min(v, monthEnd.value)
}

function onEndChange(v) {
  monthEnd.value = Math.max(v, monthStart.value)
}

function reset() {
  selectedDepts.value = [...departments.value]
  monthStart.value = 0
  monthEnd.value = months.value.length - 1
}
</script>

<template>
  <div class="page">
    <header class="hero">
      <h1>{{ dataset?.meta?.hospital || '医疗健康行业数据可视化' }}</h1>
      <p class="intro">
        基于 Vue 3 与 ECharts 的医疗数据可视化大屏，覆盖各科室出诊、急诊、收费、来访与号别等指标；
        支持按科室、月份联动筛选，点击任意图表中的科室即可跨图联动。
      </p>
    </header>

    <div v-if="loading" class="loading">数据加载中…</div>

    <template v-else>
      <FilterBar
        :departments="departments"
        :selected="selectedDepts"
        :months="months"
        :month-start="monthStart"
        :month-end="monthEnd"
        @toggle-dept="toggleDept"
        @select-all="selectAll"
        @update:start="onStartChange"
        @update:end="onEndChange"
        @reset="reset"
      />

      <main class="grid">
        <section v-for="card in charts" :key="card.id" class="card">
          <h2 class="card-title">{{ card.title }}</h2>
          <BaseChart :option="card.option" @chart-click="onChartClick" />
        </section>
      </main>
    </template>

    <footer class="footer">数据来源：{{ dataset?.meta?.source || '公开医疗行业示例数据' }}</footer>
  </div>
</template>
