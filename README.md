# 医疗健康行业数据可视化

基于 **Vue 3 + ECharts** 的医疗数据可视化大屏，围绕「科室 × 月份」维度对出诊、急诊、收费、来访、号别等指标进行可视化，支持**科室 / 月份联动筛选**与**跨图点击联动**。

> 医疗数据正以指数级增长：据 Statista 统计，全球医疗数据量已从 2013 年的 153 艾字节增长到 2020 年底的 2314 艾字节。数据分析与可视化正成为医疗健康领域预防、预测疾病的重要课题。

## 功能

- **6 类医疗指标可视化**：各科室出诊次数、急诊次数占比（玫瑰图）、门诊收费、收费月度趋势、来访人数、号别占比
- **数据层分离**：结构化数据集 `dataset.json` + 异步加载层 `loadDataset()`，可无痛切换为真实后端接口
- **联动筛选**：按「科室（多选）+ 月份范围」全局过滤，所有图表实时联动更新
- **跨图联动**：点击任意图表中的科室，自动切换该科室并同步刷新其它图表
- **组件化架构**：通用 `BaseChart` 组件统一管理 ECharts 生命周期（初始化 / resize / 点击事件 / 销毁）
- **响应式布局**：桌面端双栏、移动端单栏

## 技术栈

| 层 | 技术 |
| --- | --- |
| 框架 | Vue 3（组合式 API） |
| 图表 | ECharts 6（按需引入，减小打包体积） |
| 构建 | Vite 7 |
| 数据 | 结构化 JSON 数据集 + 异步加载层 |

## 目录结构

```text
medical-data-visualization/
├── index.html                    # 入口 HTML
├── src/
│   ├── main.js                   # 应用入口
│   ├── App.vue                   # 主界面：筛选器 + 图表网格 + 联动逻辑
│   ├── style.css                 # 全局样式
│   ├── data/
│   │   ├── dataset.json          # 结构化数据集（科室 × 月份多指标）
│   │   ├── index.js              # loadDataset() 异步加载层
│   │   └── options.js            # 图表配置生成（由筛选后的数据派生）
│   └── components/
│       ├── FilterBar.vue         # 科室 / 月份筛选器
│       └── BaseChart.vue         # 通用 ECharts 图表组件（含点击事件）
└── vite.config.js
```

## 快速开始

```bash
# 安装依赖
npm install

# 本地开发（默认 http://localhost:5173）
npm run dev

# 生产构建
npm run build

# 预览构建产物
npm run preview
```

## 数据说明

数据存放在 `src/data/dataset.json`，结构为「科室 × 月份」的多指标记录（出诊 / 急诊 / 收费 / 来访），另含各科室的号别分布。当前为演示数据，接入真实数据只需修改 `src/data/index.js` 中的 `loadDataset()`：

```js
export async function loadDataset() {
  const res = await fetch('/api/dashboard') // 替换为真实接口
  return res.json()
}
```

## 扩展方向

- 接入真实医疗数据接口（替换 `loadDataset`）
- 增加图表类型（地图、桑基图、雷达图等）
- 增加时间粒度切换（月 / 季 / 年）与排序、导出
