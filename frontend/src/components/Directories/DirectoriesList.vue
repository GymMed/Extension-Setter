<script setup lang="ts">
import type { DirectoryItem } from '@/types/directory';

defineProps<{
    directories: DirectoryItem[];
    loaded?: boolean;
    showParent?: boolean;
}>();

defineEmits<{
    (e: 'select', name: string): void;
}>();
</script>

<template>
    <ul class="space-y-1">
        <li
            v-if="showParent"
            @click="$emit('select', '..')"
            class="flex items-center gap-2 px-3 py-2 rounded cursor-pointer hover:bg-green-300 text-lime-600"
        >
            📁 ..
        </li>

        <li
            v-for="dir in directories"
            :key="dir.name"
            @click="$emit('select', dir.name)"
            class="flex items-center gap-2 px-3 py-2 rounded cursor-pointer hover:bg-lime-300 text-lime-600"
        >
            📁 <span class="text-sm">{{ dir.name }}</span>
        </li>
    </ul>

    <p v-if="loaded && directories.length === 0" class="px-3 py-2 text-sm text-gray-500">
        No directories found.
    </p>
</template>