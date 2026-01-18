<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import GlobalMessenger from './components/Messenger/GlobalMessenger.vue';
</script>

<template>
    <div
        class="bg-linear-to-br from-emerald-900 to-zinc-950 text-white min-h-screen flex justify-center items-center"
    >
        <div class="max-w-7xl mx-0 my-auto font-normal p-8 lg:grid lg:grid-cols-2 lg:px-8 lg:gap-5">
            <header class="flex flex-col justify-center">
                <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
                <div class="wrapper">
                    <HelloWorld msg="Extension setter!" />
                    <nav class="flex gap-2">
                        <RouterLink to="/" v-slot="{ isActive }"
                            ><div
                                class="no-underline transition duration-500 p-1"
                                :class="
                                    isActive
                                        ? 'text-lime-500 drop-shadow-[0_0_12px_rgba(34,197,94,0.85)] hover:text-indigo-500 hover:drop-shadow-[0_0_12px_rgba(14,165,233,0.85)]'
                                        : 'text-emerald-500 hover:text-emerald-700'
                                "
                            >
                                Extension Setter
                            </div></RouterLink
                        >
                        <RouterLink to="/files-grouper" v-slot="{ isActive }"
                            ><div
                                class="no-underline transition duration-500 p-1"
                                :class="
                                    isActive
                                        ? 'text-lime-500 drop-shadow-[0_0_12px_rgba(34,197,94,0.85)] hover:text-indigo-500 hover:drop-shadow-[0_0_12px_rgba(14,165,233,0.85)]'
                                        : 'text-emerald-500 hover:text-emerald-700'
                                "
                            >
                                Files Grouper
                            </div></RouterLink
                        >
                        <RouterLink to="/about" v-slot="{ isActive }"
                            ><div
                                class="no-underline transition duration-500 p-1"
                                :class="
                                    isActive
                                        ? 'text-lime-500 drop-shadow-[0_0_12px_rgba(34,197,94,0.85)] hover:text-indigo-500 hover:drop-shadow-[0_0_12px_rgba(14,165,233,0.85)]'
                                        : 'text-emerald-500 hover:text-emerald-700'
                                "
                            >
                                About
                            </div></RouterLink
                        >
                    </nav>
                </div>
            </header>

            <RouterView />
        </div>

        <GlobalMessenger />
    </div>
</template>