// useSidebar.js
import { ref } from 'vue';

export function useSidebar() {
    const isCollapsed = ref(false);

    const toggleCollapse = () => {
        isCollapsed.value = !isCollapsed.value;
    };

    return {
        isCollapsed,
        toggleCollapse,
    };
}
