<template>
  <Button @click="toggleDarkMode()" variant="ghost" class="w-10 h-10">
    <div v-if="DarkModeStore.darkMode">
      <SunIcon />
    </div>
    <div v-else>
      <Moon />
    </div>
  </Button>
</template>
<script setup lang="ts">
import { Moon, SunIcon } from 'lucide-vue-next'
import { Button } from '../ui/button'
import { useDarkModeStore } from '@/stores/DarkMode'

const DarkModeStore = useDarkModeStore()

function toggleDarkMode() {
  const body = document.querySelector('body')
  DarkModeStore.darkMode ? body?.classList.remove('dark') : body?.classList.add('dark')
  DarkModeStore.toggleDarkMode()
  return DarkModeStore.darkMode
}
</script>
