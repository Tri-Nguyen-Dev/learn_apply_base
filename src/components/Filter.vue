<template>
  <div>
    <input type="text" v-model="search" placeholder="Search by name" />
    <select v-model="selectedCategory">
      <option value="">All Categories</option>
      <option value="A">Category A</option>
      <option value="B">Category B</option>
    </select>
    <div>
      <label>
        <input
            type="checkbox"
            :value="'tag1'"
            v-model="selectedTags"
        />
        Tag 1
      </label>
      <label>
        <input
            type="checkbox"
            :value="'tag2'"
            v-model="selectedTags"
        />
        Tag 2
      </label>
    </div>

    <ul>
      <li v-for="item in filteredItems" :key="item.name">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useFilter } from '@/composibles/useFilter';

interface Item {
  name: string;
  category: string;
  tags: string[];
}

// Giả sử bạn có một danh sách các item
const items: Item[] = [
  { name: 'Item 1', category: 'A', tags: ['tag1', 'tag2'] },
  { name: 'Item 2', category: 'B', tags: ['tag2', 'tag3'] },
  // ... các item khác
];

const search = ref('');
const selectedCategory = ref('');
const selectedTags = ref<string[]>([]);

const { filteredList: filteredItems, setFilter, setFilterFunction } = useFilter(items);

// Đặt filter functions cho các field
setFilterFunction('search', (item: Item, value: string) =>
    item.name.toLowerCase().includes(value.toLowerCase())
);
setFilterFunction('category', (item: Item, value: string) =>
    item.category === value
);
setFilterFunction('tags', (item: Item, value: string[]) =>
    value.every((tag) => item.tags.includes(tag))
);

// Theo dõi các thay đổi filter và cập nhật giá trị
watch(search, (value) => setFilter('search', value));
watch(selectedCategory, (value) => setFilter('category', value));
watch(selectedTags, (value) => setFilter('tags', value));
</script>
