<template>
  <div class="not-found">
    <img src="../public/gif/wind.gif" alt="" />
    <button class="home-button" @click="goHome">
      <span>当前页被风吹走啦~</span>
    </button>
  </div>
</template>

<script>
export default {
  name: '404',
  components: {},
  methods: {
    goHome() {
      this.$router.push('/'); // 使用 Vue Router 跳转到首页
    }
  }
}
</script>

<style scoped>
/* 确保容器充满视口但不溢出 */
.not-found {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 强制约束 GIF 图片 */
.not-found img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

/* 返回首页按钮样式 */
.home-button {
  position: relative;
  z-index: 2;
  padding: 14px 32px;
  font-size: 18px;
  color: #fff;
  background: linear-gradient(135deg, #1e90ff, #00ced1); /* 渐变背景 */
  border: none;
  border-radius: 50px; /* 默认圆润 */
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 按钮内的文字 */
.home-button span {
  position: relative;
  z-index: 3;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
}


/* 悬浮效果：灵动扩展 */
.home-button:hover {
  transform: scale(1.1) translateY(-4px);
  border-radius: 40px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.35);
  animation: bounce 0.5s ease-in-out;
}

/* 悬浮时光晕展开 */
.home-button:hover::before {
  transform: translate(-50%, -50%) scale(1);
}

/* 悬浮时文字微调 */
.home-button:hover span {
  transform: scale(1.05);
}

/* 点击效果：灵动岛动感 */
.home-button:active {
  animation: dynamicIsland 0.6s ease-in-out; /* 点击时触发灵动岛动画 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

/* 悬浮动画：弹性效果 */
@keyframes bounce {
  0% {
    transform: scale(1) translateY(0);
  }
  50% {
    transform: scale(1.15) translateY(-6px);
  }
  100% {
    transform: scale(1.1) translateY(-4px);
  }
}

/* 点击动画：灵动岛效果 */
@keyframes dynamicIsland {
  0% {
    transform: scale(0.95); /* 初始轻微缩小 */
    border-radius: 50px;
  }
  30% {
    transform: scale(1.2) translateY(-5px); /* 快速扩展并上移 */
    border-radius: 35px; /* 形状变化 */
  }
  60% {
    transform: scale(1.05) translateY(0); /* 回弹 */
    border-radius: 45px;
  }
  100% {
    transform: scale(1); /* 恢复原状 */
    border-radius: 50px;
  }
}
</style>