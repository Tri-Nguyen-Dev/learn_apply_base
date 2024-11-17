<script setup lang="ts">

import LineChart from "@/components/LineChart.vue";
import {watch, ref} from "vue";

const props = defineProps({
  chartData: {
    type: Array,
    default: []
  }
})

const dataMap = ref<any>([])

function compare( a: any, b: any ) {
  if ( a.time < b.time ){
    return -1;
  }
  if ( a.time > b.time ){
    return 1;
  }
  return 0;
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


watch(() => props.chartData, (data: any) => {
  const labels = data[0]?.dataPoint.map((item: any) => item.time)  as any
  const datasets = data.map((item: any) => {
    const dataPoint = item.dataPoint.sort( compare )

    return {
      label: item.title,
      data: dataPoint.map((item: any) => (item.value)),
      borderColor: getRandomColor(),
      borderWidth: 2,
      fill: false,
      tension: 0.4,
    }
  })

  dataMap.value = {
    labels,
    datasets
  }

}, { immediate: true });

</script>

<template>
  <div class="chart-container">
    <LineChart :chart-data="dataMap" />
  </div>
</template>



<style scoped>
.chart-container {
  height: 100%;
  width: 100%;
  max-height: 400px;
}
</style>
