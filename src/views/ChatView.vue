<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Navigation } from 'lucide-vue-next'
import MessageComponent from '@/components/customUi/MessageComponent.vue'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ref, watch } from 'vue'
import SenderEnum from '@/model/SenderEnum'
import MessageClass from '@/model/MessageClass'
import { sendMsg, receivedMsg, startConversation } from '@/http/websocket'
import NavigationBarComponent from '@/components/customUi/NavigationBarComponent.vue'
import type { AIResponseInterface } from '@/model/AIResponseInterface'
import Logo from '../assets/images/logo.svg'
import LogoWhite from '../assets/images/logoWhite.svg'

import Checkbox from '@/components/ui/checkbox/Checkbox.vue'
import { useDarkModeStore } from '@/stores/DarkMode'
import { useEnglishStore } from '@/stores/UseEnglish'
import { useSessionStore } from '@/stores/SessionStore'
import { englishWords, germanWords } from '../lib/languages'
import { Separator } from '@/components/ui/separator'

const chatArray = ref<MessageClass[]>([])
const DarkModeStore = useDarkModeStore()
const EnglishStore = useEnglishStore()
const { change } = useEnglishStore()
const currentInput = ref('')
const finished = ref(true)
const SessionStore = useSessionStore()
const formClicked = ref(false)
const interviewStarted = ref(false)
watch(currentInput, () => {
  if (finished.value === true) {
    finished.value = true
  }
})

watch(EnglishStore, () => {
  formClicked.value = false
})

function startChat() {
  startConversation((msg: any) => {
    interviewStarted.value = true
    if (msg['session-key']) {
      SessionStore.session = msg['session-key']
    }
    const newTimestamp = new Date()
    handleReceive(msg, newTimestamp)
  })

}

function handleReceive(msg: AIResponseInterface, timestamp: Date) {
  if (msg.value === 'END' && msg.type === 'STATUS') {
    chatArray.value[chatArray.value.length - 1].state = true
    finished.value = true
    return
  }
  if (msg.value === 'BEGIN' && msg.type === 'STATUS') {
    chatArray.value.push(new MessageClass(timestamp, '', SenderEnum.AI, false))
    finished.value = false
    return
  }
  const lastMessage = chatArray.value[chatArray.value.length - 1]
  if (lastMessage && msg.value !== 'START' && msg.type !== 'STATUS') {
    lastMessage.content += msg.value
  }
}

function detectLanguage(text: string) {
  // Count occurrences of common English and German words
  let englishCount = 0
  let germanCount = 0

  // Convert text to lowercase for case-insensitive comparison
  const lowerText = text.toLowerCase()

  // Count occurrences of English words
  for (const word of englishWords) {
    if (lowerText.includes(word)) {
      englishCount++
    }
  }

  // Count occurrences of German words
  for (const word of germanWords) {
    if (lowerText.includes(word)) {
      germanCount++
    }
  }

  // Compare counts to determine the language
  if (englishCount > germanCount) {
    return true
  } else if (germanCount > englishCount) {
    return false
  } else {
    // Default to English if counts are equal
    return null
  }
}

function handleSend(content: string, timestamp: Date, sender: SenderEnum, session_key: string) {
  if (session_key === '') {
    return null
  }

  if (detectLanguage(content) != null) {
    change(detectLanguage(content))
  }

  const newMessage = new MessageClass(timestamp, content, sender, true)
  chatArray.value.push(newMessage)
  console.log(session_key)

  sendMsg(newMessage.content, session_key)
  receivedMsg((msg: AIResponseInterface) => {
    handleReceive(msg, timestamp)
  })
  currentInput.value = ''
}

function iAbbrechen() {
  chatArray.value = null
  SessionStore.resetSession();
  currentInput.value = null
  interviewStarted.value = false
}
</script>

<template>
  <main>
    <div class="h-screen flex flex-col">
      <NavigationBarComponent :session-key="SessionStore.session" :chatArray="chatArray" :interviewStarted="interviewStarted"
        @update:iAbbrechen="iAbbrechen" class="sticky top-0"></NavigationBarComponent>
      <ScrollArea class="flex-1 ">
        <div v-if="SessionStore.session !== ''" class="bg-background">
          <div class="flex flex-col w-[80rem] mx-auto">
            <div class="flex-1">
              <div class="bg-background">
                <div v-for="(message, index) in chatArray" :key="index">
                  <MessageComponent :message="message" :finished="finished" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="flex-grow flex flex-1 flex-col mx-auto h-full w-[70rem] pt-36 items-center">
          <div class="flex justify-center space-x-2">
            <div v-if="!DarkModeStore.darkMode">
              <img :src="Logo" alt="Logo" class="w-72 h-20" />
            </div>
            <div v-else>
              <img :src="LogoWhite" alt="Logo" class="w-72 h-20" />
            </div>
          </div>

          <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Startup-Interviewer 🚀
          </h1>
          <div class="pt-5">
            <p v-if="!EnglishStore.useEnglish" class="text-xl text-muted-foreground">
              Starte hier dein AI-Interview mit Trending Topics. Voll automatisiert!
            </p>
            <p v-else class="text-xl text-muted-foreground">
              Start your AI-Interview. Fast & automatic!
            </p>
          </div>
          <!-- <div class="text-center text-lg font-semibold px-36 pt-10">Some Werbung</div> -->
          <div v-if="!interviewStarted" class="flex items-center space-x-2 pt-20 pb-5">
            <div v-if="!EnglishStore.useEnglish" class="max-w-[30rem]">
              <Checkbox id="terms" :default-checked="formClicked" :checked="formClicked"
                @update:checked="() => (formClicked = !formClicked)" />
              <label for="terms"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Ich habe die
                <u><a href="https://www.trendingtopics.eu/datenschutz/" target="_blank">Datenschutzerklärung</a></u>
                gelesen und verstanden, dass der Inhalt dieses Interviews von der ausgewählten AI (+
                dessen Anbieter) und Trending Topics verarbeitet wird.
              </label>
            </div>
            <div v-else class="max-w-[30rem]">
              <Checkbox id="terms" :default-checked="formClicked" :checked="formClicked"
                @update:checked="() => (formClicked = !formClicked)" />
              <label for="terms"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I herby agree that I have read and understood the
                <u><a href="https://www.trendingtopics.eu/datenschutz/" target="_blank">Privacy Policy</a></u>
                and am fully aware that the contents of this interview is not only being processed
                by Trending Topics but also the chosen AI and its provider.
              </label>
            </div>
          </div>

          <Button v-if="!EnglishStore.useEnglish" @click="startChat()" :disabled="!formClicked">Interview starten</Button>
          <Button v-else @click="startChat()" :disabled="!formClicked">Start Interview</Button>
        </div>
      </ScrollArea>
      <div class="flex justify-center">
        <Card class="w-[70rem]">
          <CardHeader> </CardHeader>
          <CardContent v-if="interviewStarted">
            <div class="flex justify-center items-center gap-7">
              <Input @keyup.enter="
                finished
                  ? handleSend(currentInput, new Date(), SenderEnum.USER, SessionStore.session)
                  : null" class="w-[50rem] p-6 text-base" v-model="currentInput"
                :placeholder="!EnglishStore.useEnglish ? 'Schreibe eine Nachricht...' : 'Write a message...'" />
              <Button @click="handleSend(currentInput, new Date(), SenderEnum.USER, SessionStore.session)"
                :disabled="!finished">
                <div v-if="!EnglishStore.useEnglish" class="flex items-center gap-2">
                  Senden
                  <Navigation class="w-4 h-4" />
                </div>
                <div v-else class="flex items-center gap-2">
                  Send
                  <Navigation class="w-4 h-4" />
                </div>
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <div class="flex justify-center w-full">
              <div v-if="!EnglishStore.useEnglish" class="flex items-center gap-2">
                <Button variant="link">
                  <a href="https://www.trendingtopics.eu/imprint/" target="_blank">Impressum</a>
                </Button>
                <Separator orientation="vertical" />
                <Button variant="link">
                  <a href="https://www.trendingtopics.eu/datenschutz/" target="_blank">Datenschutzerklärung</a>
                </Button>
                <Separator orientation="vertical" />

                <Button variant="link">
                  <a href="https://newsrooms.ai/" target="_blank">Newsrooms</a>
                </Button>
              </div>
              <div v-else class="flex items-center gap-2">
                <Button variant="link">
                  <a href="https://www.trendingtopics.eu/imprint/" target="_blank">Imprint</a>
                </Button>
                <Separator orientation="vertical" />

                <Button variant="link">
                  <a href="https://www.trendingtopics.eu/datenschutz/" target="_blank">Privacy Policy</a>
                </Button>
                <Separator orientation="vertical" />

                <Button variant="link">
                  <a href="https://newsrooms.ai/" target="_blank">Newsrooms</a>
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  </main>
</template>
