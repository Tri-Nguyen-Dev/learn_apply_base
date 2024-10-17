import { ref, computed } from 'vue';

export function useFilter<T>(list: T[]) {
    const filters = ref<Record<string, any>>({});
    const filterFunctions = ref<Record<string, (item: T, value: any) => boolean>>({});

    const filteredList = computed(() => {
        return list.filter((item) => {
            return Object.keys(filters.value).every((key) => {
                const filterValue = filters.value[key];
                const filterFunction = filterFunctions.value[key];

                if (filterFunction && filterValue !== undefined && filterValue !== null) {
                    return filterFunction(item, filterValue);
                }

                return true;
            });
        });
    });

    const setFilter = (key: string, value: any) => {
        filters.value[key] = value;
    };

    const setFilterFunction = (key: string, fn: (item: T, value: any) => boolean) => {
        filterFunctions.value[key] = fn;
    };

    return {
        filteredList,
        setFilter,
        setFilterFunction,
        filters,
    };
}
