<script setup lang="ts">
import MessageClass from '@/model/MessageClass'
import { User } from 'lucide-vue-next'
import { Separator } from '@/components/ui/separator'
import SenderEnum from '@/model/SenderEnum'
import Brain from '../../assets/images/Newsrooms_Brain.png'
import BrainBlack from '../../assets/images/Newsrooms_Brain_Black.png'
import { useDarkModeStore } from '@/stores/DarkMode'

const props = defineProps({
  message: { type: MessageClass },
  finished: { type: Boolean }
})

const DarkModeStore = useDarkModeStore()

const timestamp = props.message?.timestamp.toDateString()

</script>

<template>
  <main>
    <div class="md:mx-28" :class="{ 'justify-end': props.message?.sender === SenderEnum.USER }">
      <div class="flex flex-col">
        <div class="px-10 pt-7 flex" :class="{ 'justify-end': props.message?.sender === SenderEnum.USER }">
          <div :id="props.message?.position + 'header'" v-if="props.message?.sender === SenderEnum.USER"
            class="flex gap-2">
            <User />
            <div class="text-lg font-semibold">Du</div>
          </div>
          <div v-else :id="props.message?.position + 'header'"
            class="snap-y snap-mandatory flex gap-2 justify-center items-center">
            <div v-if="!DarkModeStore.darkMode">
              <img :src="BrainBlack" alt="Logo" class="w-10" />
            </div>
            <div v-else>
              <img :src="Brain" alt="Logo" class="w-10" />
            </div>
            <div class="text-lg font-semibold">Startup Interviewer</div>
          </div>
        </div>
        <div class="w-full pb-10 pt-8 flex px-16"
          :class="{ 'justify-end px-16': props.message?.sender === SenderEnum.USER }" :id="timestamp">
          <div>
            <p :id="props.message?.position + 'p'" class="leading-7 fade-in-5 snap-y snap-mandatory">
              {{ props.message?.content }}
              <template
                v-if="!props.finished && props.message?.sender === SenderEnum.AI && DarkModeStore.darkMode === false">⚫</template>
              <template
                v-if="!props.finished && props.message?.sender === SenderEnum.AI && DarkModeStore.darkMode === true">⚪</template>
            </p>
          </div>
        </div>
      </div>
      <Separator :id="props.message?.position" class="snap-mandatory [&:last-child]:mb-10 scroll-mb-12 snap-y	" />
    </div>
  </main>
</template>
