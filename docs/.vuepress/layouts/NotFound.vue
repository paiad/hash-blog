<template>
  <div class="container">
    <div class="content">
      <h1 class="title">404 Not Found</h1>
      <br>
      <br>
      <p class="description">{{ message }}</p>
      <button @click="goHome" class="cta-button">Go Home</button>
    </div>
    <!-- 背景粒子效果 -->
    <div class="particle-background"></div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data() {
    return {
      message: '😣哎呀，您要找的页面可能正在休假！😣',
    };
  },
  methods: {
    // 点击按钮后直接跳转到首页
    goHome() {
      window.location.href = '/'; // 重定向到首页
    },
  },
};
</script>

<style scoped>
/* 整个容器 */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(45deg, #2e3b4e, #4f5d73); /* 深灰到灰色渐变 */
  overflow: hidden;
  position: relative;
}

/* 内容居中显示 */
.content {
  text-align: center;
  color: white;
  font-family: 'Roboto', sans-serif;
  z-index: 2;
  transform: perspective(600px) rotateY(10deg) rotateX(5deg);
  animation: floatAnimation 6s ease-in-out infinite, textGlow 1.5s ease-in-out forwards;
}

/* 内容浮动效果 */
@keyframes floatAnimation {
  0% {
    transform: perspective(600px) rotateY(10deg) rotateX(5deg);
  }
  50% {
    transform: perspective(600px) rotateY(-10deg) rotateX(-5deg);
  }
  100% {
    transform: perspective(600px) rotateY(10deg) rotateX(5deg);
  }
}

/* 标题样式 */
.title {
  font-size: 5rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.2);
  letter-spacing: 3px;
  color: #ffffff;
  animation: titleAnimation 1s ease-in-out forwards;
}

/* 标题动画 */
@keyframes titleAnimation {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 描述文字样式 */
.description {
  font-size: 1.8rem;
  margin-bottom: 40px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.85);
  animation: descriptionAnimation 2.5s ease-in-out forwards;
  text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.5);
}

/* 描述文字动画 */
@keyframes descriptionAnimation {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

/* 按钮样式 */
.cta-button {
  background: #ffffff;
  color: #2e3b4e;
  padding: 16px 32px;
  border: none;
  border-radius: 40px;
  font-size: 1.6rem;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  position: relative;
  z-index: 3;
  text-transform: uppercase;
  border: 2px solid #2e3b4e;
  animation: buttonGlow 2s ease infinite;
}

/* 按钮悬停效果 */
.cta-button:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

/* 按钮点击效果 */
.cta-button:active {
  transform: translateY(0);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
}

/* 按钮发光动画 */
@keyframes buttonGlow {
  0% {
    box-shadow: 0 0 15px #2e3b4e, 0 0 25px #4f5d73;
  }
  50% {
    box-shadow: 0 0 25px #2e3b4e, 0 0 45px #4f5d73;
  }
  100% {
    box-shadow: 0 0 15px #2e3b4e, 0 0 25px #4f5d73;
  }
}

/* 背景粒子效果 */
.particle-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://raw.githubusercontent.com/Pai3141/PictureBed/main/img/grass_wind.png");
  z-index: 1;
  pointer-events: none;
  opacity: 0.1;
  animation: particleAnimation 3s linear infinite;
}

/* 粒子动画 */
@keyframes particleAnimation {
  0% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.25;
  }
  100% {
    opacity: 0.1;
  }
}
</style>
