<template>
  <div>
    <MenuList class="menu-list-wrap" />
    <MenuList class="menu-list-wrap" />
  </div>
</template>
<script setup lang="ts">
import MenuList from "@/components/sidebar/MenuList.vue";
</script>

<style scoped lang="scss">
.menu-list-wrap {
  flex: 1;
}
</style>