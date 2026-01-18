<script lang="ts" setup>
withDefaults(
    defineProps<{
        id?: string;
        name?: string;
        label: string;
        modelValue: string;
        placeholder?: string;
        rows?: number;
    }>(),
    {
        placeholder: '',
        rows: 5,
    }
);

defineEmits(['update:modelValue']);
</script>

<template>
    <div class="flex flex-col gap-1">
        <label class="block font-semibold">{{ label }}</label>
        <textarea
            :id="id"
            :name="name"
            :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
            :rows="rows"
            :placeholder="placeholder"
            class="w-full p-2 border border-gray-400 rounded focus:ring-4 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-transparent"
        ></textarea>
    </div>
</template>
