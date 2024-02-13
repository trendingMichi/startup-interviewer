<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import MessageClass from '@/model/MessageClass'

import { useDarkModeStore } from '@/stores/DarkMode'
import { useEnglishStore } from '@/stores/UseEnglish'

import Logo from '../assets/images/logo.svg'
import LogoWhite from '../assets/images/logoWhite.svg'

import NavigationBarComponent from '@/components/customUi/NavigationBarComponent.vue'

const DarkModeStore = useDarkModeStore()
const EnglishStore = useEnglishStore()

const route = useRoute()
const chatArray = route.params.chatArray
</script>

<template>
  <NavigationBarComponent class="sticky top-0"></NavigationBarComponent>
  <div class="finish h-screen flex flex-col items-center">
    <h1
      v-if="!EnglishStore.useEnglish"
      class="scroll-m-20 m-10 text-4xl font-extrabold tracking-tight lg:text-5xl"
    >
      Fertig 🎉
    </h1>
    <h1 v-else class="scroll-m-20 m-10 text-4xl font-extrabold tracking-tight lg:text-5xl">
      Finished 🎉
    </h1>
    <div class="pt-0">
      <p v-if="!EnglishStore.useEnglish" class="text-xl text-muted-foreground">
        Danke! Wir haben das Interview gespeichert und unserem Team geschickt 🖊️
      </p>
      <p v-else class="text-xl text-muted-foreground">
        Thanks! We send the interview to our team 🖊️
      </p>
    </div>
    <router-link to="/chat" class="text-blue-500 hover:underline mt-8">Back to Chat</router-link>
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
