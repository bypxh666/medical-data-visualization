<script setup>
defineProps({
  departments: { type: Array, required: true },
  selected: { type: Array, required: true },
  months: { type: Array, required: true },
  monthStart: { type: Number, required: true },
  monthEnd: { type: Number, required: true },
})

const emit = defineEmits(['toggle-dept', 'select-all', 'update:start', 'update:end', 'reset'])
</script>

<template>
  <div class="filter-bar">
    <div class="filter-row">
      <span class="filter-label">科室</span>
      <div class="chips">
        <button
          v-for="d in departments"
          :key="d"
          class="chip"
          :class="{ active: selected.includes(d) }"
          @click="emit('toggle-dept', d)"
        >{{ d }}</button>
      </div>
      <button class="link" @click="emit('select-all')">全选</button>
    </div>

    <div class="filter-row">
      <span class="filter-label">月份</span>
      <select :value="monthStart" @change="emit('update:start', Number($event.target.value))">
        <option v-for="(m, i) in months" :key="m" :value="i">{{ m }}</option>
      </select>
      <span class="sep">至</span>
      <select :value="monthEnd" @change="emit('update:end', Number($event.target.value))">
        <option v-for="(m, i) in months" :key="m" :value="i">{{ m }}</option>
      </select>
      <button class="reset" @click="emit('reset')">重置</button>
    </div>
  </div>
</template>

<style scoped>
.filter-bar {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 14px 18px;
  margin-bottom: 20px;
}

.filter-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
.filter-row + .filter-row {
  margin-top: 10px;
}

.filter-label {
  font-size: 13px;
  color: var(--muted);
  width: 34px;
  flex: none;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  border: 1px solid var(--border);
  background: #fff;
  color: var(--text);
  border-radius: 16px;
  padding: 4px 12px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;
}
.chip:hover {
  border-color: var(--accent);
}
.chip.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.link,
.reset {
  border: none;
  background: none;
  color: var(--accent);
  font-size: 13px;
  cursor: pointer;
}
.reset {
  margin-left: auto;
  color: var(--muted);
}
.reset:hover {
  color: var(--text);
}

select {
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 13px;
  background: #fff;
  color: var(--text);
}
.sep {
  font-size: 13px;
  color: var(--muted);
}
</style>
