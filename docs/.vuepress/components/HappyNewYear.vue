<template>
  <div class="app">
    <div class="background"></div>

    <div class="content">
      <div class="message" v-if="showMessage">
        <h1>🎉 新年快乐! 🎉</h1>
        <p>祝您新的一年，幸福安康，万事如意！</p>
      </div>

      <!-- 按钮点击后消失 -->
      <div v-if="!buttonClicked" class="button-container">
        <button @click="celebrate">点击庆祝</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      showMessage: false,
      showFireworks: false,
      buttonClicked: false, // 用于控制按钮是否显示
    };
  },
  methods: {
    celebrate() {
      this.showMessage = true;
      this.buttonClicked = true; // 点击后按钮消失
      setTimeout(() => {
        this.showFireworks = true;
      }, 500);
      setTimeout(() => {
        this.showFireworks = false;
      }, 5000);
    },
  },
};
</script>

<style scoped>
/* 整体背景 */
.app {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);
  font-family: 'Lobster', cursive;
  color: white;
  position: relative;
}

/* 背景装饰 */
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://cdn.pixabay.com/photo/2019/01/22/07/17/snow-3945402_960_720.jpg') no-repeat center center;
  background-size: cover;
  filter: blur(10px);
  z-index: -1;
}

/* 祝福消息 */
.content .message {
  text-align: center;
  animation: fadeInUp 1.5s ease-out;
}

.content h1 {
  font-size: 3.5em;
  text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
  animation: bounceIn 1s ease-out;
}

.content p {
  font-size: 1.8em;
  margin-top: 20px;
  animation: fadeInUp 2s ease-out;
}

/* 按钮 */
.button-container button {
  padding: 15px 40px;
  font-size: 1.5em;
  background: linear-gradient(45deg, #ff6ec7, #ff9a8b);
  border: none;
  border-radius: 50px;
  color: white;
  cursor: pointer;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.button-container button:hover {
  background: linear-gradient(45deg, #ff9a8b, #ff6ec7);
  box-shadow: 0px 6px 25px rgba(0, 0, 0, 0.3);
  transform: scale(1.1);
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceIn {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

/* 烟花效果 */
.fireworks {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  animation: fireworksAnimation 5s ease-out infinite;
}

.fireworks img {
  width: 300px;
  height: auto;
}

@keyframes fireworksAnimation {
  0% {
    opacity: 0;
    transform: translateY(0) scale(1);
  }
  50% {
    opacity: 1;
    transform: translateY(-50px) scale(1.2);
  }
  100% {
    opacity: 0;
    transform: translateY(0) scale(1);
  }
}
</style>
