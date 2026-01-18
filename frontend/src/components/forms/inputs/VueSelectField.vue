<script lang="ts" setup>
import "vue-select/dist/vue-select.css";

interface SelectOption {
    value: string;
    label: string;
}

defineProps<{
    id?: string;
    name?: string;
    label: string;
    modelValue: string;
    options: { value: string; label: string }[];
}>();

function reduceScopeOption(option: SelectOption) {
    return option.value;
}

defineEmits(["update:modelValue"]);
</script>
<template>
    <div class="flex flex-col gap-1">
        <label class="block font-semibold">{{ label }}</label>
        <v-select
            :id="id"
            :name="name"
            :options="options"
            :reduce="reduceScopeOption"
            label="label"
            :modelValue="modelValue"
            @update:modelValue="$emit('update:modelValue', $event)"
        />
    </div>
</template>
