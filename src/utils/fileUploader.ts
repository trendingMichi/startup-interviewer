import { sendFiles } from '@/http/websocket'

export function readFileContents(file: File, session_key: string) {
  const reader = new FileReader()
  reader.onload = () => {
    sendFile(reader.result as ArrayBuffer, file, session_key)
  }
  reader.onerror = () => {
    console.error('Error reading file:', reader.error)
  }
  reader.readAsArrayBuffer(file)
}

export function sendFile(fileContent: ArrayBuffer, file: File, session_key: string) {
  sendFiles(session_key, file, fileContent)
}
