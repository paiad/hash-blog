<template>
  <div class="main-container">
    <!-- 主框架 -->
    <div class="content-wrapper">
      <h2 class="title">
        <LetterPullup
            words="𝑺𝒑e𝒂𝒌 𝒂𝒔 𝒐𝒏𝒆 𝒘𝒊𝒔𝒉𝒆𝒔"
            :delay="0.110"
            class="text-black dark:text-white text-3xl lg:text-5xl"
        />
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
        class="particles-bg"
        :quantity="isMobile ? 100 : 314"
        :ease="100"
        :color="isDark ? '#4ca5dc' : '#41b291'"
        :staticity="10"
        refresh
    />
  </div>
  <Dock />
</template>

<style scoped>
.main-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

.content-wrapper {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  position: relative;
  z-index: 10;
}

.title {
  margin-bottom: 3rem;
  text-align: center;
  font-size: 2rem;
}

.particles-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 1rem;
    min-height: 60vh;
  }

  .title {
    margin-bottom: 3rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    width: 95%;
    padding: 0.5rem;
  }

  .title {
    font-size: 1.25rem;
  }
}
</style>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from 'axios';
import VanishingInput from "./VanishingInput.vue";
import ParticlesBg from "./ParticlesBg.vue";
import LetterPullup from "./LetterPullup.vue";
import Dock from "./Dock.vue";
import { useDarkMode } from 'vuepress-theme-plume/composables';

// 添加移动端检测
const isMobile = ref(false);

onMounted(() => {
  // 检测移动设备
  isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // 可选：监听窗口大小变化
  window.addEventListener('resize', checkIfMobile);
});

const checkIfMobile = () => {
  isMobile.value = window.innerWidth < 768;
};


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