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
            <Button v-if="!EnglishStore.useEnglish">Interview Abbrechen</Button>
            <Button v-else>Abort Interview</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader v-if="!EnglishStore.useEnglish">
              <AlertDialogTitle>
                <div class="text-2xl">Willst du dein Interview wirklich abbrechen?</div>
              </AlertDialogTitle>
              Falls du dein Interview jetzt abbrichst, wird es nicht an uns gesendet und kann nicht
              veröffentlicht werden. Vorsicht, damit verwirfst du den ganzen Fortschritt!
            </AlertDialogHeader>
            <AlertDialogHeader v-else>
              <AlertDialogTitle>
                <div class="text-2xl">Are you sure about aborting this interview?</div>
              </AlertDialogTitle>
              If you abort now, the interview will not be sent to us and we will not be able to
              publish it. All the progress you made will be gone!
            </AlertDialogHeader>
            <AlertDialogFooter v-if="!EnglishStore.useEnglish">
              <AlertDialogCancel @click.prevent="abbrechen()"
                >Interview abbrechen!</AlertDialogCancel
              >
              <AlertDialogAction>Weiter interviewen</AlertDialogAction>
            </AlertDialogFooter>
            <AlertDialogFooter v-else>
              <AlertDialogCancel @click.prevent="abbrechen()">Cancel Interview!</AlertDialogCancel>
              <AlertDialogAction>Proceed Interview</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog v-if="props.interviewStarted">
          <AlertDialogTrigger v-if="!EnglishStore.useEnglish">
            <Button>Fertig?</Button>
          </AlertDialogTrigger>
          <AlertDialogTrigger v-else>
            <Button>Finished?</Button>
          </AlertDialogTrigger>
          <AlertDialogContent v-if="!EnglishStore.useEnglish">
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
          <AlertDialogContent v-else>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <div class="text-2xl">Are you finished?</div>
              </AlertDialogTitle>
              If you want us to publish your interview, you will have to tell us your E-Mail
              address. Otherwise we cannot reach out to you 📬
              <AlertDialogTitle> </AlertDialogTitle>
              <AlertDialogDescription> </AlertDialogDescription>
              <Input type="email" class="my-5" v-model="email" placeholder="... start@up.at" />
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction :disabled="!isValidEmail" @click.prevent="endConversation()"
                >Send!</AlertDialogAction
              >
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <LanguageButton />
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
import LanguageButton from './LanguageButton.vue'
import LogoIcon from '../../assets/images/logoIcon.svg'
import LogoWhiteIcon from '../../assets/images/logoWhiteIcon.svg'
import { Separator } from '../ui/separator'
import { useDarkModeStore } from '@/stores/DarkMode'
import { useEnglishStore } from '@/stores/UseEnglish'
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

const router = useRouter()

function endConversation() {
  console.log(email.value)
  console.log(props.chatArray)
  finishConvesation(props.sessionKey, email.value)
  router.push({ name: 'finish', params: { mail: email.value } })
}

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
const EnglishStore = useEnglishStore()

const isValidEmail = computed(() => {
  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.value)
})
</script>
