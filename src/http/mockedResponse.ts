import type { AIResponseInterface } from "@/model/AIResponseInterface";

export const mockMessages: AIResponseInterface[] = [
    { type: 'STATUS', status: 'BEGIN', session_key: 'mockSessionKey', value: 'BEGIN' },
    { type: 'TEXT', status: '', session_key: 'mockSessionKey', value: 'Hello! How can I help you today?' },
    { type: 'TEXT', status: '', session_key: 'mockSessionKey', value: 'Sure, I can assist with that.' },
    { type: 'TEXT', status: '', session_key: 'mockSessionKey', value: 'Thank you!' },
    { type: 'TEXT', status: '', session_key: 'mockSessionKey', value: 'Thank you!' },
    { type: 'TEXT', status: '', session_key: 'mockSessionKey', value: 'Thank you!' },
    { type: 'TEXT', status: '', session_key: 'mockSessionKey', value: 'Thank you!' },
    { type: 'TEXT', status: '', session_key: 'mockSessionKey', value: 'Thank you!' },
    { type: 'TEXT', status: '', session_key: 'mockSessionKey', value: 'Thank you!' },
    { type: 'TEXT', status: '', session_key: 'mockSessionKey', value: 'Thank you!' },
    { type: 'STATUS', status: 'END', session_key: 'mockSessionKey', value: 'END' },
  ];


 export function mockReceiveMessages(handler: any) {
    let index = 0;
    const interval = setInterval(() => {
      const msg = mockMessages[index];
      handler(msg, new Date());
      index++;
  
      // Stop the interval when all mock messages are sent
      if (index === mockMessages.length) {
        clearInterval(interval);
      }
    }, 200); // Adjust the interval as needed
  }