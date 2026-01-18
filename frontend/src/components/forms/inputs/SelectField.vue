<script lang="ts" setup>
defineProps<{
    id?: string;
    name?: string;
    label: string;
    modelValue: string;
    options: { value: string; label: string }[];
}>();

defineEmits(['update:modelValue']);
</script>
<template>
    <div class="flex flex-col gap-1">
        <label class="block font-semibold">{{ label }}</label>
        <select
            :id="id"
            :name="name"
            :value="modelValue"
            @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
            class="w-full p-2 border border-gray-400 rounded focus:ring-4 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-transparent"
        >
            <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.label }}
            </option>
        </select>
    </div>
</template>
