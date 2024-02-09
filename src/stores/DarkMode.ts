import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDarkModeStore = defineStore('darkMode', () => {
  const darkMode = useLocalStorage("darkMode", true)  
  function toggleDarkMode() {
    darkMode.value = !darkMode.value
  }
  return { darkMode, toggleDarkMode }
})
