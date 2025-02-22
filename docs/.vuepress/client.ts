import {defineClientConfig} from 'vuepress/client';
import { h } from 'vue'
import NotFound from "./layouts/NotFound.vue";
import HelloWorld from "./theme/components/HelloWorld.vue";
import {createCursorEffect} from "./theme/utils/cursorEffect";
import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
import './theme/styles/index.css';
import './theme/styles/custom.css';
import './theme/styles/markdown.scss';

export default defineClientConfig({
    enhance({app}) {
        app.component('HelloWorld', HelloWorld)
        app.component('RepoCard', RepoCard)
        // 调用光标效果函数
        // createCursorEffect()
    },

    // 404 no-found
    layouts: {
        NotFound: () => h(NotFound, null, {
            'not-found': () => h(NotFound),
        }),
    },
});
