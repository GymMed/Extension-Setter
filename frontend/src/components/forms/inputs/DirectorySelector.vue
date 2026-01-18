<template>
    <div
        class="w-full mx-auto p-4 bg-linear-to-br from-emerald-900 via-green-950 to-teal-950 rounded-lg shadow-inner"
    >
        <h2 class="text-lg font-semibold mb-4">Directory Browser</h2>

        <!-- Path Input -->
        <div class="flex gap-2 mb-4">
            <input
                v-model="pathModel"
                type="text"
                class="flex-1 px-3 py-2 border rounded border-lime-300 focus:border-lime-500 focus:outline-none focus:ring-green-500 focus:ring-2 focus:ring-offset-transparent"
                placeholder="Enter relative path (e.g. . or projects)"
            />
            <button
                type="button"
                @click="loadDirectories"
                class="px-4 py-2 bg-lime-600 text-white rounded hover:bg-lime-700"
            >
                Load
            </button>
        </div>

        <!-- Error -->
        <p v-if="error" class="text-sm text-red-600 mb-2">
            {{ error }}
        </p>

        <nav class="mb-3 text-sm text-lime-600 flex flex-wrap gap-1">
            <!-- root -->
            <span class="cursor-pointer hover:underline" @click="goToRoot"> root / </span>

            <!-- segments -->
            <span
                v-for="(segment, index) in pathParts"
                :key="index"
                class="cursor-pointer hover:underline"
                @click="goToSegment(index)"
            >
                {{ segment }} /
            </span>
        </nav>

        <!-- Directory List -->
        <DirectoriesList
            :directories="directories"
            :loaded="loaded"
            :show-parent="pathParts.length > 0"
            @select="enterDirectory"
        />

        <!-- Selected Path -->
        <div v-if="pathModel" class="mt-4 text-sm">
            <span class="font-medium">Selected:</span>
            <span class="text-lime-600">{{ pathModel }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import axios from '@/assets/js/api/axios';
import type { DirectoryItem, DirectoryResponse } from '@/types/directory';
import DirectoriesList from '@/components/Directories/DirectoriesList.vue';

const props = withDefaults(
    defineProps<{
        modelValue?: string;
    }>(),
    {
        modelValue: '',
    }
);

const currentPath = ref<string>(props.modelValue);
const directories = ref<DirectoryItem[]>([]);
const error = ref<string>('');
const loaded = ref<boolean>(false);
//const selectedPath = ref<string>('');

const pathModel = computed<string>({
    get: () => props.modelValue || '.',
    set: (val) => emit('update:modelValue', val),
});

const resolvePath = (input: string): string => {
    const parts = [...pathParts.value];

    if (input === '..') {
        parts.pop();
    } else if (input !== '.') {
        parts.push(input);
    }

    return parts.length ? parts.join('/') : '.';
};

const loadDirectories = async (): Promise<void> => {
    error.value = '';
    loaded.value = false;

    try {
        const response = await axios.post<DirectoryResponse>('api/directories/path', {
            directory: currentPath.value,
        });

        directories.value = response.data.directories;
        loaded.value = true;
        console.log('Loaded directories:', directories.value, ' path:', currentPath.value);
    } catch (err: any) {
        error.value = err.response?.data?.error ?? 'Failed to load directories';
    }
};

const normalizePath = (path: string): string[] => {
    if (path === '.' || path === '') return [];
    return path.split('/').filter(Boolean);
};

const pathParts = computed<string[]>(() => normalizePath(currentPath.value));

const goToRoot = (): void => {
    currentPath.value = '.';
    pathModel.value = '.';
    loadDirectories();
};

const enterDirectory = (dirName: string): void => {
    currentPath.value = resolvePath(dirName);

    pathModel.value = currentPath.value;
    loadDirectories();
};

const goToSegment = (index: number): void => {
    currentPath.value = pathParts.value.slice(0, index + 1).join('/');

    pathModel.value = currentPath.value;
    loadDirectories();
};

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();
</script>