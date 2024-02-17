<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import './http/websocket'
import { useDarkModeStore } from '@/stores/DarkMode'
import { useEnglishStore } from '@/stores/UseEnglish'

const DarkModeStore = useDarkModeStore()

function toggleDarkMode() {
  const body = document.querySelector('body')
  !DarkModeStore.darkMode ? body?.classList.remove('dark') : body?.classList.add('dark')
  return DarkModeStore.darkMode
}

const EnglishStore = useEnglishStore()

function toggleEnglish() {
  const body = document.querySelector('body')
  !EnglishStore.useEnglish ? body?.classList.remove('english') : body?.classList.add('english')
  return EnglishStore.useEnglish
}
// const router = useRouter()
// router.push('/chat')
toggleDarkMode()
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/"></RouterLink>
      <RouterLink to="/finish"></RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped></style>
