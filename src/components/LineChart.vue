<script setup lang="ts">
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

import {computed} from "vue";

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const props = defineProps({
  labels: {
    type: Array,
    required: true,
  },
  values: {
    type: Array,
    required: true,
  },
  chartTitle: {
    type: String,
    default: 'Biểu đồ đường',
  },
  maxY: {
    type: Number,
    default: 100,
  },
})

const chartData = computed(() => {
      return {
        labels: props.labels,
        datasets: [
          {
            label: 'Giá trị',
            data: props.values,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
            tension: 0.4,
          },
        ],
      }
    }
)

const chartOptions = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: props.chartTitle,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Thời gian',
        },
      },
      y: {
        min: 0,
        max: props.maxY,
        title: {
          display: true,
          text: 'Giá trị',
        },
      },
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
