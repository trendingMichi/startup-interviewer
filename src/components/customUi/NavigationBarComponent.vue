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
            <Button>fertig</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Dankee</AlertDialogTitle>
              <AlertDialogDescription> Die daten werden verarbeitet </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
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
import LightDarkModeButtonComponent from './LightDarkModeButtonComponent.vue'
import LogoIcon from '../../assets/images/logoIcon.svg'
import LogoWhiteIcon from '../../assets/images/logoWhiteIcon.svg'
import { Separator } from '../ui/separator'
import { useDarkModeStore } from '@/stores/DarkMode'
import { Button } from '../ui/button'

const DarkModeStore = useDarkModeStore()
</script>
