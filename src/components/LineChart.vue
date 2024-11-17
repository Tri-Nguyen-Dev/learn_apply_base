<script setup lang="ts">
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

import {computed} from "vue";

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const props = defineProps({
  chartData: {

  }
})

const chartOptions = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
    },
  };
})

</script>

<template>
  <div class="chart-container">
    <Line :data="chartData as any" :options="chartOptions as any" :height="400"></Line>
  </div>
</template>



<style scoped>
.chart-container {
  height: 100%;
  width: 100%;
  max-height: 400px;
}
</style>
