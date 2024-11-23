<script lang='ts' setup>
import {ref} from "vue";

const test = () => {
  console.log('hello')
}

defineExpose({
  test
})

const options = [
    'Beijing',
    'Shanghai',
    'Guangzhou',
    'Shenzhen'
]

const cities = ref<any>(['Beijing', 'Guangzhou'])

</script>

<template>
  <div>
    <input v-model="cities" />
    <n-checkbox-group v-model:value="cities">
      <n-space item-style="display: flex;">
        <n-checkbox v-for="item in options" :value="item" :label="item" />
      </n-space>
    </n-checkbox-group>
  </div>
</template>
