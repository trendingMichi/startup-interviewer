<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import './http/websocket'
import { useDarkModeStore } from '@/stores/DarkMode'

const DarkModeStore = useDarkModeStore()

function toggleDarkMode() {
  const body = document.querySelector('body')
  !DarkModeStore.darkMode ? body?.classList.remove('dark') : body?.classList.add('dark')
  return DarkModeStore.darkMode
}
const router = useRouter()
router.push('/chat')
toggleDarkMode()
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/chat"></RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped></style>
