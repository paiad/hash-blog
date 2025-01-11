<template>
  <div class="container">
    <div class="content">
      <h1 class="title">Hello World</h1>
      <p class="description">Welcome to the Luxurious 3D World of Vue.js!</p>
      <button @click="changeText" class="cta-button">Click Me</button>
    </div>
    <!-- 粒子背景 -->
    <div class="particle-background"></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      message: 'Welcome to the Luxurious 3D World of Vue.js!',
    };
  },
  methods: {
    changeText() {
      this.message = 'You clicked the button!';
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
  background: linear-gradient(45deg, #3b7cfc, #cf76f1, #f9a8d4, #ff5c8d);
  background-size: 400% 400%;
  animation: gradientBackground 15s ease infinite;
  overflow: hidden;
  position: relative;
}

/* 背景渐变动画 */
@keyframes gradientBackground {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* 内容居中显示 */
.content {
  text-align: center;
  color: white;
  font-family: 'Montserrat', sans-serif;
  z-index: 2;
  transform: perspective(500px) rotateY(30deg) rotateX(20deg);
  animation: floatAnimation 5s ease-in-out infinite, textGlow 1s ease-in-out forwards;
}

/* 内容浮动效果 */
@keyframes floatAnimation {
  0% {
    transform: perspective(500px) rotateY(30deg) rotateX(20deg);
  }
  50% {
    transform: perspective(500px) rotateY(-20deg) rotateX(-10deg);
  }
  100% {
    transform: perspective(500px) rotateY(30deg) rotateX(20deg);
  }
}

/* 标题样式 */
.title {
  font-size: 5rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 4px 4px 12px rgba(0, 0, 0, 0.5), 0 0 25px rgba(255, 255, 255, 0.3);
  letter-spacing: 6px;
  animation: titleAnimation 1s ease-in-out forwards;
  color: #ffffff;
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
  font-weight: 500;
  text-shadow: 3px 3px 12px rgba(0, 0, 0, 0.4);
  color: rgba(255, 255, 255, 0.85);
  animation: descriptionAnimation 2s ease-in-out forwards;
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
  background: linear-gradient(45deg, #ff7e5f, #feb47b);
  color: white;
  padding: 20px 40px;
  border: none;
  border-radius: 50px;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  position: relative;
  z-index: 3;
  text-transform: uppercase;
}

/* 按钮悬停效果 */
.cta-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
}

/* 按钮点击效果 */
.cta-button:active {
  transform: translateY(0);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
}

/* 背景粒子效果 */
.particle-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://www.transparenttextures.com/patterns/white-light-weave.png');
  z-index: 1;
  pointer-events: none;
  opacity: 0.3;
  animation: particleAnimation 4s linear infinite;
}

/* 粒子动画 */
@keyframes particleAnimation {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 0.3;
  }
}
</style>
