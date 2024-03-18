<script lang="ts" setup>
import { Input } from '@/components/ui/input'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import NavigationBarComponent from '@/components/customUi/NavigationBarComponent.vue'
import Logo from '../assets/images/logo.svg'
import LogoWhite from '../assets/images/logoWhite.svg'
import { Separator } from '@/components/ui/separator'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import Checkbox from '@/components/ui/checkbox/Checkbox.vue'
import { useDarkModeStore } from '@/stores/DarkMode';
import { useEnglishStore } from '@/stores/UseEnglish';
import { ref } from 'vue';
// @ts-ignore
import VueClientRecaptcha from 'vue-client-recaptcha'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/SessionStore'

const SessionStore = useSessionStore();
const inputValue = ref('')
const router = useRouter()
const DarkModeStore = useDarkModeStore();
const EnglishStore = useEnglishStore();
SessionStore.formClicked = true
SessionStore.captchaFinished = true
SessionStore.session = "fasdf";

SessionStore.captchaFinished = true
const getCaptchaCode = (value: any) => {
}
const checkValidCaptcha = (value: any) => {
  SessionStore.captchaFinished = value
}

function forwardToChatView() {
  if (SessionStore.formClicked && SessionStore.captchaFinished) {
    router.push('chat')
  }
}

</script>
<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <NavigationBarComponent class="sticky top-0">
    </NavigationBarComponent>
    <div class="flex-grow flex flex-1 flex-col mx-auto h-full md:w-[70rem] px-10  items-center pt-[10%]">
      <div class="flex justify-center space-x-2">
        <div v-if="!DarkModeStore.darkMode">
          <img :src="Logo" alt="Logo" class="w-72 h-20" />
        </div>
        <div v-else>
          <img :src="LogoWhite" alt="Logo" class="w-72 h-20" />
        </div>
      </div>
      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        Startup-Interviewer 🚀
      </h1>
      <div class="pt-5">
        <p v-if="!EnglishStore.useEnglish" class="text-xl text-muted-foreground text-center">
          Starte hier dein AI-Interview mit Trending Topics. Voll automatisiert!
        </p>
        <p v-else class="text-xl text-muted-foreground">
          Start your AI-Interview. Fast & automatic!
        </p>
      </div>
      <!-- <div class="text-center text-lg font-semibold px-36 pt-10">Some Werbung</div> -->
      <div class="flex items-center flex-col space-x-2 pt-5 pb-5">
        <div v-if="!EnglishStore.useEnglish" class="max-w-[30rem]">
          <Checkbox id="terms" :default-checked="SessionStore.formClicked" :checked="SessionStore.formClicked"
            @update:checked="() => (SessionStore.formClicked = !SessionStore.formClicked)" />
          <label for="terms"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Ich habe die
            <u><a href="https://staging.newsrooms.ai/privacy" target="_blank">Datenschutzerklärung</a></u>
            und die
            <u><a href="https://staging.newsrooms.ai/tos" target="_blank">AGB</a></u>
            gelesen und verstanden, dass der Inhalt dieses Interviews von der ausgewählten AI (+
            dessen Anbieter) und Trending Topics verarbeitet wird.
          </label>
        </div>
        <div v-else class="max-w-[30rem]">
          <Checkbox id="terms" :default-checked="SessionStore.formClicked" :checked="SessionStore.formClicked"
            @update:checked="() => (SessionStore.formClicked = !SessionStore.formClicked)" />

          <label for="terms"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            I herby agree that I have read and understood the
            <u><a href="https://staging.newsrooms.ai/privacy" target="_blank">Privacy Policy</a></u>
            as well as the
            <u><a href="https://staging.newsrooms.ai/tos" target="_blank">ToS</a></u>
            and am fully aware that the contents of this interview is not only being processed
            by Trending Topics but also the chosen AI and its provider.
          </label>
        </div>
      </div>

      <div class="" v-if="SessionStore.captchaFinished">
        <Button v-if="!EnglishStore.useEnglish" :disabled="!SessionStore.formClicked"
          @click="forwardToChatView()">Interview
          starten</Button>
        <Button v-else :disabled="!SessionStore.formClicked" @click="forwardToChatView()">Start Interview</Button>
      </div>
    </div>

    <div class="flex justify-center">
      <Card class="w-[70rem]">
        <CardHeader> </CardHeader>
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
    <div v-if="!SessionStore.captchaFinished" class="sample-captcha pt-5 pb-5">
      <AlertDialog :open="!SessionStore.captchaFinished" :default-open="true" v-if="!SessionStore.captchaFinished">
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <div v-if="!EnglishStore.useEnglish" class="text-xl">
                Bitte löse dieses Captcha, um fortzusetzen 🤖
              </div>
              <div v-else class="text-xl">Please solve this Captcha to continue 🤖</div>
            </AlertDialogTitle>
            <VueClientRecaptcha :value="inputValue" class="flex flex-row-reverse justify-center gap-5 p-10"
              @getCode="getCaptchaCode" @isValid="checkValidCaptcha" />
            <Input type="text" class="mb-6" v-model="inputValue" />
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </div>
</template>