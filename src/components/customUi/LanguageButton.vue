<template>
  <Button
    @click="toggleEnglish()"
    variant="ghost"
    class="w-10 h-10"
    :class="{
      'bg-white': DarkModeStore.darkMode,
      'bg-black': !DarkModeStore.darkMode,
      'text-black': DarkModeStore.darkMode,
      'text-white': !DarkModeStore.darkMode
    }"
  >
    <div v-if="EnglishStore.useEnglish">DE</div>
    <div v-else>EN</div>
  </Button>
</template>
<script setup lang="ts">
import { Moon, SunIcon } from 'lucide-vue-next'
import { Button } from '../ui/button'
import { useEnglishStore } from '@/stores/UseEnglish'
import { useDarkModeStore } from '@/stores/DarkMode'

const DarkModeStore = useDarkModeStore()

const EnglishStore = useEnglishStore()

function toggleEnglish() {
  const body = document.querySelector('body')
  EnglishStore.useEnglish ? body?.classList.remove('english') : body?.classList.add('english')
  EnglishStore.toggleEnglish()
  return EnglishStore.useEnglish
}
</script>
