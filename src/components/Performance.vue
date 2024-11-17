<template>
  <div class="performance">
    <ChartPerformance v-for="item in listMess" :chart-data="item" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ChartPerformance from "@/components/ChartPerformance.vue"

const largeDataset = ref();
const listMess = ref([])

const processDataInWorker = () => {
  const worker = new Worker(new URL('./dataWorker.js', import.meta.url));
  worker.postMessage(largeDataset.value);

  worker.onmessage = (event) => {

    console.log(event)
    listMess.value = event?.data
    worker.terminate();
  };
};



onMounted(() => {
  processDataInWorker();
});
</script>

<style>
.performance {
  padding: 24px;
}
</style>
