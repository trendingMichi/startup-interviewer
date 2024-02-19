import type { AIResponseInterface } from '@/model/AIResponseInterface'

let ws = new WebSocket('wss://chat.newsrooms.ai/websocket/');


export function sendMsg(msg: string, session_key: string) {
  const payload = {
    data: {
      text: msg
    },
    'session-key': session_key
  }

  ws.send(JSON.stringify(payload))
}

export function receivedMsg(callback: (response: AIResponseInterface) => void) {
  ws.onmessage = (event) => {
    const response: AIResponseInterface = JSON.parse(event.data)
    callback(response)
  }
}

export async function startConversation(callback: (response: any) => void) {
  let ws = new WebSocket('wss://chat.newsrooms.ai/websocket/');


  ws.onopen = () => {
    sendMsg('Hallo', '')
    receivedMsg(callback)
  }
}

export function finishConversation(session_key: string | undefined, email: string) {
  const payload = {
    type: 'STATUS',
    value: 'FINISH',
    'session-key': session_key,
    email: email
  }
  ws.send(JSON.stringify(payload))
}
