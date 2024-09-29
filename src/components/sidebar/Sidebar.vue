<script setup lang="ts">
import SidebarHeader from "@/components/sidebar/SidebarHeader.vue";
import {useSidebar} from "@/stores/sidebar";
import {computed} from "vue";
import MenuItem from "@/components/sidebar/MenuItem.vue";
import SidebarFooter from "@/components/sidebar/SidebarFooter.vue";
import Icon from "@/assets/Icon.svg";

const sidebarStore = useSidebar()

const sidebarClass = computed(() => ({
  collapsed: sidebarStore.isCollapsed,
}));

</script>

<template>
  <transition name="sidebar-width">
    <div :class="sidebarClass" class="sidebar">
      <SidebarHeader class="menu-header" />

      <div v-if="sidebarStore.isCollapsed">
        <img :src="Icon" alt="">
      </div>

      <MenuItem v-else class="menu-item" />
      <SidebarFooter class="mt-12" />
    </div>
  </transition>
</template>



<style scoped lang="scss">
.container {
  display: flex;
}

/* Sidebar */
.sidebar {
  width: 250px;
  background-color: #f8f9fa;
  padding: 10px;
  transition: width 0.3s ease;
  height: 100vh;

  display: flex;
  flex-direction: column;
}

.menu-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.collapsed {
  width: 80px; /* Width khi thu nhỏ */
}

/* Main content */
.main-content {
  flex-grow: 1;
  padding: 20px;
}

/* Transition for sidebar width */
.sidebar-width-enter-active, .sidebar-width-leave-active {
  transition: width 0.3s ease;
}
</style>
