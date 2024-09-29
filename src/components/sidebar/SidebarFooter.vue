<script setup lang="ts">
import Icon from '@/assets/Icon.svg'
import {useSidebar} from "@/stores/sidebar";
const sidebarStore = useSidebar()

</script>

<template>
  <div class="footer">
    FOOTER

    <div v-if="sidebarStore.isCollapsed">
      <img :src="Icon" alt="">
    </div>
  </div>
</template>

<style scoped lang="scss">
.footer {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

</style>