<template>
  <main>
    <div class="w-full flex bg-background h-14 items-center justify-between px-6">
      <div class="mx-6 flex items-center space-x-2">
        <div v-if="!DarkModeStore.darkMode">
          <img :src="LogoIcon" alt="Logo" class="w-7 h-7" />
        </div>
        <div v-else>
          <img :src="LogoWhiteIcon" alt="Logo" class="w-7 h-7" />
        </div>
        <span class="font-bold">Startup Interviewer</span>
      </div>
      <div class="flex gap-5">
        <AlertDialog>
          <AlertDialogTrigger>
            <Button>Fertig?</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <div class="text-2xl">

                  Bist du mit deinem Interview fertig?
                </div>
              </AlertDialogTitle>
              Geben deine Emali ein damit wir ein Interview verarbeiten können.
              <AlertDialogTitle>

              </AlertDialogTitle>
              <AlertDialogDescription>
              </AlertDialogDescription>
              <Input type="email" class="my-5" placeholder="Email" />
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Noch nicht fertig</AlertDialogCancel>
              <AlertDialogAction @click.prevent="endConversation()">Abschicken</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <LightDarkModeButtonComponent />
      </div>
    </div>
    <Separator />
  </main>
</template>
<script lang="ts" setup>
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import LightDarkModeButtonComponent from './LightDarkModeButtonComponent.vue'
import LogoIcon from '../../assets/images/logoIcon.svg'
import LogoWhiteIcon from '../../assets/images/logoWhiteIcon.svg'
import { Separator } from '../ui/separator'
import { useDarkModeStore } from '@/stores/DarkMode'
import { Button } from '../ui/button'
import { finishConvesation } from '@/http/websocket'
import { ref } from 'vue'

const email = ref<String>('')

const props = defineProps({
  sessionKey: { type: String }
})

function endConversation() {
  console.log(props.sessionKey);
  
  finishConvesation(props.sessionKey, email.value);
}

const DarkModeStore = useDarkModeStore()
</script>
