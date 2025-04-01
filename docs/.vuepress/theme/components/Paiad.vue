<template>
  <div>
    <!-- 主框架 -->
    <div class="flex h-[70vh] flex-col items-center justify-center px-4">
      <h2 class="mb-10 text-center text-xl text-black sm:mb-20 sm:text-5xl dark:text-white">
        Ask Anything Silly
      </h2>
      <VanishingInput v-model="text" :placeholders="placeholders" :is-dark="isDark" />
    </div>

    <!-- 粒子背景 -->
    <ParticlesBg
        class="absolute inset-0"
        :quantity="314"
        :ease="100"
        :color="isDark ? '#4ca5dc' : '#e8709a'"
        :staticity="10"
        refresh
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useDarkMode } from 'vuepress-theme-plume/composables';
import VanishingInput from "./VanishingInput.vue";
import ParticlesBg from "./ParticlesBg.vue";

const isDark = useDarkMode();
console.log(isDark.value); // 检查初始值

const text = ref("");
const placeholders = [
  "Why is my code always broken?",
  "What does 'undefined' even mean?",
  "How to center a div (for real this time)",
  "Am I smarter than a compiler?",
  "Do loops ever get dizzy?",
];
</script>