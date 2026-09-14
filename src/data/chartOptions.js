// 医疗健康行业数据可视化 —— 图表配置与数据
// 每个图表单独一个对象：id 用于渲染 key，title 用于卡片标题，option 为 ECharts 配置。
// 数据来源：Statista 及公开医疗行业示例数据（演示用）。

export const chartCards = [
  {
    id: 'visit-type',
    title: '不同号别的出诊次数',
    option: {
      tooltip: { trigger: 'item', formatter: '占比\n{b}: {c} ({d}%)' },
      legend: { orient: 'vertical', left: 'left' },
      series: [
        {
          name: '出诊次数',
          type: 'pie',
          radius: '55%',
          center: ['50%', '55%'],
          data: [
            { value: 188, name: '普通' },
            { value: 106, name: '专家' },
            { value: 122, name: '知名专家' },
          ],
          label: { formatter: '{b}\n{d}%' },
        },
      ],
    },
  },
  {
    id: 'emergency-dept',
    title: '某医院科室急诊次数指标分析',
    option: {
      tooltip: { trigger: 'item', formatter: '占比\n{b}: {c} ({d}%)' },
      series: [
        {
          name: '急诊次数',
          type: 'pie',
          roseType: 'radius',
          radius: ['30%', '72%'],
          center: ['50%', '55%'],
          label: { formatter: '{d}%' },
          data: [
            { value: 502, name: '发热门诊' },
            { value: 456, name: '儿科' },
            { value: 401, name: '骨科' },
            { value: 320, name: '产科' },
            { value: 268, name: '耳鼻咽喉科' },
            { value: 125, name: '口腔科' },
            { value: 90, name: '肿瘤科' },
          ],
        },
      ],
    },
  },
  {
    id: 'outpatient-fee',
    title: '不同科室的门诊收费金额',
    option: {
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: { right: 0, top: 0, data: ['收费金额（万元）'] },
      grid: { left: 50, right: 20, bottom: 40, top: 40 },
      xAxis: {
        type: 'category',
        data: ['中医科', '产科', '传染科', '口腔科', '心病科', '泌尿科', '眼科', '肺病科', '肾内科', '脾胃病科'],
        axisLabel: { interval: 0, rotate: 30 },
      },
      yAxis: { type: 'value', name: '万元' },
      series: [
        {
          name: '收费金额（万元）',
          type: 'bar',
          barWidth: '55%',
          data: [92857, 42169, 103210, 47825, 38665, 40228, 30784, 57869, 46795, 103428],
        },
      ],
    },
  },
  {
    id: 'store-sales',
    title: '不同门店的销售额',
    option: {
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: { right: 0, top: 0, data: ['销售额（万元）'] },
      grid: { left: 70, right: 30, bottom: 30, top: 40 },
      xAxis: { type: 'value', name: '万元' },
      yAxis: {
        type: 'category',
        data: ['圣杰', '太极', '川康', '德仁堂', '吉林', '格瑞', '泉源堂', '老国药房', '聚仁堂', '锦程瑞康'],
      },
      series: [
        {
          name: '销售额（万元）',
          type: 'bar',
          barWidth: '60%',
          itemStyle: { color: '#f59e0b' },
          data: [1463, 1308, 1395, 1542, 1305, 1379, 1254, 1470, 1582, 1397],
        },
      ],
    },
  },
  {
    id: 'pharmacy-visits',
    title: '近 10 天药店来访人数走势',
    option: {
      tooltip: { trigger: 'axis' },
      legend: { right: 0, top: 0, data: ['来访人数'] },
      grid: { left: 50, right: 20, bottom: 30, top: 40 },
      xAxis: { type: 'category', boundaryGap: false, data: ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日'] },
      yAxis: { type: 'value' },
      series: [
        {
          name: '来访人数',
          type: 'line',
          smooth: true,
          areaStyle: { opacity: 0.15 },
          data: [549, 492, 713, 545, 676, 475, 309, 510, 179, 204],
        },
      ],
    },
  },
  {
    id: 'drug-purchase',
    title: '不同药品的购买次数和开卡数',
    option: {
      tooltip: { trigger: 'axis' },
      legend: { right: 0, top: 0, data: ['购买次数', '开卡数'] },
      grid: { left: 60, right: 30, bottom: 40, top: 40 },
      xAxis: {
        type: 'category',
        data: ['布洛芬', '斯利安', '普萘洛尔', '润舒', '艾维多', '达世明', '金施尔康', '阿司匹林'],
        axisLabel: { interval: 0, rotate: 30 },
      },
      yAxis: { type: 'value' },
      series: [
        { name: '购买次数', type: 'bar', barWidth: '45%', data: [29380, 26288, 30994, 25387, 27154, 23019, 22478, 28701] },
        { name: '开卡数', type: 'line', smooth: true, label: { show: true, position: 'top', fontSize: 12 }, data: [7025, 9786, 10214, 6759, 8047, 5901, 5138, 7146] },
      ],
    },
  },
]
