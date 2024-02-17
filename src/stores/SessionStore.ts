import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSessionStore = defineStore('session', () => {
  const session = ref('') 
  function resetSession() {
    session.value = ''
  }
  return { session, resetSession }
})
