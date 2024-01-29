<template>
  <Button @click="toggleDarkMode()" variant="ghost">
    <div v-if="isDark">
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
import { ref } from 'vue'

const isDark = ref<Boolean | undefined>(false)

function toggleDarkMode() {
  const body = document.querySelector('body')
  isDark.value ? body?.classList.remove('dark') : body?.classList.add('dark')
  isDark.value = !isDark.value

  return isDark.value
}
</script>
