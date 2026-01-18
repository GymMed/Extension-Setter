<script setup lang="ts">
import { ref } from 'vue';
import DirectorySelector from './inputs/DirectorySelector.vue';
import axios from '@/assets/js/api/axios';
import type { IExtensionFixResponse } from '@/assets/js/interfaces/IExtensionFixResponse';
import type { IAssignMissingExtensionsForm } from '@/assets/js/interfaces/IAssignMissingExtensionsForm';
import InputField from './inputs/InputField.vue';
import { useMessengerStore } from '@/assets/js/composables/useMessengerStore';
import { ENUM_MESSAGE_TYPES } from '@/assets/js/enums/MessageTypeEnum';
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

const form = ref<IAssignMissingExtensionsForm>({
    location: '',
    extension: '',
    //...props.data,
});

async function handleFixMissingExtensions() {
    try {
        const serializedData = JSON.parse(JSON.stringify(form.value));
        console.log(serializedData);

        const response = await axios.post<IExtensionFixResponse>(
            'api/extension/add-missing-extensions',
            {
                directory: form.value.location,
                extension: form.value.extension,
            }
        );

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
        @submit.prevent="handleFixMissingExtensions"
        class="w-full text-base p-2 shadow-green-500 shadow-[0_0_15px_rgba(0,0,0,0.15)] flex flex-col gap-3 rounded border border-lime-500"
    >
        <div class="w-full flex flex-col gap-2">
            <DirectorySelector v-model="form.location" />
        </div>

        <InputField
            label="Extension to add"
            v-model="form.extension"
            placeholder="What to add for extensionless files? .jpg?"
            name="extension"
        />

        <button
            type="submit"
            class="px-4 py-2 w-full cursor-pointer rounded bg-linear-to-br from-green-500 to-emerald-600 text-white font-semibold hover:from-green-700 hover:to-emerald-800 focus:ring focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-transparent"
        >
            Save
        </button>
    </form>
</template>