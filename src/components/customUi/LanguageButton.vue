<template>
  <Button @click="toggleEnglish()" variant="ghost" class="w-10 h-10">
    <div v-if="EnglishStore.useEnglish">DE</div>
    <div v-else>EN</div>
  </Button>
</template>
<script setup lang="ts">
import { Button } from '../ui/button'
import { useEnglishStore } from '@/stores/UseEnglish'


const EnglishStore = useEnglishStore()

function toggleEnglish() {
  const body = document.querySelector('body')
  EnglishStore.useEnglish ? body?.classList.remove('english') : body?.classList.add('english')
  EnglishStore.toggleEnglish()
  return EnglishStore.useEnglish
}
</script>
