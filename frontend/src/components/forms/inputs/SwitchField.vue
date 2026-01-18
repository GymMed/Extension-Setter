<script lang="ts" setup>
defineProps<{
    id?: string;
    name?: string;
    label?: string;
    modelValue: boolean;
}>();

defineEmits(["update:modelValue"]);
</script>
<template>
    <div class="switch-container">
        <label
            v-if="label"
            :for="id"
            class="cursor-pointer font-medium text-sm text-gray-700 dark:text-gray-300"
        >
            {{ label }}
        </label>
        <label class="switch right-0.5">
            <input
                type="checkbox"
                :id="id"
                :name="name"
                :checked="modelValue"
                @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
            />
            <span class="slider"></span>
        </label>
    </div>
</template>
