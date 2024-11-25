<template>
  <div class="wrap">


    <button @click="isOpen = !isOpen">
      Toggle Collapse
    </button>

    <div v-for="(item, index) in items" :key="index">

      <div v-for="(item2, index2) in item.required" :key="index2" class="item">
         <textarea
             v-model="item2.value"
             ref="textAreas"
             class="auto-height"
         />
        <n-checkbox-group v-model:value="item2.value">
          <n-space item-style="display: flex;">
            <n-checkbox value="Beijing" label="Beijing" />
            <n-checkbox value="Shanghai" label="Shanghai" />
            <n-checkbox value="Guangzhou" label="Guangzhou" />
            <n-checkbox value="Shenzhen" label="Shenzhen" />
            <n-checkbox value="ddddddddddddd" label="dddddddddd" />
          </n-space>
        </n-checkbox-group>
      </div>

    </div>

    <button @click="addValue">Add Value</button>
  </div>
</template>

<script>

import {ref, onMounted, watch, nextTick} from "vue";
import Collapse from "@/components/Collapse.vue";

export default {
  components: {Collapse},
  setup() {
    const isOpen = ref(false);
    const items = ref([
      {
        required: [
          {
            title:'1',
            value:''
          },
          {
            title:'1',
            value:''
          },
          {
            title:'1',
            value:''
          }
        ]
      },
      {
        required: [
          {
            title:'1',
            value:''
          },
          {
            title:'1',
            value:''
          },
          {
            title:'1',
            value:''
          }
        ]
      }
    ]);
    const textAreas = ref([]);

    const adjustHeight = (index) => {
      const textarea = textAreas.value[index];
      if (textarea) {
        textarea.style.height = "22px";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    async function addValue() {
      items.value[0].required[0].value = "Tham chiếu đến tất cả textarea Tham chiếu đến tất cả textarea"
    }

    onMounted(async () => {
      await nextTick();
      textAreas.value.forEach((textarea, index) => adjustHeight(index));
    });

    watch(
        items.value,
        async () => {
          await nextTick();
          textAreas.value.forEach((textarea, index) => adjustHeight(index));
        },
        { deep: true }
    );

    return {
      items,
      textAreas,
      adjustHeight,
      addValue,
      Collapse,
      isOpen
    };
  },
};
</script>

<style>
.auto-height {
  margin-top: 24px;
  height: 22px;
  overflow: hidden;
  resize: none;

  background: #000;
  color: #fff;
  border: 1px solid #ccc;
}

.wrap {
  padding: 24px;
}
</style>
