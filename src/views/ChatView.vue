<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Navigation } from 'lucide-vue-next'
import MessageComponent from '@/components/customUi/MessageComponent.vue'
import { ScrollArea } from '@/components/ui/scroll-area'
import { onMounted, ref, watch } from 'vue'
import SenderEnum from '@/model/SenderEnum'
import MessageClass from '@/model/MessageClass'
import { sendMsg, receivedMsg, startConversation } from '@/http/websocket'
import NavigationBarComponent from '@/components/customUi/NavigationBarComponent.vue'
import type { AIResponseInterface } from '@/model/AIResponseInterface'
import { Separator } from '@/components/ui/separator'
import { useEnglishStore } from '@/stores/UseEnglish'
import { useSessionStore } from '@/stores/SessionStore'
import { englishWords, germanWords } from '../lib/languages'

// @ts-ignore
import router from '@/router'
const chatArray = ref<MessageClass[]>([])
const EnglishStore = useEnglishStore()
const { change } = useEnglishStore()
const currentInput = ref('')
const finished = ref(true)
const SessionStore = useSessionStore()
window.onbeforeunload = function () {
  return ''
}

onMounted(() => {
  if (SessionStore.formClicked && SessionStore.captchaFinished) {
    startChat();
  } else {
    router.push('/');
  }
})

const viewportRef = ref<HTMLElement | null>(null);

function scrollToMsg(position: string | undefined = undefined) {
  let objDiv: HTMLElement | null = null;
  const lastMessageId = (chatArray.value.length - 1).toString();

  if (position) {
    objDiv = document.getElementById(lastMessageId + position);
  } else {
    objDiv = document.getElementById(lastMessageId);
  }

  if (objDiv) {
    objDiv.scrollIntoView({ behavior: 'smooth' });
  }
}

function startChat() {
  startConversation((msg: any) => {
    if (msg['session-key']) {
      SessionStore.session = msg['session-key']
    }
    const newTimestamp = new Date()
    handleReceive(msg, newTimestamp)
  })
}


async function handleReceive(msg: AIResponseInterface, timestamp: Date) {
  if (msg.value === 'END' && msg.type === 'STATUS') {
    chatArray.value[chatArray.value.length - 1].state = true
    finished.value = true
    return
  }
  if (msg.value === 'BEGIN' && msg.type === 'STATUS') {
    finished.value = false
    chatArray.value.push(new MessageClass(timestamp, '', SenderEnum.AI, false, chatArray.value.length))
    scrollToMsg('header');
    return
  }
  const lastMessage = chatArray.value[chatArray.value.length - 1]
  if (lastMessage && msg.value !== 'START' && msg.type !== 'STATUS') {
    lastMessage.content += msg.value
    scrollToMsg();
  }
}

function detectLanguage(text: string) {
  let englishCount = 0
  let germanCount = 0

  const lowerText = text.toLowerCase()

  for (const word of englishWords) {
    if (lowerText.includes(word)) {
      englishCount++
    }
  }

  for (const word of germanWords) {
    if (lowerText.includes(word)) {
      germanCount++
    }
  }

  if (englishCount > germanCount) {
    return true
  } else if (germanCount > englishCount) {
    return false
  } else {
    // Default to English if counts are equal
    return false
  }
}
function handleSend(content: string, timestamp: Date, sender: SenderEnum, session_key: string, position: number) {
  if (session_key === '') {
    return null
  }
  if (detectLanguage(content) != null) {
    change(detectLanguage(content))
  }
  const newMessage = new MessageClass(timestamp, content, sender, true, position)
  chatArray.value.push(newMessage)
  scrollToMsg()
  sendMsg(newMessage.content, session_key)
  scrollToMsg()
  receivedMsg((msg: AIResponseInterface) => {
    scrollToMsg()
    handleReceive(msg, timestamp)
  })
  currentInput.value = ''
}

function iAbbrechen() {
  chatArray.value = []
  SessionStore.resetSession()
  currentInput.value = ''
}
</script>

<template>
  <main>
    <div class="h-screen flex flex-col overflow-hidden">
      <NavigationBarComponent :session-key="SessionStore.session" :chatArray="chatArray" :interviewStarted="true"
        @update:iAbbrechen="iAbbrechen" class="sticky top-0">
      </NavigationBarComponent>
      <ScrollArea ref="viewportRef" class="flex-1 scroll-smooth">
        <div v-if="SessionStore.session !== ''" class="bg-background">
          <div class="flex flex-col md:w-[80rem] md:mx-auto">
            <div class="flex-1">
              <div class="bg-background">
                <div v-for="(message, index) in chatArray" :key="index">
                  <MessageComponent :message="message" :finished="finished" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
      <div class="flex justify-center">
        <Card class="w-[70rem]">
          <CardHeader> </CardHeader>
          <CardContent>
            <div class="flex justify-center items-center gap-7">
              <Input @keyup.enter="
                finished
                  ? handleSend(currentInput, new Date(), SenderEnum.USER, SessionStore.session, chatArray.length)
                  : null
                " class="md:w-[50rem] w-auto md:p-6 text-base" v-model="currentInput" :placeholder="!EnglishStore.useEnglish ? 'Schreibe eine Nachricht...' : 'Write a message...'
    " />
              <Button
                @click="handleSend(currentInput, new Date(), SenderEnum.USER, SessionStore.session, chatArray.length)"
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
            <div class="md:justify-center mx-auto md:flex hidden">
              <div v-if="!EnglishStore.useEnglish" class="flex items-center gap-2">
                <Button variant="link">
                  <a href="https://www.trendingtopics.eu/imprint/" target="_blank">Impressum</a>
                </Button>
                <Separator orientation="vertical" />
                <Button variant="link">
                  <a href="https://staging.newsrooms.ai/privacy" target="_blank">Datenschutzerklärung</a>
                </Button>
                <Separator orientation="vertical" />

                <Button variant="link">
                  <a href="https://staging.newsrooms.ai/tos" target="_blank">AGB</a>
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
                  <a href="https://staging.newsrooms.ai/privacy" target="_blank">Privacy Policy</a>
                </Button>
                <Separator orientation="vertical" />

                <Button variant="link">
                  <a href="https://staging.newsrooms.ai/tos" target="_blank">Terms of Service</a>
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
