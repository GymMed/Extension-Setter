export const ENUM_MESSAGE_TYPES = Object.freeze({
    INFO: 'INFO',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
} as const);

export type EnumMessageType = (typeof ENUM_MESSAGE_TYPES)[keyof typeof ENUM_MESSAGE_TYPES];
