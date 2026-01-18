<script setup lang="ts">
import { ref } from 'vue';
import DirectorySelector from './inputs/DirectorySelector.vue';
import axios from '@/assets/js/api/axios';
import type { IExtensionFixResponse } from '@/assets/js/interfaces/IExtensionFixResponse';
import { useMessengerStore } from '@/assets/js/composables/useMessengerStore';
import { ENUM_MESSAGE_TYPES } from '@/assets/js/enums/MessageTypeEnum';
import type { IGroupByExtensionForm } from '@/assets/js/interfaces/IGroupByExtensionForm';
/*
const props = withDefaults(
    defineProps<{
        data?: null
    }>(),
    {
        data: () => ({
            location: '',
        }),
    }
)
*/

const form = ref<IGroupByExtensionForm>({
    location: '',
    //...props.data,
});

async function handlePutFilesToFolders() {
    try {
        const serializedData = JSON.parse(JSON.stringify(form.value));
        console.log(serializedData);

        const response = await axios.post<IExtensionFixResponse>('/api/grouper/extension', {
            directory: form.value.location,
        });

        if (response.status >= 200 && response.status < 300) {
            useMessengerStore.send('Files updated successfully.', ENUM_MESSAGE_TYPES.SUCCESS);
        } else {
            useMessengerStore.send(response.data.message, ENUM_MESSAGE_TYPES.ERROR);
        }
    } catch (err) {
        console.error('handlePutFilesToFolders error:', err);
        useMessengerStore.send('Files failed to be updated.', ENUM_MESSAGE_TYPES.ERROR);
    }
}
</script>

<template>
    <form
        @submit.prevent="handlePutFilesToFolders"
        class="w-full text-base p-2 shadow-green-500 shadow-[0_0_15px_rgba(0,0,0,0.15)] flex flex-col gap-3 rounded border border-lime-500"
    >
        <div class="w-full flex flex-col gap-2">
            <DirectorySelector v-model="form.location" />
        </div>

        <button
            type="submit"
            class="px-4 py-2 w-full cursor-pointer rounded bg-linear-to-br from-green-500 to-emerald-600 text-white font-semibold hover:from-green-700 hover:to-emerald-800 focus:ring focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-transparent"
        >
            Save
        </button>
    </form>
</template>