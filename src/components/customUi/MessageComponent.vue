<script setup lang="ts">
import MessageClass from '@/model/MessageClass'
import { User } from 'lucide-vue-next'
import { Separator } from '@/components/ui/separator'
import SenderEnum from '@/model/SenderEnum'
import Brain from '../../assets/images/Newsrooms_Brain.png'
import BrainBlack from '../../assets/images/Newsrooms_Brain_Black.png'
import { ref, watch } from 'vue'
import { useDarkModeStore } from '@/stores/DarkMode'

const props = defineProps({
  message: { type: MessageClass },
  finished: { type: Boolean }
})

const DarkModeStore = useDarkModeStore()

const timestamp = props.message?.timestamp.toDateString()
const state = ref<Boolean | undefined>(props.message?.state)

watch(state, () => {
  console.log(state)
})
</script>

<template>
  <main>
    <div class="mx-28" :class="{ 'justify-end': props.message?.sender === SenderEnum.USER }">
      <div class="flex flex-col">
        <div
          class="px-10 pt-7 flex"
          :class="{ 'justify-end': props.message?.sender === SenderEnum.USER }"
        >
          <div v-if="props.message?.sender === SenderEnum.USER" class="flex gap-2">
            <User />
            <div class="text-lg font-semibold">Du</div>
          </div>
          <div v-else class="flex gap-2 justify-center items-center">
            <div v-if="!DarkModeStore.darkMode">
              <img :src="BrainBlack" alt="Logo" class="w-10" />
            </div>
            <div v-else>
              <img :src="Brain" alt="Logo" class="w-10" />
            </div>
            <div class="text-lg font-semibold">Startup Interviewer</div>
          </div>
        </div>
        <div
          class="w-full pb-10 pt-8 flex px-16"
          :class="{ 'justify-end px-16': props.message?.sender === SenderEnum.USER }"
          :id="timestamp"
        >
          <div>
            <p
              class="leading-7 fade-in-5"
            >
              {{ props.message?.content }}
              <template v-if="!props.finished && props.message?.sender === SenderEnum.AI && DarkModeStore.darkMode === false">⚫</template>
              <template v-if="!props.finished && props.message?.sender === SenderEnum.AI && DarkModeStore.darkMode === true">⚪</template>
            </p>
          </div>
        </div>
      </div>
      <Separator class="[&:last-child]:mb-10" />
    </div>
  </main>
</template>
