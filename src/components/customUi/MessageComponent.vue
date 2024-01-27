<script setup lang="ts">
import MessageClass from '@/model/MessageClass'
import { ref } from 'vue'

const props = defineProps({
  message: {type: MessageClass}
})


// const message = ref<MessageClass>();
</script>

<template>
  <main>
    <div>{{ props.message?.content }}</div>
  </main>
</template>
