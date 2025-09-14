import type { ContentMessageResponse, PostColorsMessage, RequestMessage } from './middleware.types';
import { MESSAGE_TYPES } from './middleware.types';

export function messagesFromReactAppListener(
  message: RequestMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: ContentMessageResponse) => void
): void {
  console.log('[content.js]. Message received', message);
  let response: ContentMessageResponse = {
    message: {
      status: 'error',
    },
  };

  switch (message.type) {
    case MESSAGE_TYPES.GET_BODY: {
      response = {
        message: {
          title: document.title,
          body: document.body,
          status: 'success',
        },
      };
      break;
    }
    case MESSAGE_TYPES.POST_COLORS: {
      const requestMessage = message as PostColorsMessage;

      // if there is body then render boxes with colors with react as a child of body
      const colors = requestMessage.colors;

      if (colors.length > 0) {
        for (const color of colors) {
          const box = document.createElement('div');
          box.style.backgroundColor = color;
          box.style.position = 'fixed';
          box.style.top = '64px';
          box.style.left = `${64 + colors.indexOf(color) * 8 + colors.indexOf(color) * 32}px`;
          box.style.width = '32px';
          box.style.height = '32px';
          box.style.zIndex = '200';
          document.body.append(box);
        }
      }

      response = {
        message: {
          status: 'success',
        },
      };

      break;
    }
  }

  console.log('[content.js]. Message response', response);

  sendResponse(response);
}
