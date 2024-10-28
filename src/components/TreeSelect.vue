<script lang="ts" setup>
import {computed, onMounted, ref} from "vue";
import type {TreeOption} from "naive-ui/es/tree/src/interface";

const checkedKeysRef = ref<any[]>([])

const listMessage = ref([])

const excuse = ref('')

const defaultValue = ref(['aws', 'aws_2'])

const data = ref([
  {
    label: 'Default',
    key: 'default',
    children: [
      {
        label: 'aws',
        key: 'aws',
      },
      {
        label: 'aws_2',
        key: 'aws_2',
      }
    ]
  },
  {
    label: 'aws_excuse',
    key: 'aws_excuse',
    isExcuse: true,
    children: []
  },
  {
    label: 'aws_excuse_2',
    key: 'aws_excuse_2',
    isExcuse: true,
    children: []
  }
])

interface metaType {
  node: TreeOption | null;
  action: 'check' | 'uncheck';
}

function handleCheckedKeysChange(value: Array<string & number>, option: Array<TreeOption | null>, meta: metaType) {
  const key = meta.node?.key as string
  const isExcuse = meta.node?.isExcuse

  if(excuse.value === 'default' && isExcuse) {
    alert('hello')
    return
  }
  if(excuse.value && excuse.value !== 'default' && key !== excuse.value ) {
    alert('hello')
    return
  }

  if(isExcuse) {
    if (meta.action === 'check') {
      checkedKeysRef.value = [key]
    }
    else {
      checkedKeysRef.value = []
    }
  }
  else {
    if (meta.action === 'check') {
      checkedKeysRef.value = option.filter(item => !item?.isExcuse).map(item => item?.key)
    }
    else {
      checkedKeysRef.value = value.filter((item) => item !== key)
    }
  }
}

const nameIsExcuse = computed(() => {
  return data.value.find((item) => checkedKeysRef.value.includes(item.key) && item?.isExcuse)
})

onMounted(() => {
  setTimeout(() => {
    if(listMessage.value.length) {
      excuse.value = 'default'

      if(excuse.value === 'default') {
        checkedKeysRef.value = ['aws', 'aws_2']
      }

      else {
        checkedKeysRef.value = [excuse.value]
      }
    }
    else {
      checkedKeysRef.value = ['aws', 'aws_2']
    }
  }, 200)
})

</script>

<template>
  {{ nameIsExcuse?.label }}
  <n-tree
      block-line
      checkable
      :data="data"
      :checked-keys="checkedKeysRef"
      @update:checked-keys="handleCheckedKeysChange"
      cascade
      default-expand-all
  />
</template>
