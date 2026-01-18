import type { EnumMessageType } from '../enums/MessageTypeEnum';

export interface IMessage {
    id: number;
    text: string;
    type: EnumMessageType;
}
