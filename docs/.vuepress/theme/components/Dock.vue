<template>
  <div class="macos-dock" :class="{ 'dark-mode': isDark }">
    <div class="dock-container">
      <div
          v-for="(item, index) in dockItems"
          :key="index"
          class="dock-item"
          @mouseenter="hoverIndex = index"
          @mouseleave="hoverIndex = -1"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useDarkMode } from 'vuepress-theme-plume/composables';

export default {
  name: 'MacOSDock',
  setup() {
    const isDark = useDarkMode();
    return { isDark };
  },
  data() {
    return {
      hoverIndex: -1,
      dockItems: [
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
        {
          name: 'Doubao',
          icon: 'https://cdn.jsdelivr.net/gh/Pai3141/picture-bed@main/icon/doubao-color.png',
          darkIcon: 'https://cdn.jsdelivr.net/gh/Pai3141/picture-bed@main/icon/doubao-color.png',
          url: 'https://www.doubao.com'
        }
      ]
    }
  },
  methods: {
    getTransform(index) {
      if (this.hoverIndex === -1) return 'scale(1) translateY(0)';

      const distance = Math.abs(this.hoverIndex - index);
      const baseScale = 1.5;

      if (distance === 0) {
        return `scale(${baseScale}) translateY(-5px)`;
      } else if (distance <= 1) {
        return `scale(${1 + (baseScale - 1) * 0.1}) translateY(0px)`;
      } else if (distance <= 2) {
        return `scale(1) translateY(0px)`;
      }
      return 'scale(1) translateY(0)';
    },
    openLink(url) {
      if (url) {
        window.open(url, '_blank');
      }
    }
  }
}
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
}

.dock-container {
  display: flex;
  align-items: flex-end;
  background: transparent;
  backdrop-filter: blur(30px) saturate(180%);
  border-radius: 18px;
  padding: 8px 10px;
  box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.05),
      0 4px 20px rgba(0, 0, 0, 0.15);
  pointer-events: auto;
  transition: all 0.3s ease;
}

.macos-dock.dark-mode .dock-container {
  background: transparent;
  box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.1),
      0 4px 20px rgba(0, 0, 0, 0.3);
}

.dock-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 6px;
  padding: 0 2px;
  cursor: pointer;
  transition: transform 0.1s ease;
}

.dock-item:active {
  transform: scale(0.95);
}

.icon-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
}

.dock-icon {
  width: 45px;
  height: 45px;
  object-fit: contain;
  border-radius: 12px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  transform-origin: center bottom;
  transition: filter 0.3s ease;
}

.macos-dock.dark-mode .dock-icon {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

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
}

.macos-dock.dark-mode .icon-wrapper::after {
  background: radial-gradient(ellipse at center,
  rgb(76, 165, 220) 0%,
  rgba(255, 255, 255, 0) 80%);
}

.dock-item:hover .icon-wrapper::after {
  opacity: 0.6;
}
</style>