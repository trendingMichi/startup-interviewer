import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEnglishStore = defineStore('useEnglish', () => {
  const useEnglish = useLocalStorage("useEnglish", false)  
  function toggleEnglish() {
    useEnglish.value = !useEnglish.value
  }
  function change(change:boolean) {
    useEnglish.value = change
  }
  return { useEnglish, toggleEnglish, change }
})
