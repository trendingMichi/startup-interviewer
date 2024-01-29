<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Navigation } from 'lucide-vue-next'
import MessageComponent from '@/components/customUi/MessageComponent.vue'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ref } from 'vue'
import SenderEnum from '@/model/SenderEnum'
import MessageClass from '@/model/MessageClass'
import LightDarkModeButtonComponentVue from '@/components/customUi/LightDarkModeButtonComponent.vue'

const chatArray = ref<MessageClass[]>([])
const currentInput = ref('')

function handleSend(content: string, timestamp: Date, sender: SenderEnum) {
  const newMessage = new MessageClass(timestamp, content, sender)
  chatArray.value.push(newMessage)
  currentInput.value = ''
}
</script>

<template>
  <main>
    <div class="flex flex-col h-screen bg-background">
      <div class="w-full">
        Chat interviewer
        <div class="float-right">
          <LightDarkModeButtonComponentVue />
        </div>
      </div>
      <ScrollArea class="flex-grow h-full">
        <div class="bg-background">
          <div v-for="message in chatArray" :key="message.content">
            <MessageComponent :message="message" />
          </div>
        </div>
      </ScrollArea>

      <div class="flex justify-center">
        <Card class="w-4/5 mb-10">
          <CardHeader> </CardHeader>
          <CardContent>
            <div class="flex justify-center gap-7">
              <Input
                @keyup.enter="handleSend(currentInput, new Date(), SenderEnum.USER)"
                class="w-[50rem]"
                v-model="currentInput"
                placeholder="Schreibe deine Nachricht..."
              />
              <Button @click="handleSend(currentInput, new Date(), SenderEnum.USER)">
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
