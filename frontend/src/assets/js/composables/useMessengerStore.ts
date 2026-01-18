import { reactive } from 'vue';
import type { IMessage } from '@/assets/js/interfaces/IMessage';
import type { EnumMessageType } from '@/assets/js/enums/MessageTypeEnum';

let idCounter = 0;

export const useMessengerStore = reactive({
    messages: [] as IMessage[],

    send(text: string, type: EnumMessageType = 'INFO') {
        const id = ++idCounter;

        this.messages.push({ id, text, type });

        setTimeout(() => {
            this.remove(id);
        }, 5000);
    },

    remove(id: number) {
        this.messages = this.messages.filter((m) => m.id !== id);
    },
});
