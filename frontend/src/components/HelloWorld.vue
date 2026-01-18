<script setup lang="ts">
defineProps<{
    msg: string;
}>();
</script>

<template>
    <div class="greetings">
        <h1 class="text-green-500 font-semibold text-4xl tracking-wider">{{ msg }}</h1>
        <h3 class="text-2xl">
            You’ve successfully launched a
            <span
                class="py-0.5 inline-block whitespace-nowrap px-1 rounded bg-linear-to-br from-green-500 to-green-700 text-white border-green-900"
                >Extension setter</span
            >
            project
        </h3>
    </div>
</template>