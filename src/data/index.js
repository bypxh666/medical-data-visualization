// 数据加载层：目前读取本地 JSON 数据集，后续可无痛切换到真实后端接口。
import dataset from './dataset.json'

export async function loadDataset() {
  // 接入真实数据时，替换为：
  //   const res = await fetch('/api/dashboard')
  //   return res.json()
  return dataset
}
