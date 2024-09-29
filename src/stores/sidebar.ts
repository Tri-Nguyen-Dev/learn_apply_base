import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSidebar = defineStore('sidebar', () => {
    const isCollapsed = ref<boolean>(false)

    const toggleCollapse = () => {
        isCollapsed.value = !isCollapsed.value
    }

    return { isCollapsed, toggleCollapse }
})
