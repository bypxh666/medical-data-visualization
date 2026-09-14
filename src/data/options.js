// 图表配置生成：根据「筛选后的记录 + 选中的科室」计算各图表的 ECharts 配置。
// 所有图表都由同一份数据派生，从而支持全局筛选与跨图联动。

export const PALETTE = ['#11a683', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6']

function groupByDept(records, key) {
  const map = new Map()
  for (const r of records) map.set(r.dept, (map.get(r.dept) || 0) + r[key])
  return map
}

function baseBar() {
  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: 60, right: 20, bottom: 32, top: 20 },
  }
}

// 1. 各科室出诊次数（柱状图）
export function buildOutpatientBar(records, depts) {
  const g = groupByDept(records, 'outpatient')
  return {
    ...baseBar(),
    xAxis: { type: 'category', data: depts, axisLabel: { interval: 0, rotate: 30 } },
    yAxis: { type: 'value', name: '人次' },
    series: [
      {
        name: '出诊次数',
        type: 'bar',
        barWidth: '55%',
        itemStyle: { color: '#11a683', borderRadius: [4, 4, 0, 0] },
        data: depts.map((d) => g.get(d) || 0),
      },
    ],
  }
}

// 2. 各科室急诊次数（南丁格尔玫瑰图）
export function buildEmergencyRose(records, depts) {
  const g = groupByDept(records, 'emergency')
  return {
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    color: PALETTE,
    series: [
      {
        name: '急诊次数',
        type: 'pie',
        roseType: 'radius',
        radius: ['25%', '70%'],
        center: ['50%', '55%'],
        label: { formatter: '{b}\n{d}%' },
        data: depts.map((d) => ({ name: d, value: g.get(d) || 0 })),
      },
    ],
  }
}

// 3. 各科室门诊收费（柱状图）
export function buildRevenueBar(records, depts) {
  const g = groupByDept(records, 'revenue')
  return {
    ...baseBar(),
    xAxis: { type: 'category', data: depts, axisLabel: { interval: 0, rotate: 30 } },
    yAxis: { type: 'value', name: '万元' },
    series: [
      {
        name: '收费金额',
        type: 'bar',
        barWidth: '55%',
        itemStyle: { color: '#f59e0b', borderRadius: [4, 4, 0, 0] },
        data: depts.map((d) => g.get(d) || 0),
      },
    ],
  }
}

// 4. 门诊收费月度趋势（折线图，按所选科室汇总）
export function buildRevenueTrend(records, months) {
  const byMonth = new Map()
  for (const r of records) byMonth.set(r.month, (byMonth.get(r.month) || 0) + r.revenue)
  return {
    tooltip: { trigger: 'axis' },
    grid: { left: 60, right: 20, bottom: 30, top: 20 },
    xAxis: { type: 'category', boundaryGap: false, data: months },
    yAxis: { type: 'value', name: '万元' },
    series: [
      {
        name: '门诊收费',
        type: 'line',
        smooth: true,
        areaStyle: { opacity: 0.12 },
        itemStyle: { color: '#3b82f6' },
        data: months.map((m) => Math.round((byMonth.get(m) || 0) * 10) / 10),
      },
    ],
  }
}

// 5. 各科室来访人数（横向条形图）
export function buildVisitsBar(records, depts) {
  const g = groupByDept(records, 'visits')
  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: 70, right: 30, bottom: 30, top: 20 },
    xAxis: { type: 'value', name: '人次' },
    yAxis: { type: 'category', data: depts },
    series: [
      {
        name: '来访人数',
        type: 'bar',
        barWidth: '60%',
        itemStyle: { color: '#8b5cf6', borderRadius: [0, 4, 4, 0] },
        data: depts.map((d) => g.get(d) || 0),
      },
    ],
  }
}

// 6. 号别占比（饼图，普通 / 专家 / 知名专家）
export function buildVisitTypePie(split, depts) {
  const set = new Set(depts)
  const byType = new Map()
  for (const s of split) {
    if (set.has(s.dept)) byType.set(s.type, (byType.get(s.type) || 0) + s.value)
  }
  const types = ['普通', '专家', '知名专家']
  return {
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    legend: { orient: 'vertical', left: 'left' },
    color: ['#11a683', '#3b82f6', '#f59e0b'],
    series: [
      {
        name: '号别占比',
        type: 'pie',
        radius: '55%',
        center: ['55%', '55%'],
        label: { formatter: '{b}\n{d}%' },
        data: types.map((t) => ({ name: t, value: byType.get(t) || 0 })),
      },
    ],
  }
}
