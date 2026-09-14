<script setup>
import { chartCards } from './data/chartOptions.js'
import BaseChart from './components/BaseChart.vue'
</script>

<template>
  <div class="page">
    <header class="hero">
      <h1>医疗健康行业数据可视化</h1>
      <p class="intro">
        随着医疗监测应用的普及，医疗数据正以指数级增长。据 Statista 统计，全球医疗数据量已从 2013 年的 153
        艾字节增长到 2020 年底的 2314 艾字节。数据分析与可视化已成为医疗健康领域辅助决策、预防和预测疾病的关键手段。
        本项目基于 Vue 3 与 ECharts，对出诊、急诊、收费、销售、客流、用药等典型医疗场景进行可视化呈现。
      </p>
    </header>

    <main class="grid">
      <section v-for="card in chartCards" :key="card.id" class="card">
        <h2 class="card-title">{{ card.title }}</h2>
        <BaseChart :option="card.option" />
      </section>
    </main>

    <footer class="footer">数据来源：Statista 及公开医疗行业示例数据（仅作演示）</footer>
  </div>
</template>
