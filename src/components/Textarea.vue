<template>
  <div class="wrap">


    <button @click="handleCollapse">
      Toggle Collapse
    </button>

    <div ref="collapse" class="collapse-he">
      <div v-for="(item, index) in items" :key="index">
        <div v-for="(item2, index2) in item.required" :key="index2" class="item">
         <textarea
             v-model="item2.value"
             ref="textAreas"
             class="auto-height"
         />
          <n-checkbox-group v-if="item2?.options?.length" v-model:value="item2.value">
            <n-space item-style="display: flex;">
              <n-checkbox v-for="option in item2?.options" :value="option" :label="option" />
            </n-space>
          </n-checkbox-group>
        </div>

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
            value:'Tham chiếu đến tất cả textarea Tham chiếu đến tất cả textarea',
            options: [
              'Beijing',
              ' Shanghai',
              ' Guangzhou',
              ' Shenzhen',
            ]
          },
          {
            title:'1',
            value:'',
            options: []
          },
          {
            title:'1',
            value:'',
            options: []
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
    const collapse = ref(null);

    const handleCollapse = () => {
      isOpen.value = !isOpen.value;
      if(isOpen.value) {
        collapse.value.style.maxHeight =  collapse.value.scrollHeight + "px";
      }
      else {
        collapse.value.style.maxHeight = 0;
      }
    }

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
      isOpen,
      handleCollapse,
      collapse
    };
  },
};
</script>

<style>
.auto-height {
  margin-top: 24px;
  height: 22px;
  resize: none;

  background: #000;
  color: #fff;
  border: 1px solid #ccc;
  max-height: 100px;
}

.wrap {
  padding: 24px;
}

.collapse-he {
  transition: max-height 0.2s ease-out;
  max-height: 0;
  overflow: hidden;
}
</style>
