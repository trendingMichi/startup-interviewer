<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
      <nav>
        <RouterLink to="/chat"></RouterLink>
      </nav>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
