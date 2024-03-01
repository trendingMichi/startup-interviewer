import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSessionStore = defineStore('session', () => {
  const session = ref('') ;
  const captchaFinished = ref(false);
  const formClicked = ref(false);
  function resetSession() {
    session.value = ''
    captchaFinished.value = false;
    formClicked.value = false;
  }
  return { session, captchaFinished, formClicked, resetSession }
})
