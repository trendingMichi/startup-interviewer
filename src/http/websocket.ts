import type { AIResponseInterface } from '@/model/AIResponseInterface'

const ws = new WebSocket('ws://localhost:8899')

export function sendMsg(msg: string, session_key: string) {
  const payload = {
    data: {
      text: msg
    },
    'session-key': session_key
  }
  console.log(session_key)

  ws.send(JSON.stringify(payload))
}

export function receivedMsg(callback: (response: AIResponseInterface) => void) {
  ws.onmessage = (event) => {
    const response: AIResponseInterface = JSON.parse(event.data)
    callback(response)
  }
}

export function startConversation(callback: (response: any) => void) {
  sendMsg('Hallo', '')
  receivedMsg(callback)
}

export function finishConvesation(session_key: string | undefined, email: string) {
  const payload = {
    type: 'STATUS',
    value: 'FINISH',
    'session-key': session_key,
    email: email
  }
  ws.send(JSON.stringify(payload))
}
