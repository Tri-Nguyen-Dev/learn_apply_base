<script setup lang="ts">
import LineChart from '@/components/LineChart.vue';

import {onMounted, ref} from "vue";

const chartLabels = ref<any>([])
const chartValues = ref<any>([])
const calculatedMaxY = ref<any>(0)

onMounted(() => {
  const apiData = {
    data: [
      { time: 'thu 2', value: 20 },
      { time: 'thu 3', value: 24 },
      { time: 'thu 4', value: 26 },
      { time: 'thu 5', value: 29 },
      { time: 'thu 6', value: 40 }
    ]
  };

  chartLabels.value = apiData.data.map(item => item.time);
  chartValues.value = apiData.data.map(item => item.value);

  const maxValue = Math.max(...apiData.data.map(item => item.value));
  calculatedMaxY.value = maxValue * 1.1;
})

</script>

<template>
  <div>
    <LineChart :labels="chartLabels" :values="chartValues" chartTitle="Biểu đồ từ API" :maxY="calculatedMaxY" />
  </div>
</template>

