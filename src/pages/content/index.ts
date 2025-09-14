import { messageMiddleware } from './modules/middleware';

console.log('Content script works!');
console.log('You need to reload extension to observe changes.');

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messageMiddleware);
