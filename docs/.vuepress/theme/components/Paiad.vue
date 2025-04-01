<template>
  <div>
    <!-- 主框架 -->
    <div class="flex h-[70vh] flex-col items-center justify-center px-4">
      <h2 class="mb-10 text-center text-xl text-black sm:mb-20 sm:text-5xl dark:text-white">
        𝑺𝒑𝒆𝒂𝒌 𝒂𝒔 𝒐𝒏𝒆 𝒘𝒊𝒔𝒉𝒆𝒔
      </h2>
      <VanishingInput
          v-model="text"
          :placeholders="placeholders"
          :is-dark="isDark"
          @submit="handleSubmit"
      />
    </div>

    <!-- 粒子背景 -->
    <ParticlesBg
        class="absolute inset-0"
        :quantity="314"
        :ease="100"
        :color="isDark ? '#4ca5dc' : '#41b291'"
        :staticity="10"
        refresh
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from 'axios';
import { useDarkMode } from 'vuepress-theme-plume/composables';
import VanishingInput from "./VanishingInput.vue";
import ParticlesBg from "./ParticlesBg.vue";

const isDark = useDarkMode();
const text = ref("");
const isLoading = ref(false);
const placeholders = [
  "What’s the final digit of Pi?",
  "Is P equal to NP?",
  "Why is world peace always out of reach?",
  "Where does the universe end?",
  "Can the paradoxes of time travel be resolved?",
  "How does human consciousness arise?",
  "Is there a solution to the Goldbach Conjecture?",
  "What happened before the Big Bang?",
  "Are we living in a simulation?",
  "Why do we dream what we dream?",
  "Will we ever find extraterrestrial life?",
];

// 提交处理函数
const handleSubmit = async (submittedText: string) => {
  isLoading.value = true;
  try {
    // 获取北京时间（UTC+8）
    const now = new Date();
    const beijingTime = new Date(now.getTime() + 8 * 60 * 60 * 1000)
        .toISOString()
        .replace('Z', ''); // 移除Z时区标识

    const response = await axios.post('https://hash.paiad.top/api/questions', {
      question: submittedText,
      timestamp: beijingTime + '+08:00', // 显式标识时区
      timezone: 'Asia/Shanghai' // 可选：添加时区信息
    });

    text.value = ""; // 清空输入框
    console.log('提交成功，北京时间:', beijingTime);

  } catch (error) {
    console.error('提交失败:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>