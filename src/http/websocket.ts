import type { AIResponseInterface } from '@/model/AIResponseInterface'

var ws : WebSocket;


export function sendMsg(msg: string, session_key: string) {
  const payload = {
    data: {
      text: msg
    },
    'session-key': session_key
  }

  console.log(payload)
  console.log("___________")
  console.log(ws)

  ws.send(JSON.stringify(payload))
}

export function receivedMsg(callback: (response: AIResponseInterface) => void) {
  ws.onmessage = (event) => {
    const response: AIResponseInterface = JSON.parse(event.data)
    console.log(response)
    callback(response)
    
  }
}

export async function startConversation(callback: (response: any) => void) {
  ws = new WebSocket('wss://chat.newsrooms.ai/websocket/');
  // ws = new WebSocket('ws://localhost:8899');
  // ws = new WebSocket('ws://127.0.0.1:8075/');
  ws.onopen = () => {
    sendMsg('Hallo', '')
    receivedMsg(callback)
  }
  console.log(ws)
}

export function finishConversation(session_key: string | undefined, email: string) {
  const payload = {
    type: 'STATUS',
    value: 'FINISH',
    'session-key': session_key,
    email: email
  }
  console.log("FINISHED")
  ws.send(JSON.stringify(payload))
}