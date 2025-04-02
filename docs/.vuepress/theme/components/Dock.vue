<template>
  <div class="macos-dock" :class="{ 'dark-mode': isDark, 'mobile-view': isMobile }">
    <div class="dock-container">
      <div
          v-for="(item, index) in dockItems"
          :key="index"
          class="dock-item"
          @mouseenter="!isMobile && (hoverIndex = index)"
          @mouseleave="!isMobile && (hoverIndex = -1)"
          @touchstart.passive="isMobile && (hoverIndex = index)"
          @touchend.passive="isMobile && (hoverIndex = -1)"
          @click="openLink(item.url)"
      >
        <div class="icon-wrapper">
          <img
              :src="isDark ? item.darkIcon || item.icon : item.icon"
              :alt="item.name"
              :style="{
                transform: getTransform(index),
                transition: hoverIndex === index ? 'transform 0.2s cubic-bezier(0.28, 1.1, 0.64, 1.4)' : 'transform 0.15s ease-out',
                zIndex: hoverIndex === index ? 10 : 1
              }"
              class="dock-icon"
          />
          <span class="tooltip" v-if="isMobile && hoverIndex === index">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useDarkMode } from 'vuepress-theme-plume/composables';

const isDark = useDarkMode();
const isMobile = ref(false);
const hoverIndex = ref(-1);

const dockItems = [
  {
    name: 'Deepseek',
    icon: 'https://cdn.jsdelivr.net/gh/Pai3141/picture-bed@main/icon/deepseek-color.png',
    darkIcon: 'https://cdn.jsdelivr.net/gh/Pai3141/picture-bed@main/icon/deepseek-color.png',
    url: 'https://chat.deepseek.com'
  },
  {
    name: 'ChatGPT',
    icon: 'https://cdn.jsdelivr.net/gh/paiad/picture-bed@main/icon/chatgpt.png',
    darkIcon: 'https://cdn.jsdelivr.net/gh/Pai3141/picture-bed@main/icon/openai.png',
    url: 'https://chatgpt.com'
  },
  {
    name: 'Siliconcloud',
    icon: 'https://cdn.jsdelivr.net/gh/paiad/picture-bed@main/icon/siliconcloud-color.png',
    darkIcon: 'https://cdn.jsdelivr.net/gh/Pai3141/picture-bed@main/icon/siliconcloud-color.png',
    url: 'https://cloud.siliconflow.cn/models'
  },
  {
    name: 'Grok',
    icon: 'https://cdn.jsdelivr.net/gh/paiad/picture-bed@main/icon/grok-copy.svg',
    darkIcon: 'https://cdn.jsdelivr.net/gh/paiad/picture-bed@main/icon/grok-v1.png',
    url: 'https://grok.com'
  },
  {
    name: 'Qwen',
    icon: 'https://cdn.jsdelivr.net/gh/paiad/picture-bed@main/icon/qwen-e1.png',
    darkIcon: 'https://cdn.jsdelivr.net/gh/paiad/picture-bed@main/icon/qwen-e1.png',
    url: 'https://chat.qwenlm.ai'
  },
];

const checkIfMobile = () => {
  isMobile.value = window.innerWidth < 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const getTransform = (index) => {
  if (hoverIndex.value === -1) return 'scale(1) translateY(0)';

  const distance = Math.abs(hoverIndex.value - index);
  const baseScale = isMobile.value ? 1.3 : 1.5;

  if (distance === 0) {
    return `scale(${baseScale}) translateY(${isMobile.value ? '0' : '1'}px)`;
  } else if (distance <= 1) {
    return `scale(${1 + (baseScale - 1) * 0.1}) translateY(0px)`;
  } else if (distance <= 2) {
    return 'scale(1) translateY(0px)';
  }
  return 'scale(1) translateY(0)';
};

const openLink = (url) => {
  if (url) {
    window.open(url, '_blank');
  }
};

onMounted(() => {
  checkIfMobile();
  window.addEventListener('resize', checkIfMobile);

  return () => {
    window.removeEventListener('resize', checkIfMobile);
  };
});
</script>

<style scoped>
.macos-dock {
  position: fixed;
  bottom: 10vh;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 1000;
  pointer-events: none;
  /* 为放大图标预留空间 */
  padding-top: 30px;
  margin-top: -30px;
}

.dock-container {
  display: flex;
  align-items: flex-end;
  background: rgba(235, 235, 235, 0.7);
  backdrop-filter: blur(30px) saturate(180%);
  border-radius: 18px;
  padding: 8px 10px;
  box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.05),
      0 4px 20px rgba(0, 0, 0, 0.15);
  pointer-events: auto;
  transition: all 0.3s ease;
  max-width: 90vw;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  /* 关键修复：允许内容溢出 */
  overflow: visible;
  /* 创建新的层叠上下文 */
  isolation: isolate;
}

/* 用伪元素实现视觉圆角（不遮挡内容） */
.dock-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: inherit;
  backdrop-filter: inherit;
  border-radius: inherit;
  z-index: -1;
  /* 只对容器本身应用圆角裁剪 */
  clip-path: inset(0 0 0 0 round 18px);
}

.dock-container::-webkit-scrollbar {
  display: none;
}

/* 暗黑模式 */
.macos-dock.dark-mode .dock-container {
  background: rgba(50, 50, 50, 0.05);
  box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.1),
      0 4px 20px rgba(0, 0, 0, 0.3);
}

/* Dock项 */
.dock-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 6px;
  padding: 0 2px;
  cursor: pointer;
  transition: transform 0.1s cubic-bezier(0.22, 1, 0.36, 1);
  flex-shrink: 0;
  /* 确保可以突破容器限制 */
  z-index: 1;
}

.dock-item:active {
  transform: scale(0.95);
}

/* 图标容器 */
.icon-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  /* 关键修复：允许图标放大溢出 */
  overflow: visible;
}

/* 图标样式 */
.dock-icon {
  width: 45px;
  height: 45px;
  object-fit: contain;
  border-radius: 12px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  transform-origin: center bottom;
  transition:
      transform 0.2s cubic-bezier(0.28, 1.1, 0.64, 1.4),
      filter 0.3s ease;
  /* 确保图标在最上层 */
  z-index: 10;
  will-change: transform;
}

.macos-dock.dark-mode .dock-icon {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

/* 图标下方指示线 */
.icon-wrapper::after {
  content: '';
  position: absolute;
  bottom: -8px;
  width: 40px;
  height: 2px;
  background: radial-gradient(ellipse at center,
  rgb(65, 178, 145) 0%,
  rgba(255, 255, 255, 0) 80%);
  opacity: 0.3;
  transition: all 0.3s ease;
  z-index: -1;
}

.macos-dock.dark-mode .icon-wrapper::after {
  background: radial-gradient(ellipse at center,
  rgb(76, 165, 220) 0%,
  rgba(255, 255, 255, 0) 80%);
}

.dock-item:hover .icon-wrapper::after {
  opacity: 0.6;
}

/* 移动端工具提示 */
.tooltip {
  position: absolute;
  bottom: 100%;
  margin-bottom: 8px;
  padding: 4px 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  transform: translateY(5px);
  opacity: 0;
  transition: all 0.2s ease;
  z-index: 100;
}

/* 移动端特定样式 */
.macos-dock.mobile-view {
  bottom: 10vh;
  padding-top: 20px;
  margin-top: -20px;
}

.macos-dock.mobile-view .dock-container {
  padding: 6px 8px;
  border-radius: 16px;
}

.macos-dock.mobile-view .dock-item {
  margin: 0 4px;
}

.macos-dock.mobile-view .icon-wrapper {
  width: 48px;
  height: 48px;
}

.macos-dock.mobile-view .dock-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
}

.macos-dock.mobile-view .dock-item:hover .tooltip,
.macos-dock.mobile-view .dock-item:active .tooltip {
  transform: translateY(0);
  opacity: 1;
}

/* 小屏幕适配 (小于480px) */
@media (max-width: 480px) {
  .macos-dock {
    bottom: 3vh;
  }

  .dock-container {
    padding: 5px 6px;
    border-radius: 14px;
  }

  .dock-item {
    margin: 0 3px;
  }

  .icon-wrapper {
    width: 44px;
    height: 44px;
  }

  .dock-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
  }

  .tooltip {
    font-size: 11px;
    padding: 3px 6px;
  }
}

/* 禁用移动端hover效果 */
@media (hover: none) {
  .dock-item:hover {
    transform: none !important;
  }
  .dock-item:hover .icon-wrapper::after {
    opacity: 0.3 !important;
  }
}
</style>