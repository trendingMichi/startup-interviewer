<script setup lang="ts">
import MessageClass from '@/model/MessageClass'
import { User } from 'lucide-vue-next'
import { Separator } from '@/components/ui/separator'
import SenderEnum from '@/model/SenderEnum'
import Logo from '../../assets/images/logoIcon.svg'

const props = defineProps({
  message: { type: MessageClass }
})

// const message = ref<MessageClass>();
</script>

<template>
  <main>
    <div class="mx-28">
      <div class="flex flex-col">
        <div class="px-10 pt-7 flex" :class="{ 'justify-end': props.message?.sender === SenderEnum.USER }">
          <div v-if="props.message?.sender === SenderEnum.USER" class="flex gap-2">
            <User /> <div class="text-lg font-semibold">Du</div>
          </div>
          <div v-else class="flex gap-2">
            <img :src="Logo" alt="Logo" class="w-7" /><div class="text-lg font-semibold">Interviewer AI</div>
          </div>
        </div>
        <div
          class="w-full pb-10 pt-8 flex px-16"
          :class="{ 'justify-end px-16': props.message?.sender === SenderEnum.USER }"
        >
          <p class="leading-7 [&:not(:first-child)]:mt-6">

            {{ props.message?.content }}
          </p>
        </div>
      </div>
      <Separator class="[&:last-child]:mb-10"/>
    </div>
  </main>
</template>
