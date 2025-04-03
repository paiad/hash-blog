<template>
    <!-- 极光背景 -->
    <AuroraBackground>
      <Motion
          as="div"
          :initial="{ opacity: 0, y: 40, filter: 'blur(10px)' }"
          :in-view="{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }"
          :transition="{
        delay: 0.3,
        duration: 0.8,
        ease: 'easeInOut',
      }"
          class="relative flex flex-col items-center justify-center gap-4 px-4"
      >

      </Motion>
      <!-- 主框架 -->
      <div class="content-wrapper">
        <h2 class="title">
          <LetterPullUp
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
      <!-- MacOS的Dock效果 -->
      <Dock />
    </AuroraBackground>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { placeholders } from "../composables/placeholders";
import {useDarkMode} from "vuepress-theme-plume/composables";
import { useMobileDetect } from "../composables/useMobileDetect";
import { useSubmitQuestion } from "../composables/useSubmitQuestion";
import VanishingInput from "./VanishingInput.vue";
import ParticlesBg from "./ParticlesBg.vue";
import Dock from "./Dock.vue";
import AuroraBackground from "./AuroraBackground.vue";
import LetterPullUp from "./LetterPullUp.vue";

const { isMobile } = useMobileDetect();
// 是否为暗色主题
const isDark = useDarkMode();
const text = ref("");
const isLoading = ref(false);

// 提交问题
const { handleSubmit } = useSubmitQuestion(text, isLoading);
</script>

<style scoped>
@import '../styles/home-page.css';
</style>
