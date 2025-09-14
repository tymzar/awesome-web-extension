export const MESSAGE_TYPES = {
  GET_BODY: 'GET_BODY',
  POST_COLORS: 'POST_COLORS',
};

export type MessageTypes = keyof typeof MESSAGE_TYPES;

export type RequestMessage = DOMMessage | PostColorsMessage;

export type DOMMessage = {
  type: MessageTypes;
};

export type PostColorsMessage = {
  type: typeof MESSAGE_TYPES.POST_COLORS;
  colors: Array<string>;
};

export type PostColorsMessageResponse = {
  status: StatusResponse;
};

type DOMMessageResponse = {
  title: string;
  body: HTMLElement;
  status: StatusResponse;
};

export const STATUS_RESPONSE = {
  ERROR: 'error',
  SUCCESS: 'success',
  INFO: 'info',
} as const;

export type StatusResponse = (typeof STATUS_RESPONSE)[keyof typeof STATUS_RESPONSE];

type GetResponse = DOMMessageResponse;

type PostResponse = PostColorsMessageResponse;

export type ContentMessageResponse = {
  message: GetResponse | PostResponse;
};
