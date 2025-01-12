import {defineClientConfig} from 'vuepress/client';
import HelloWorld from "./theme/components/HelloWorld.vue";
import HappyNewYear from "./theme/components/HappyNewYear.vue";
import {createCursorEffect} from "./theme/utils/cursorEffect";
import './theme/styles/index.css';

export default defineClientConfig({
    enhance({app}) {
        app.component('HelloWorld', HelloWorld)
        app.component('HappyNewYear', HappyNewYear)

        // 调用光标效果函数
        createCursorEffect()
    },
});
