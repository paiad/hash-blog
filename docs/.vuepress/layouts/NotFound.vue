<template>
  <div class="error-page relative min-h-screen overflow-hidden flex items-center justify-center">
    <SnowfallBg
        color="ADD8E6"
        class="absolute inset-0"
        :min-radius="0.2"
        :max-radius="5"
        :speed="0.5"
    />

    <div class="container mx-auto px-4 relative z-10 text-center">
      <!-- 简约数字效果 -->
      <div class="error-number mb-8">
        <div class="text-[12rem] md:text-[20rem] font-bold text-white opacity-90 tracking-tighter">
          404
        </div>
      </div>

      <!-- 动态文字效果 -->
      <h1 class="text-3xl md:text-4xl font-medium text-white mb-6">
        <span class="typing-text">页面消失了，或许只是暂时躲藏在雪中...</span>
      </h1>

      <!-- 简约按钮组 -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
            @click="goHome"
            class="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl text-white font-medium transition-all duration-300"
        >
          返回首页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SnowfallBg from "../theme/components/SnowfallBg.vue";
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/');
};

const contactSupport = () => {
  // 这里可以替换为实际的联系方式
  window.location.href = 'mailto:support@example.com';
};

onMounted(() => {
  // 添加打字机效果
  const typingText = document.querySelector('.typing-text');
  if (typingText) {
    const text = typingText.textContent || '';
    typingText.textContent = '';

    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
      }
    }, 100);
  }
});
</script>

<style scoped>
.error-page {
  background: linear-gradient(135deg, #1e3a8a 0%, #0c4a6e 100%);
}

.error-number {
  position: relative;
}

.error-number::after {
  content: '';
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 2px;
  background: rgba(255, 255, 255, 0.3);
}

.typing-text {
  border-right: 2px solid white;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  padding-right: 4px;
}

@media (max-width: 768px) {
  .error-number::after {
    width: 100px;
    bottom: 10px;
  }
}
</style>