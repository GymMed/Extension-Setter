<script setup lang="ts">
import { useMessengerStore } from '@/assets/js/composables/useMessengerStore';
import { ENUM_MESSAGE_TYPES } from '@/assets/js/enums/MessageTypeEnum';
</script>

<template>
    <div class="fixed top-4 right-4 z-50 w-80 max-h-[70vh] overflow-y-auto space-y-2 p-2">
        <div
            v-for="msg in useMessengerStore.messages"
            :key="msg.id"
            class="px-4 py-3 bg-linear-to-br border from-emerald-900 to-zinc-950 rounded text-sm text-white animate-fade-in shadow-[0_0_5px_rgba(0,0,0,0.15)]"
            :class="{
                'shadow-indigo-500 border-sky-500': msg.type === ENUM_MESSAGE_TYPES.INFO,
                'shadow-green-500 border-lime-500': msg.type === ENUM_MESSAGE_TYPES.SUCCESS,
                'shadow-red-500 border-rose-500': msg.type === ENUM_MESSAGE_TYPES.ERROR,
            }"
        >
            {{ msg.text }}
        </div>
    </div>
</template>