<template>
  <div class="container">
    <div class="content">
      <h1 class="title">Hello World</h1>
      <p class="description">{{ message }}</p>
      <button @click="changeText" class="cta-button">Click Me</button>
    </div>
    <!-- 背景粒子效果 -->
    <div class="particle-background"></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      message: 'Welcome to Hash 3D World!',
      isFlag: true
    };
  },
  methods: {
    changeText() {
      if (this.isFlag) {
        this.message = 'Stay Hungry, Stay Foolish!';
        this.isFlag = !this.isFlag
      }else{
        this.message = 'Welcome to Hash 3D World!';
        this.isFlag = !this.isFlag
      }
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
  background: linear-gradient(45deg, #1f1f1f, #4ca5dc, #a049f1, #ff4d8c);
  background-size: 400% 400%;
  animation: gradientBackground 12s ease infinite;
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
  font-family: 'Roboto', sans-serif;
  z-index: 2;
  transform: perspective(600px) rotateY(20deg) rotateX(10deg);
  animation: floatAnimation 6s ease-in-out infinite, textGlow 1.5s ease-in-out forwards;
}

/* 内容浮动效果 */
@keyframes floatAnimation {
  0% {
    transform: perspective(600px) rotateY(20deg) rotateX(10deg);
  }
  50% {
    transform: perspective(600px) rotateY(-20deg) rotateX(-10deg);
  }
  100% {
    transform: perspective(600px) rotateY(20deg) rotateX(10deg);
  }
}

/* 标题样式 */
.title {
  font-size: 6rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 0 0 30px rgba(0, 255, 255, 0.7), 0 0 50px rgba(0, 255, 255, 0.3);
  letter-spacing: 5px;
  color: #00ff99;
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
  font-size: 2rem;
  margin-bottom: 40px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  animation: descriptionAnimation 2.5s ease-in-out forwards;
  text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.7);
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
  background: linear-gradient(45deg, #ff007f, #f5c400);
  color: white;
  padding: 18px 36px;
  border: none;
  border-radius: 50px;
  font-size: 1.6rem;
  cursor: pointer;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  position: relative;
  z-index: 3;
  text-transform: uppercase;
  border: 2px solid #fff;
  animation: buttonGlow 2s ease infinite;
}

/* 按钮悬停效果 */
.cta-button:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
}

/* 按钮点击效果 */
.cta-button:active {
  transform: translateY(0);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.4);
}

/* 按钮发光动画 */
@keyframes buttonGlow {
  0% {
    box-shadow: 0 0 15px #ff007f, 0 0 30px #f5c400;
  }
  50% {
    box-shadow: 0 0 25px #ff007f, 0 0 45px #f5c400;
  }
  100% {
    box-shadow: 0 0 15px #ff007f, 0 0 30px #f5c400;
  }
}

/* 背景粒子效果 */
.particle-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 20%, rgba(0, 0, 0, 0.4) 80%);
  z-index: 1;
  pointer-events: none;
  opacity: 0.15;
  animation: particleAnimation 3s linear infinite;
}

/* 粒子动画 */
@keyframes particleAnimation {
  0% {
    opacity: 0.15;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 0.15;
  }
}
</style>