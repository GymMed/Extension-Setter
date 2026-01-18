<script lang="ts" setup>
import { ref } from 'vue';

withDefaults(
    defineProps<{
        id?: string;
        name?: string;
        label: string;
        modelValue: string;
        placeholder?: string;
        type?: string;
        error?: string;
    }>(),
    {
        placeholder: '',
        type: 'text',
        error: '',
    }
);

const touched = ref(false);

defineEmits(['update:modelValue']);
</script>

<template>
    <div class="flex flex-col gap-1">
        <label class="block font-semibold">{{ label }}</label>
        <input
            :id="id"
            :name="name"
            :type="type"
            :placeholder="placeholder"
            :value="modelValue"
            :class="[
                'w-full p-2 border rounded focus:ring-4 focus:ring-offset-2 focus:ring-offset-emerald-950',
                !touched
                    ? 'border-gray-400 focus:ring-green-500'
                    : error
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-green-500 focus:ring-green-500',
            ]"
            @blur="touched = true"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
        <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
    </div>
</template>
