<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useEnglishStore } from '@/stores/UseEnglish'
import NavigationBarComponent from '@/components/customUi/NavigationBarComponent.vue'
import NewsRoomAiLogo from '../assets/images/logo.svg'
import NewsRoomAiLogoWhite from '../assets/images/logoWhite.svg'
import TrendingtopicsLogo from '../assets/images/trendingTopics.svg'
import TrendingtopicsLogoWhite from '../assets/images/trendingTopicsWhite.svg'
import { useDarkModeStore } from '@/stores/DarkMode'

const EnglishStore = useEnglishStore()
const DarkModeStore = useDarkModeStore()
const router = useRouter()
</script>

<template>
  <NavigationBarComponent class="sticky top-0"></NavigationBarComponent>
  <div class="finish h-screen flex flex-col items-center px-6">
    <h1 v-if="!EnglishStore.useEnglish" class="scroll-m-20 m-10 text-4xl font-extrabold tracking-tight lg:text-5xl">
      Fertig 🎉
    </h1>
    <h1 v-else class="scroll-m-20 m-10 text-4xl font-extrabold tracking-tight lg:text-5xl">
      Finished 🎉
    </h1>
    <div class="pt-0">
      <p v-if="!EnglishStore.useEnglish" class="text-xl text-muted-foreground text-center">
        Danke! Wir haben das Interview gespeichert und unserem Team geschickt 🖊️
      </p>
      <p v-else class="text-xl text-muted-foreground">
        Thanks! We send the interview to our team 🖊️
      </p>
    </div>
    <div class="flex flex-col items-center gap-5">
      <h4 v-if="!EnglishStore.useEnglish" class=" pt-10 scroll-m-20 text-xl font-semibold tracking-tight">
        Was wir auch machen! </h4>
      <h4 v-else class=" pt-10 scroll-m-20 text-xl font-semibold tracking-tight">What we do!</h4>
      <div v-if="DarkModeStore.darkMode" class="flex gap-7">
        <a href="https://www.trendingtopics.eu/">
          <img :src="TrendingtopicsLogoWhite" alt="TrendingtopicsLogo"
            class="border h-16 p-3 rounded-sm hover:cursor-pointer">
        </a>
        <a href="https://newsrooms.ai/">
          <img :src="NewsRoomAiLogoWhite" alt="NewsRoomAiLogo"
            class="w-52 h-16 p-3 border rounded-sm hover:cursor-pointer">
        </a>
      </div>
      <div v-else class="flex gap-10">
        <a href="https://www.trendingtopics.eu/">
          <img :src="TrendingtopicsLogo" alt="TrendingtopicsLogo" class="border h-16 p-3 rounded-sm hover:cursor-pointer">
        </a>
        <a href="https://newsrooms.ai/">
          <img :src="NewsRoomAiLogo" alt="NewsRoomAiLogo" class="w-52 h-16 p-3 border rounded-sm hover:cursor-pointer">
        </a>

      </div>
    </div>
    <router-link to="/" class="text-blue-500 hover:underline mt-8">Back to Chat</router-link>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
