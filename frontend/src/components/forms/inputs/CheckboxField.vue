<script lang="ts" setup>
defineProps<{
    id?: string;
    name?: string;
    label: string;
    modelValue: boolean;
}>();

defineEmits(["update:modelValue"]);
</script>
<template>
    <div class="mb-4 flex items-center gap-2">
        <input
            :id="id"
            :name="name"
            type="checkbox"
            :checked="modelValue"
            @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
        />
        <label :for="id" class="font-medium cursor-pointer">{{ label }}</label>
    </div>
</template>
