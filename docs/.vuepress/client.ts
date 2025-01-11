import {defineClientConfig} from 'vuepress/client';
import HelloWorld from "./components/HelloWorld.vue";
import HappyNewYear from "./components/HappyNewYear.vue";

export default defineClientConfig({
    enhance({app}) {
        app.component('HelloWorld', HelloWorld)
        app.component('HappyNewYear', HappyNewYear)
        // 确保在客户端执行
        if (typeof window !== 'undefined') {
            // 创建光标效果的样式
            const style = document.createElement('style');
            style.innerHTML = `
        /* 整体符号散落效果的样式 */
        .symbol-fall {
          position: absolute;
          font-size: 16px; /* 字符的大小 */
          opacity: 1;
          pointer-events: none;
          animation: symbolFall 2s forwards, fadeOut 2s forwards;
          z-index: 999999; /* 确保符号在最前方 */
        }

        /* 符号掉落的动画 */
        @keyframes symbolFall {
          0% {
            transform: scale(1) translate(0, 0);
          }
          100% {
            transform: scale(0.5) translate(var(--dx), var(--dy));
            opacity: 0;
          }
        }

        /* 符号的渐变消失效果 */
        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `;
            document.head.appendChild(style);

            // 点击时生成符号散落效果
            window.addEventListener('click', (event) => {
                const symbolCount = 5; // 每次点击生成的符号数量
                for (let i = 0; i < symbolCount; i++) {
                    createSymbol(event.pageX, event.pageY); // 使用 pageX 和 pageY 来获取相对文档的坐标
                }
            });

            // 创建符号的函数
            function createSymbol(x, y) {
                const symbol = document.createElement('div');
                symbol.classList.add('symbol-fall');

                // 为每颗符号随机选择符号
                const randomSymbol = getRandomSymbol();
                symbol.textContent = randomSymbol;

                // 为每颗符号设置随机的移动方向和距离
                const angle = Math.random() * Math.PI * 2; // 随机角度
                const distance = Math.random() * 100 + 50; // 随机距离
                const dx = Math.cos(angle) * distance; // 计算x轴方向的偏移
                const dy = Math.sin(angle) * distance; // 计算y轴方向的偏移

                // 设置CSS变量以控制符号的运动轨迹
                symbol.style.setProperty('--dx', `${dx}px`);
                symbol.style.setProperty('--dy', `${dy}px`);

                // 设置符号的初始位置
                symbol.style.left = `${x - 8}px`; // 调整符号的中心位置
                symbol.style.top = `${y - 8}px`; // 调整符号的中心位置

                // 将符号添加到页面
                document.body.appendChild(symbol);

                // 符号动画结束后移除符号
                setTimeout(() => {
                    symbol.remove();
                }, 2000); // 符号动画时长2秒后删除
            }

            // 获取随机符号
            function getRandomSymbol() {
                const symbols = ['🩷', '💛', '🩵'];
                const randomIndex = Math.floor(Math.random() * symbols.length);
                return symbols[randomIndex];
            }
        }
    },
});
