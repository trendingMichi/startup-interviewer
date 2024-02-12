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
        <AlertDialog v-if="props.interviewStarted">
          <AlertDialogTrigger>
            <Button>Interview Abbrechen</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <div class="text-2xl">Willst du dein Interview wirklich abbrechen?</div>
              </AlertDialogTitle>
              Falls du dein Interview jetzt abbrichst, wird es nicht an uns gesendet und kann nicht
              veröffentlicht werden. Vorsicht, damit verwirfst du den ganzen Fortschritt!
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel @click.prevent="abbrechen()">Abbrechen</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog v-if="props.interviewStarted">
          <AlertDialogTrigger>
            <Button>Fertig?</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <div class="text-2xl">Bist du mit deinem Interview fertig?</div>
              </AlertDialogTitle>
              Falls wir das Interview veröffentlichen wollen, teile uns bitte deine E-Mail mit. Dann
              können wir uns bei dir melden 📬
              <AlertDialogTitle> </AlertDialogTitle>
              <AlertDialogDescription> </AlertDialogDescription>
              <Input type="email" class="my-5" v-model="email" placeholder="... start@up.at" />
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Abbrechen</AlertDialogCancel>
              <AlertDialogAction :disabled="!isValidEmail" @click.prevent="endConversation()"
                >Abschicken</AlertDialogAction
              >
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
import { ref, computed, getCurrentInstance } from 'vue'
import MessageClass from '@/model/MessageClass'
import { RouterLink, RouterView, useRouter } from 'vue-router'

const email = ref('')

const props = defineProps({
  sessionKey: { type: String },
  chatArray: { type: MessageClass },
  interviewStarted: { type: Boolean, default: false }
})

function endConversation() {
  console.log(email.value)
  console.log(props.chatArray)
  finishConvesation(props.sessionKey, email.value)
}
const router = useRouter()

function abbrechen() {
  // console.log(email.value)
  // console.log(props.chatArray)
  // const instance = getCurrentInstance()
  // if (instance) {
  //   const emit = instance.emit
  //   emit('update:iAbbrechen')
  //   console.log('AAA')
  // }
  // router.push('/chat').catch((err) => {
  //   console.error('Error navigating:', err)
  // })
  // TODO: IMPLEMENT RESET
}

const DarkModeStore = useDarkModeStore()

const isValidEmail = computed(() => {
  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.value)
})
</script>
