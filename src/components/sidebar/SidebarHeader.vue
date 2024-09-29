<script setup lang="ts">
import {useSidebar} from "@/stores/sidebar.js";

const sidebarStore = useSidebar()
</script>

<template>
  <div>
    <button v-if="sidebarStore.isCollapsed" @click="sidebarStore.toggleCollapse()">
      Collapse
    </button>

    <button v-else @click="sidebarStore.toggleCollapse()">
      Expand
    </button>
  </div>
</template>