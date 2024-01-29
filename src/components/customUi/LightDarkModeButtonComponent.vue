<template>
    <Button @click="toggleDarkMode()" variant="ghost">
      <div v-if="!isDark">
        <Moon class="text-white" />
      </div>
      <div v-else>
        <SunIcon />
      </div>
    </Button>
  </template>
  <script setup lang="ts">
  import { Moon, SunIcon } from 'lucide-vue-next'
  import { Button } from '../ui/button'
  import { ref } from 'vue'
  
  const isDark = ref<Boolean | undefined>(false)
  
  function toggleDarkMode() {
    const body = document.querySelector('body')
    isDark.value = !isDark.value
    isDark.value ? body?.classList.remove('dark') : body?.classList.add('dark')
  
    return isDark.value
  }
  </script>
  