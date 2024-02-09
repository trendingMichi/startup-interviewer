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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import type { AIResponseInterface } from '@/model/AIResponseInterface'

const chatArray = ref<MessageClass[]>([])
const currentInput = ref('')
const finished = ref(true)
const session_key = ref<string>('')

watch(currentInput, () => {
  if (finished.value === true) {
    if (currentInput.value === '') {
      finished.value = false
    } else {
      finished.value = true
    }
  }
})

function startChat() {
  startConversation((msg: any) => {
    if(msg['SESSION-KEY']){
      session_key.value = msg['SESSION-KEY']
      console.log(session_key.value)
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

function handleSend(content: string, timestamp: Date, sender: SenderEnum, session_key: string) {
  const newMessage = new MessageClass(timestamp, content, sender, true)
  chatArray.value.push(newMessage)
  console.log(session_key)

  sendMsg(newMessage.content, session_key)
  receivedMsg((msg: AIResponseInterface) => {
    handleReceive(msg, timestamp)
  })
  currentInput.value = ''
}
</script>

<template>
  <main>
    <AlertDialog :defaultOpen="true">
      <AlertDialogContent class="w-[40rem] p-10">
        <AlertDialogHeader>
          <AlertDialogTitle>Willkommen zum Startup-Interviewer 🚀</AlertDialogTitle>
        </AlertDialogHeader>
        <div class="p-5 flex flex-col gap-7 justify-between">
          <p class="text-base">
            Das ist ein Bot, der dir 12 unterschiedliche Fragen stellen wird über dein Startup. Wenn
            du fertig bist klicke auf den fertig Button damit wir bescheid wissen.
            <br />
            <br />

            Alle Daten werden von unserem Team DSGVO gemäß verarbeitet.
          </p>
          <AlertDialogAction @click.prevent="startChat()" class="flex justify-center items-center"
            >Interview starten</AlertDialogAction
          >
        </div>
      </AlertDialogContent>
    </AlertDialog>
    <div class="h-screen flex flex-col">
      <ScrollArea class="flex-1">
        <div class="bg-background">
          <NavigationBarComponent class="sticky top-0"></NavigationBarComponent>
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
      </ScrollArea>
      <div class="flex justify-center">
        <Card class="w-[70rem]">
          <CardHeader> </CardHeader>
          <CardContent>
            <div class="flex justify-center items-center gap-7">
              <Input
                @keyup.enter="
                  finished
                    ? handleSend(currentInput, new Date(), SenderEnum.USER, session_key)
                    : null
                "
                class="w-[50rem] p-6 text-base"
                v-model="currentInput"
                placeholder="Schreibe deine Nachricht..."
              />
              <Button
                @click="handleSend(currentInput, new Date(), SenderEnum.USER, session_key)"
                :disabled="!finished"
              >
                <div class="flex items-center gap-2">Senden <Navigation class="w-4 h-4" /></div>
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <div class="flex w-full justify-center">
              <div class="text-sm text-muted-foreground">
                Some code to tell that u agree with privacy
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  </main>
</template>
