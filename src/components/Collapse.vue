<template>
  <div class="collapse-wrapper">
    <div class="collapse-content" ref="content" :style="collapseStyle">
      <slot></slot> <!-- Nội dung sẽ được truyền vào đây -->
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const content = ref(null);

// Tính toán chiều cao động khi nội dung thay đổi
const collapseStyle = computed(() => {
  return {
    height: props.isOpen ? `${content.value.scrollHeight}px` : '0',
    overflow: 'hidden',
    transition: 'height 0.3s ease-in-out', // Thêm transition cho mượt mà
  };
});

// Theo dõi sự thay đổi của nội dung
watch(
    () => props.isOpen,
    () => {
      // Khi `isOpen` thay đổi, tính lại chiều cao của nội dung
      if (content.value) {
        content.value.style.height = props.isOpen
            ? `${content.value.scrollHeight}px`
            : '0';
      }
    }
);
</script>

<style scoped>
.collapse-wrapper {
  width: 100%;
}

.collapse-content {
  padding: 0 10px; /* Tùy chỉnh padding cho đẹp */
}
</style>
