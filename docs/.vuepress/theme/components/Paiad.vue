<template>
  <div>
    <ParticlesBg
        class="absolute inset-0"
        :quantity="100"
        :ease="100"
        :color="isDark ? '#4ca5dc' : '#000'"
        :staticity="10"
        refresh
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useColorMode } from "@vueuse/core";
import ParticlesBg from "./ParticlesBg.vue";

const isDark = computed(() => useColorMode().value == "dark");
</script>